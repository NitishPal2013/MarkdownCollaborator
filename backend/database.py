import motor.motor_asyncio as mt_async
from dotenv import load_dotenv
from model import Room_model
import os
load_dotenv()

client =  mt_async.AsyncIOMotorClient(os.environ["MONGODB_URI"])

database = client.MarkdownCollaborator

collection = database.rooms

complete_notes_collection = collection.complete_notes_collection

async def save_room(room: Room_model):
    try:
        room_dict = dict(room)
        already_exist = await collection.find_one({"room_name": room.room_name})
        if already_exist != None: 
            return {"created": False}
        await collection.insert_one(room_dict)
        return {"created": True}
    except Exception as e:
        print("Exception occurred in saving room to database", e)
        return e 


async def check_passcode(room: Room_model):
    try:
        ext_room = await collection.find_one({"room_name": room.room_name})
        if ext_room != None:
            if ext_room["passcode"] == room.passcode:
                return {"check" : True }
            else:
                return {"check" : False}
        else:
            return {"check": "No Room Exist!"}
    except Exception as e:
        print("Exception occured in passcode checking with ",e)
        return e