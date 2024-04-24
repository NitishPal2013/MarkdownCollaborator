import React, {useState} from 'react'
import { TextField, Typography, Button } from '@mui/material'
import axios from 'axios';
import Collab from './Collab';
import Mainimage from '../components/Mainimage';

const Join: React.FC = () => {
  const [uniquename, setUniquename] = useState<string>("");
  const [passcode, setPasscode] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false)

  const handleJoinRoom: React.MouseEventHandler<HTMLButtonElement> | undefined = ()=>{
    const url = import.meta.env.VITE_BASE_URL  +"join";
    axios.post(url,{
        room_name: uniquename,
        passcode: passcode
      }, 
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }
    ).then(({data})=>{
      const result = data["check"]
      if(result === true ){
        setCheck(true)
      }
      else if(result === false) {
        setPasscode("");
        alert("Wrong Credentials!")
      }
      else{
        setPasscode("");
        alert(result);
      }
    })

  }

  if(check){
    return <Collab room_name = {uniquename}/> 
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
      <Mainimage/>
    </div>
    </>
  )
}

export default Join