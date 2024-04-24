from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import io
from fastapi import WebSocket, WebSocketDisconnect
from manager import ConnectionManager
from model import Room_model
from database import save_room, check_passcode

app = FastAPI()


manager = ConnectionManager()

app.add_middleware(
   CORSMiddleware,
   allow_origins = ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
   )

@app.get("/")
def read_root():
    return "This is a fastapi endpoint. Please go to /docs route to test the api in a very interactive way!! Thank you!!"

@app.post('/upload')
async def upload(file: UploadFile):
  content = await file.read()
  try:
    md_data = io.BytesIO(content).getvalue()
    return md_data.decode('utf-8')
  except Exception as e:
    print(f'Error uploading file: {e}')
    raise HTTPException(status_code=500, detail='Upload failed. Please try again.')
  

@app.post("/create")
async def create_room(create_room: Room_model):
   try:
      result = await save_room(create_room)
      print(result)
      return result
   except Exception as e:
      print(e)
      return e

@app.post("/join")
async def check_passcode_for_room(join_room: Room_model):
   try:
      result = await check_passcode(join_room)
      return result
   except Exception as e:
      print(e)
      return e
   



@app.websocket("/ws/default")
async def websocket_enpoint(websocket: WebSocket):
   room_name = "default"
   await manager.connect(websocket)
   await manager.join_room(websocket, room_name)
   try: 
      while True:
         data = await websocket.receive_text()
         await manager.send_personal_message(data, room_name)
         await manager.broadcast(data, room_name)
   except WebSocketDisconnect:
      await manager.leave_room(websocket, room_name)
      manager.disconnect(websocket)
      print(f"{websocket.client} disconnected!!")


@app.websocket("/ws/{room_name}")
async def websocket_enpoint(websocket: WebSocket, room_name: str):
   await manager.connect(websocket)
   await manager.join_room(websocket, room_name)
   try: 
      while True:
         data = await websocket.receive_text()
         await manager.broadcast(data, room_name, websocket)
   except WebSocketDisconnect:
      await manager.leave_room(websocket, room_name)
      manager.disconnect(websocket)
      print(f"{websocket.client} disconnected!!")
