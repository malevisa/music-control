import React from "react";
import './footer.css';
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


export default function Footer() {

    return (

        <>
            <div className="footer">
                <div className="icons">
                    <nav>
                        <ul>
                            <li><FaLinkedin size={30} className="icon"/></li>
                            <li><FaGithubSquare size={30} className="icon"/></li>
                            <li><MdEmail size={30} className="icon"/></li>
                        </ul>
                    </nav>
                </div>
                <div className="infos">
                    <div>Info - Support - Marketing</div>
                    <div>Terms of Use - Privacy Policy</div>
                </div>
                <div className="date">@2023 Clarity Money</div>
            </div>
        </>
        
    );

}