import React from "react";
import '../css/header.css'

function Title(){

    return(
        <div className="header">
        <header className="header-content">
            <a 
                className="about-button" 
                href={require("../")}>
                <img 
                    src={require("../assets/about.png")} 
                    alt="" 
                    className="pic"/>
            </a>
            <h1> CAPIT<span class="green">L</span>E! </h1>
            {/* <img src={require("../assets/thumbnail.png")} alt="" className="thumbnail"/> */}
        </header>
        <hr className="header-line"/>
        </div>
    );
}

export default Title;