import { useState, useEffect } from "react";  
import "./Timer.css"; 
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function Timer() {
    const [time, setTime] = useState({min: 20, sec: 0}); 
    const [display, setDisplay] = useState(null); 
    const [mode, setMode] = useState("pomodoro"); 

    useEffect(() => {
        setDisplay(time.min.toString().padStart(2, '0') + ":" + time.sec.toString().padStart(2, '0')); 
    }, [time]);

    const handleTime = () => {
        
    }

    const handleMode = (str) => {
        if (str === "pomodoro") {
            setMode("pomodoro"); 
            setTime({min: 20, sec: 0})     
        } else if (str === "short") {
            setMode("short"); 
            setTime({min: 5, sec: 0});
        } else if (str === "long") {
            setMode("long"); 
            setTime({min: 15, sec: 0});
        }
    }

    console.log(time.min);
    console.log(mode);
    return ( 
        <div className="container">
            <div className="top">
                <div className="time">
                    {display}
                </div>

                <button className="start-pause" onClick={() => handleTime()}>
                    Start
                </button>

                <RestartAltIcon className="reset" onClick/>
            </div>

            <div className="bot">
                <button className="pomodoro" onClick={() => handleMode("pomodoro")}>
                    Pomodoro
                </button>

                <button className="short" onClick={() => handleMode("short")}>
                    Short Break
                </button>

                <button className="long" onClick={() => handleMode("long")}>
                    Long Break
                </button>
            </div>
        </div>
    )
}

export default Timer; 