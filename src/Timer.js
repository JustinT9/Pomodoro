import { useState, useEffect } from "react";  
import "./Timer.css"; 
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SettingsIcon from '@mui/icons-material/Settings';

function Timer() {
    const [pomoTime, setpomoTime] = useState({min: 25, sec: 0, decreasing: false, default: true}); 
    const [shortTime, setshortTime] = useState({min: 5, sec: 0, decreasing: false, default: true}); 
    const [longTime, setlongTime] = useState({min: 15, sec: 0, decreasing: false, default: true}); 
    const [time, setTime] = useState(pomoTime); 
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
        if (mode === "pomodoro" && pomoTime.min > 0 && pomoTime.min < 361) {
            setTime(pomoTime); 
        } else if (mode === "short" && shortTime.min > 0 && shortTime.min < 361) {
            setTime(shortTime); 
        } else if (mode === "long") {
            setTime(longTime); 
        }
    }, [pomoTime, shortTime, longTime]); 

    useEffect(() => {
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
            setTime(pomoTime);      
        } else if (str === "short") {
            setMode("short"); 
            setTime(shortTime);
        } else if (str === "long") {
            setMode("long"); 
            setTime(longTime);
        }
    }

    const handleReset = () => {
        if (mode === "pomodoro") {
            setTime(pomoTime);
        } else if (mode === "short") {
            setTime(shortTime);
        } else if (mode === "long") {
            setTime(longTime); 
        }
    }

    const handleOptions = () => {
        setCustomize((oldCustomize) => {return !oldCustomize}) 
    }

    const handleAutomatic = () => {
        setAutomatic((oldAutomatic) => {return !oldAutomatic})
    }

    const handleChange = (e) => {
        const name = e.target.name; 
        const value = e.target.value; 

        if (e.target.id === "Pomodoro") {
            setpomoTime({...pomoTime, [name]: value});
        } else if (e.target.id === "Short") {
            setshortTime({...shortTime, [name]: value});
        } else if (e.target.id === "Long") {
            setlongTime({...longTime, [name]: value});
        }
    }

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
                <div className="clickers">
                    <input className="check" type="checkbox" 
                    onChange={() => handleAutomatic()} />
                    
                    <label>Auto-transition Timer</label>
                </div>
                

                <div className="form">
                    <div className="form-control" >
                        <label htmlFor="Pomodoro">Pomodoro</label>
                        <input 
                            className="num"
                            type="number"
                            id="Pomodoro"
                            name="min"
                            value={pomoTime.min}
                            onChange={handleChange}
                        />
                    </div >

                    <div className="form-control">
                        <label htmlFor="Short">Short</label>
                        <input 
                            className="num"
                            type="number"
                            id="Short"
                            name="min"
                            value={shortTime.min}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="Long">Long</label>
                        <input 
                            className="num"
                            type="number"
                            id="Long"
                            name="min"
                            value={longTime.min}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button 
                    className="save" 
                    type="submit" 
                    onClick={() => handleOptions()}>
                        Save
                </button>
            </div>
        </div>
    )
}

export default Timer; 