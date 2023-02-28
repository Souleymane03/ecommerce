import React from 'react';
import {AiFillInstagram,AiFillTwitterSquare} from "react-icons/ai";

const Footer = () => {
    return (
        <div className="footer-container">
            <p>2023 KS Headphones All rights reserved</p>
            <p className="icon">
                <AiFillInstagram size={35} />
                <AiFillTwitterSquare size={35}/>
            </p>
        </div>
    );
}

export default Footer;