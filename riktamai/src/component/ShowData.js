import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import usericon from '../assets/usericon.png';
import riktamlogo from '../assets/Riktamlogo.png';
import '../App.css'
const ShowData = (props) => {
    let message = props.message;
    const codeRef = useRef(null);

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    function copy(data) {
        navigator.clipboard.writeText(data);
    }

    return (
        <>
            {message && message.map((data, index) => (
                <div className='chat bot' key={index}>
                    <img src={data.role !== 'assistant' ? usericon : riktamlogo} className='chatImg' alt="load" />
                    {Array.isArray(data.content) ? (
                        data.content.map((ele, ind) => (
                            <div key={ind}>
                                {ele.code !== undefined ?
                                    <div className='txt'>
                                        <pre ref={codeRef} className='codecopy txt' style={{ backgroundColor: '#FBFCFC' }}>
                                            <code className="txt language-cpp">
                                                {ele.code}
                                            </code>
                                            <div onClick={() => copy(ele.code)}><button>copy</button></div>
                                        </pre>
                                    </div>
                                    : (
                                        <p className='txt'>{ele.text}</p>
                                    )}
                            </div>
                        ))
                    ) : (
                        <p className='txt'>{data.content}</p>
                    )}
                </div>
            ))}
        </>
    );
};

export default ShowData;
