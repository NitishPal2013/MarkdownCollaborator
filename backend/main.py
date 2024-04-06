from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import io
from fastapi import WebSocket, WebSocketDisconnect
from manager import ConnectionManager

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
  

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(data, websocket)
            await manager.broadcast(data)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print("disconneted!!")