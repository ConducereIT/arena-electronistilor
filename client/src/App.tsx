import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { HelloWorldService } from "@genezio-sdk/arena-electronistilor_eu-central-1"
import { Bs0Square } from "react-icons/bs";

function App() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleButtonClick = async () => {
        try {
            const result = await HelloWorldService.hello(name);
            setMessage(result);
        } catch (error) {
            console.error('Error calling HelloWorldService:', error);
            setMessage('Error fetching greeting.');
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <Bs0Square className="App-logo"/>
                <input
                    style={ { margin: "20px" }}
                    type="text"
                    placeholder="Enter your name :"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleButtonClick}>Greet</button>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    {message}
                </div>
                <a
                    className="App-link"
                    href="https://docs.genez.io/genezio-documentation/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn Genezio
                </a>
            </header>
        </div>
    );
}

export default App;
