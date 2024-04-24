from typing import List
from fastapi import WebSocket

class Room:
    def __init__(self, name: str):
        self.name = name
        self.connections: List[WebSocket] = []
        self.data = ''

    async def join(self, websocket: WebSocket):
        self.connections.append(websocket)
        if self.data:
            await websocket.send_text(self.data)

    async def leave(self, websocket: WebSocket):
        self.connections.remove(websocket)
        self.connections.remove(websocket)

    async def send_personal_message(self, md: str, websocket : WebSocket):
        self.data = md
        await websocket.send_text(md)

    async def broadcast(self, message: str):
        self.data = message
        for connection in self.connections:
            try:
                await connection.send_text(message)
            except Exception as e:
                print(f"Error sending message to {connection.client}: {e}")
                self.connections.remove(connection) 