import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IoIosRocket } from "react-icons/io";
import { GrAdd } from "react-icons/gr";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import riktamlogo from '../assets/Riktamlogo.png'
const SideBar = () => {


    let [bodyColor, setbodyColor] = useState()


    useEffect(() => {
        giveBodyColor(localStorage.getItem('bodyColor'))
    }, [])


    function giveBodyColor(color) {
        if (color === null || color === "Dark") {
            localStorage.setItem('bodyColor', 'Dark')
            setbodyColor('Light')
            document.body.style.backgroundColor = 'rgb(3, 0, 31)'
        } else if (color === "Light") {
            setbodyColor('Dark')
            localStorage.setItem('bodyColor', 'Light')
            document.body.style.backgroundColor = 'rgb(44, 62, 80)'
        }
    }


    return (
        <>
            <div className="upperSide">
                <div className="upperSideTop">
                    <img src={riktamlogo} alt="Logo" className="logo" />
                    <span className='brand'>Riktam AI</span>
                    {bodyColor === "Dark" ? <MdOutlineLightMode size={'30px'} onClick={() => giveBodyColor('Dark')} /> : <MdDarkMode size={'30px'} onClick={() => giveBodyColor('Light')} />}
                </div>
                <a href='/' target="_blank" style={{ textDecoration: 'none' }}>
                    <button className="midBtn">
                        <GrAdd className='addBtn' size={'50px'} />New Chat
                    </button>
                </a>
                {/* <div className="upperSideButton">
                    <button className="query"><FaMessage className='imageitem' /> What is c++</button>
                    <button className="query"><FaMessage className='imageitem' /> What is React Js</button>
                </div> */}
            </div>
            <div className="lowerSide">
                <div className='listItems'>
                    <IoHome className='listitemsImg' size={'30px'} /> Home
                </div>
                <div className='listItems'>
                    <FaSave className='listitemsImg' size={'30px'} /> Saved
                </div>
                <div className='listItems'>
                    <IoIosRocket className='listitemsImg' size={'30px'} /> Upgrade To Pro
                </div>
            </div>
        </>
    )
}

export default SideBar