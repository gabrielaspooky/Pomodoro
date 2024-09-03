"use client"
import React, { useState, useEffect } from 'react';

// Definimos la duración del Pomodoro en minutos
const POMODORO_DURATION = 25; // Duración del Pomodoro en minutos

const TimerDisplay = () => {
    const [minutes, setMinutes] = useState(POMODORO_DURATION);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let timer;
        if (isActive && !isPaused) {
            timer = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(timer);
                        setIsActive(false);
                        alert('¡Tiempo terminado!');
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isActive, isPaused, minutes, seconds]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePause = () => {
        setIsPaused(true);
    };

    const handleReset = () => {
        setIsActive(false);
        setIsPaused(false);
        setMinutes(POMODORO_DURATION);
        setSeconds(0);
    };

    return (
        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            <h1>Pomodoro Timer</h1>
            <div style={{ fontSize: '48px', margin: '20px' }}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <button onClick={handleStart} style={{ margin: '5px', padding: '10px 20px' }}>
                Start
            </button>
            <button onClick={handlePause} style={{ margin: '5px', padding: '10px 20px' }}>
                Pause
            </button>
            <button onClick={handleReset} style={{ margin: '5px', padding: '10px 20px' }}>
                Reset
            </button>
        </div>
    );
};

export default TimerDisplay;
