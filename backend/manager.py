from fastapi import WebSocket
from roomManager import Room

class ConnectionManager:

    def __init__(self):
        self.active_connections: list[WebSocket] = []
        self.rooms : dict[str, Room] = {}

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        print("connection established!")
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        print("connection demolish!")
        self.active_connections.remove(websocket)

    async def send_personal_message(self, md: str, websocket: WebSocket, room_name: str):
        print("list of rooms available here!!",self.rooms or 'no room')
        if room_name in self.rooms:
            await self.rooms[room_name].send_personal_message(md, websocket)
        else:
            await websocket.send_text(md)

    async def broadcast(self, md: str, room_name: str = None, websocket: WebSocket = None):
        if room_name:
            room = self.rooms[room_name]
            if room:
                print("getting into room to broadcast this message ", md)
                await room.broadcast(md)
        else:
            for conn in self.active_connections:
                try:
                    if conn != websocket : 
                        await conn.send_text(md)
                    else:
                        pass
                except Exception as e:
                    print(f"Error occured in Broadcasting to {conn.client}")

    
    async def join_room(self, websocket: WebSocket, room_name: str):
        if room_name not in self.rooms:
            self.rooms[room_name] = Room(websocket)
        await self.rooms[room_name].join(websocket)
    
    async def leave_room(self, websocket: WebSocket, room_name: str):
        if room_name in self.rooms and websocket in self.active_connections:
            self.rooms[room_name].leave(websocket)
            self.active_connections.remove(websocket)
    
    



