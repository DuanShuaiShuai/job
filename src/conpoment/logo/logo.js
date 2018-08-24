import React from 'react';
import Img from './job.png'
import "./logo.css"
class Logo extends React.Component{
    render(){
        return(
            <div  className="img-logo" >
                <img src={Img} alt="logo" />
            </div>
        )
    }
}
export default Logo;