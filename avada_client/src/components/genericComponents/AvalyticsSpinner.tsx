import React, {useEffect, useState} from "react";
import logo from "../../images/logo.png";


const AvalyticsSpinner = (props : any) => {

    const [count, setCount] = useState(0);

    useEffect(()=>{
        const intervalId = setInterval(() => {
            setCount((prevCount: number) => prevCount + 30);
        }, 100);
        return () => clearInterval(intervalId);
    },[])


    useEffect(()=>{
        const logo = document.getElementById('logo');
        if(logo) {
                logo.style.transform       = 'rotate('+count+'deg)';
                logo.style.transition= "all 0.5s ease-in-out";
            }
        },[count])



    return (
        <div>
            <div id="logo" style={{margin: 'auto', position:'relative', top:'50%', ...props.style}}>
                <img  style={{width:props.style.width, height:props.style.width }} src={logo}/>
            </div>

        </div>
    )


}

export default AvalyticsSpinner;