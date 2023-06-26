import { useState, useEffect } from "react";  
import "./Timer.css"; 
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SettingsIcon from '@mui/icons-material/Settings';

function Timer() {
    const [time, setTime] = useState({min: 20, sec: 0, decreasing: false, default: true}); 
    const [display, setDisplay] = useState(null); 
    const [mode, setMode] = useState("pomodoro"); 
    const [cycle, setCycle] = useState(0); 
    const [automatic, setAutomatic] = useState(false); 
    const [customize, setCustomize] = useState(false); 

    useEffect(() => {
        if (time.decreasing || time.default) {
            setDisplay(time.min.toString().padStart(2, '0') + ":" + time.sec.toString().padStart(2, '0')); 
        } 
    }, [time]);

    useEffect(() => {
        if (time.min < 0) setTime((oldTime) => {return {...oldTime, min: 0}})
        if (time.sec < 0) setTime((oldTime) => {return {...oldTime, sec: 0}})   
        
        if (time.min === 0 && time.sec === 0) {
            if (mode === "pomodoro") {
                if (cycle !== 0 && cycle % 4 === 0) {
                    handleMode("long"); 
                } else {
                    handleMode("short"); 
                }
            } else if (mode === "short" || mode === "long") {
                handleMode("pomodoro"); 
                setCycle(cycle+1); 
            } 
            if (automatic) setTime((oldTime) => {return {...oldTime, decreasing: true}})
        }

        if (time.decreasing && time.min >= 0 && time.sec >= 0) {
            const timeoutID = setTimeout(() => {
                if (time.sec === 0) {   
                    setTime((oldTime) => {return {...oldTime, min: oldTime.min-1, sec: 60}})
                }
                setTime((oldTime) => {return {...oldTime, sec: oldTime.sec-1}})
            }, 1)
            return () => {
                clearTimeout(timeoutID); 
            }
        }       
    }, [time]) 
     
    const handleTime = () => {
        if (!time.decreasing) {
            return setTime((oldTime) => {return {...oldTime, decreasing: true, default: false}})
        } else {
            return setTime((oldTime) => {return {...oldTime, decreasing: false}})
        }
    }

    const handleMode = (str) => {
        if (str === "pomodoro") {
            setMode("pomodoro"); 
            setTime({min: 20, sec: 0, decreasing: false, default: true})     
        } else if (str === "short") {
            setMode("short"); 
            setTime({min: 5, sec: 0, decreasing: false, default: true});
        } else if (str === "long") {
            setMode("long"); 
            setTime({min: 15, sec: 0, decreasing: false, default: true});
        }
    }

    const handleReset = () => {
        if (mode === "pomodoro") {
            setTime({min: 20, sec: 0, decreasing: false, default: true});
        } else if (mode === "short") {
            setTime({min: 5, sec: 0, decreasing: false, default: true});
        } else if (mode === "long") {
            setTime({min: 15, sec: 0, decreasing: false, default: true}); 
        }
    }

    const handleOptions = () => {
        setCustomize((oldCustomize) => {return !oldCustomize}) 
    }

    const handleAutomatic = () => {
        setAutomatic((oldAutomatic) => {return !oldAutomatic})
    }

    console.log(automatic); 
    return ( 
        <div className="main">
            <div className={customize ? "expandContainer" : "container"}>
                <div className="top">
                    <div className="time">
                        {display}
                    </div>

                    <button className="start-pause" onClick={() => handleTime()}>
                        {time.decreasing ? "Pause" : "Start"}
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

                    <SettingsIcon className="settings" onClick={() => handleOptions()}/>
                </div>
            </div>
            <div className={customize ? "showSettings" : "hideSettings"}>
                <input className="check" type="checkbox" 
                onChange={() => handleAutomatic()} />
                <label>Auto-transition Timer</label>
            </div>
        </div>
    )
}

export default Timer; 