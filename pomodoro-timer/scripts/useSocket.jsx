"use client"
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); 

const useSocket = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
       
        socket.on('welcome', (msg) => {
            setMessage(msg);
        });

        
        return () => {
            socket.off('welcome');
        };
    }, []);


    const sendMessage = (msg) => {
        socket.emit('message', msg);
    };

    return { message, sendMessage };
};

export default useSocket;
