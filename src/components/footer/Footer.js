import React from 'react';
import './Footer.sass';

const Footer = () => {
    return(
        <footer>
            created by <i className="fab fa-github"></i>
            &nbsp;  
            <a href="http://github.com/sasha-kir" 
               rel="noopener noreferrer" target="_blank">sasha-kir</a>
        </footer>
    );
}

export default Footer;