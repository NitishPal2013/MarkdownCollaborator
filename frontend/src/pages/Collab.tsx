import React, {useState } from 'react'
import Uploader from '../components/Uploader'
import Dome from '../components/Editor'


const Collab : React.FC = () => {
  const [md_Data, setMd_data] = useState<string>();

  const getmd_Data = (incoming_file: string)=>{
    setMd_data(incoming_file);
  }


  return (
    <>
    <Uploader get_Md_data = {getmd_Data}/>
    <br />
    <Dome display_md={md_Data}/>
    </>
  )
}

export default Collab