import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { TextField, Typography, Button } from '@mui/material'

const Join: React.FC = () => {
  const [uniquename, setUniquename] = useState<string>("");
  const [passcode, setPasscode] = useState<string>("");
  const navigate = useNavigate();

  const handleJoinRoom: React.MouseEventHandler<HTMLButtonElement> | undefined = ()=>{
    console.log("Unique name: ", uniquename);
    console.log("passcode: ", passcode);
    if(passcode === "123456"){
      navigate("/room1")
    }
    else{
      setPasscode("");
      alert("Wrong Credentials!")
    }
  }

  return (
    <>
    <Typography  color={"primary"} variant='h3'>Join Room</Typography>
    <div className='center mx-auto'>
    <TextField  label="Room Name" variant="outlined" onChange={(e)=>{setUniquename(e.target.value)}}
    sx={{
      margin: "2em"
    }}
    />
    <TextField  label="Entry Code" variant="outlined" type='password' onChange={(e)=>{setPasscode(e.target.value)}}
    />
    </div>
    <div className='pd-2'>
    <Button variant='outlined' color='success' onClick={handleJoinRoom}>Enter in room</Button>
    </div>
    <div>
      <p>Video/Gif</p>
    </div>
    </>
  )
}

export default Join