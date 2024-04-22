import React from 'react';
import { useEffect } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import useWebSocket from 'react-use-websocket';

export interface displayType{
  display_md: string | undefined
}

const Dome: React.FC<displayType> = ({display_md}: displayType) => {
  const {sendMessage, lastMessage} = useWebSocket('ws://localhost:8000/ws/room1',{share: true});

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
    />
  )
};

export default Dome;