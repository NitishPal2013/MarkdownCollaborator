from fastapi import WebSocket
class ConnectionManager:

    def __init__(self):
        self.active_connections: list[WebSocket] = []
        self.data = ''

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        print("connection established!")
        self.active_connections.append(websocket)
        await self.broadcast(self.data)

    def disconnect(self, websocket: WebSocket):
        print("connection demolish!")
        self.active_connections.remove(websocket)

    async def send_personal_message(self, md: str, websocket: WebSocket):
        await websocket.send_text(md)
        self.data = md

    async def broadcast(self, md: str):
        for connection in self.active_connections:
            await connection.send_text(md)
