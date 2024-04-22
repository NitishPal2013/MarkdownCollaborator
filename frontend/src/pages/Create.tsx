import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TextField, Typography, Button } from '@mui/material'
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

const Create: React.FC = () => {

  const [passcode, setPasscode] = useState<string>("");
  const [uniquename, setUniquename] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const lowerCaseName: string = uniqueNamesGenerator({
      dictionaries: [colors, adjectives, animals],
      style: 'lowerCase'
    });

    setUniquename(lowerCaseName);
  
  }, [])
  


  const handleCreateRoom :React.MouseEventHandler<HTMLButtonElement> | undefined = ()=>{
      // send the details to the backend

      navigate(`/${uniquename}`)
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
    <Button variant='outlined' color='success' onClick={handleCreateRoom}>Create room</Button>
    </div>
    <div>
      <p>Video/Gif</p>
    </div>
    </>
  )
}

export default Create