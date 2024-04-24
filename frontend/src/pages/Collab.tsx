import React, {useState, useEffect } from 'react'
import Uploader from '../components/Uploader'
import Dome from '../components/Editor'

interface CollabProps{
  room_name: string
}


const Collab : React.FC<CollabProps> = ({room_name}:CollabProps) => {

  const [md_Data, setMd_data] = useState<string>();

  const getmd_Data = (incoming_file: string)=>{
    setMd_data(incoming_file);
  }

  useEffect(() => {
    // Prompt confirmation when reload page is triggered
    window.onbeforeunload = () => { return "" };
        
    // Unmount the window.onbeforeunload event
    return () => { window.onbeforeunload = null };
}, []);

  return (
    <>
    <h3>Room: {room_name}</h3>
    <Uploader get_Md_data = {getmd_Data}/>
    <br />
    <Dome display_md={md_Data} room_name = {room_name} />
    </>
  )
}

export default Collab