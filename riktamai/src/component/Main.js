import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { BeatLoader } from 'react-spinners'
import ShowData from "./ShowData";
let api = process.env.REACT_APP_API_URL
const Main = () => {

  const msgEnd = useRef(null)
  const [loader, setloader] = useState(false)
  let [message, setMessage] = useState([
    {
      "role": 'assistant',
      "content": [{'text':"How can I help you today?"}]
    }
  ])


  useEffect(() => {
    msgEnd.current.scrollIntoView()
  }, [message])

  let [searching_description, setsearching_description] = useState('')


  function sendToChatGpt() {
    if (searching_description.length === 0) return
    let text = searching_description;
    setloader(true)
    setsearching_description('')
    let newMessage = {
      "role": 'user',
      "content": text
    };
    message.push(newMessage)
    setMessage([...message]);
    fetch(`${api}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searching_description: text
      })
    }).then((responce) => responce.json())
      .then((res) => {
        console.log(res)
        setloader(false)
        if (res.statusCode === 200) {
          let data = {
            'role': 'assistant',
            'content': res.data
          }
          setMessage([...message, data]);
        }
        else if (res.statusCode === 500) {
          let data = {
            'role': 'assistant',
            'content': res.data
          }
          setMessage([...message, data]);
        }
      }).catch((error) => {
        setloader(false)
        let data = {
          'role': 'assistant',
          'content': "Sorry, we are not able to answer your question."
        }
        setMessage([...message, data]);
      })
  }


  const handelEnter = async (e) => {
    if (e.key === 'Enter') {
      sendToChatGpt()
    }
  }

  const [rows, setrows] = useState(1)
  const setsearchvalue = (value) => {
    setsearching_description(value)
  }


  return (
    <>
      <div className='chats'>
        <ShowData message={message} />
        <div className="chat">
          {loader === true && <BeatLoader color="#36d7b7" />}
        </div>
        <div ref={msgEnd} />
      </div>
      <div className='chatFooter'>
        <div className='inp'>
          <textarea type='text' rows={rows} disabled={loader} value={searching_description} onKeyDown={handelEnter} onChange={(e) => setsearchvalue(e.target.value)} placeholder="Send a message" className="inputfrom" />
          <button disabled={loader} className='send' onClick={sendToChatGpt}><IoSend size={'30px'} /></button>
        </div>
      </div>
    </>
  )
}
export default Main