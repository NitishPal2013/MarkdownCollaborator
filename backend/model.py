from pydantic import BaseModel


class Room_model (BaseModel) :
    room_name : str
    passcode  : str
