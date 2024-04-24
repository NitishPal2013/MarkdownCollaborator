import React from 'react';
import { useEffect } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import useWebSocket from 'react-use-websocket';

export interface displayType{
  display_md: string | undefined
  room_name: string
}

const Dome: React.FC<displayType> = ({display_md, room_name}: displayType) => {
  const {sendMessage, lastMessage} = useWebSocket(`wss://${import.meta.env.VITE_DOMAIN}/ws/${room_name}`,{share: true});

  useEffect(()=>{
    if(display_md){
      sendMessage(display_md);
    }

  },[display_md]
  )


  const setAndsend = (val: string)=>{
    sendMessage(val)
  }

  return (
    <MarkdownEditor
      value={lastMessage?.data}
      height='500px'
      onChange={(val)=>setAndsend(val)}
      visible
    />
  )
};

export default Dome;