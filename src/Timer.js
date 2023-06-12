import { useState, useEffect } from "react";  
import "./Timer.css"; 
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function Timer() {
    const [time, setTime] = useState({min: 20, sec: 0, decreasing: false}); 
    const [display, setDisplay] = useState(null); 
    const [mode, setMode] = useState("pomodoro"); 

    useEffect(() => {
        setDisplay(time.min.toString().padStart(2, '0') + ":" + time.sec.toString().padStart(2, '0')); 
    }, [time]);

    useEffect(() => {
        if (time.decreasing && time.min >= 0 && time.sec >= 0) {
            setTimeout(() => {
                if (time.sec === 0) {
                    setTime((oldTime) => {return {...oldTime, min: oldTime.min-1, sec: 60}})
                }
                setTime((oldTime) => {return {...oldTime, sec: oldTime.sec-1}})
            }, 1000)
        }
    }, [time]) 
    
    const handleTime = () => {
        return setTime((oldTime) => {return {...oldTime, decreasing: true}})
    }

    const handleMode = (str) => {
        if (str === "pomodoro") {
            setMode("pomodoro"); 
            setTime({min: 20, sec: 0, decreasing: false})     
        } else if (str === "short") {
            setMode("short"); 
            setTime({min: 5, sec: 0, decreasing: false});
        } else if (str === "long") {
            setMode("long"); 
            setTime({min: 15, sec: 0, decreasing: false});
        }
    }

    const handleReset = () => {
        if (mode === "pomodoro") {
            setTime({min: 20, sec: 0, decreasing: false});
        } else if (mode === "short") {
            setTime({min: 5, sec: 0, decreasing: false});
        } else if (mode === "long") {
            setTime({min: 15, sec: 0, decreasing: false}); 
        }
    }

    console.log(time.decreasing); 
    return ( 
        <div className="container">
            <div className="top">
                <div className="time">
                    {display}
                </div>

                <button className="start-pause" onClick={() => handleTime()}>
                    Start
                </button>

                <RestartAltIcon className="reset" onClick={() => handleReset()}/>
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