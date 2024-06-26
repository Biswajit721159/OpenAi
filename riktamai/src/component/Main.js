import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { PulseLoader } from 'react-spinners'
import ShowData from "./ShowData";
import { sendtoAi } from './APICall'
const Main = () => {

  const msgEnd = useRef(null)
  const [loader, setloader] = useState(false)

  let [message, setMessage] = useState([
    {
      "role": 'assistant',
      "content": [{ 'text': "How can I help you today?" }]
    }
  ])

  useEffect(() => {
    msgEnd.current.scrollIntoView()
  }, [message])

  let [searching_description, setsearching_description] = useState('')

  async function sendToChatGpt() {

    if (searching_description.length === 0) return
    let text = searching_description;
    setloader(true)
    setsearching_description('')
    textareaRef.current.value = ''
    handleTextareaChange()
    let newMessage = {
      "role": 'user',
      "content": text
    };
    message.push(newMessage)
    setMessage([...message]);

    let data = await sendtoAi(message, text)
    setMessage([...data.data])
    setloader(data.isload)

  }

  const handelEnter = async (e) => {
    if (e.key === 'Enter') {
      sendToChatGpt(e)
    }
  }

  const textareaRef = useRef(null);
  const handleTextareaChange = () => {
    const textarea = textareaRef.current;
    setsearching_description(textarea.value)
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };


  return (
    <>
      <div className='chats'>
        <ShowData message={message} />
        <div className="chat">
          {loader === true && <PulseLoader size={'8px'} color="#36d7b7" />}
        </div>
        <div ref={msgEnd} />
      </div>
      <div className='chatFooter'>
        <div className='inp'>
          <textarea type='text' ref={textareaRef} onChange={handleTextareaChange} rows={1} disabled={loader} value={searching_description} onKeyDown={handelEnter} placeholder="Send a message" className="inputfrom" />
          <button disabled={loader} className='send' onClick={() => sendToChatGpt()}><IoSend size={'25px'} /></button>
        </div>
      </div>
    </>
  )
}
export default Main