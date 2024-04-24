import React, { useEffect, useState } from 'react'
import { TextField, Typography, Button } from '@mui/material'
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import axios from 'axios';
import Collab from './Collab';

const Create: React.FC = () => {

  const [passcode, setPasscode] = useState<string>("");
  const [uniquename, setUniquename] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);

  useEffect(() => {
    const lowerCaseName: string = uniqueNamesGenerator({
      dictionaries: [colors, adjectives, animals],
      style: 'lowerCase'
    });

    setUniquename(lowerCaseName);
  
  }, [])
  


  const handleCreateRoom :React.MouseEventHandler<HTMLButtonElement> | undefined = ()=>{
    const url = import.meta.env.VITE_BASE_URL  +"create";
      const data = {
        room_name: uniquename,
        passcode: passcode
      }
      axios.post(url,data,{
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then(({data})=>{
        if (data["created"]){
          setCheck(true)
        }
        else if(!data["created"]){
          alert("This Room already exist, Please refresh this page to generate new name for your room !")
        }
        else{
          alert("Internal server Error!")
        }
      })
  }

  if(check){
    return <Collab room_name = {uniquename}/> 
  }


  return (
    <>
    <Typography  color={"primary"} variant='h3'>Create Room</Typography>
    <div className='center mx-auto'>
    <TextField label="Room Name" variant="outlined" value={uniquename} focused 
    sx={{
      margin: "2em"
    }}
    />
    <TextField label="passcode" variant="outlined" type='password' onChange={(e)=>{setPasscode(e.target.value)}}/>
    </div>
    <div className='pd-2'>
    <Button variant='outlined' color='success' onClick={handleCreateRoom} disabled = {passcode.length == 0 ? true : false}>Create room</Button>
    </div>
    <div>
      <p>Video/Gif</p>
    </div>
    </>
  )
}

export default Create