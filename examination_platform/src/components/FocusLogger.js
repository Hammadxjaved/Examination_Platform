import React, { useEffect, useState } from 'react';

const logToFile = async (message) => {
    try {
        const response = await fetch('http://localhost:3001/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log(await response.text());
    } catch (error) {
        console.error('Failed to log message', error);
    }
};

const FocusLogger = () => {
    const [outOfFocusTime, setOutOfFocusTime] = useState(null);

    useEffect(() => {
        const handleBlur = () => {
            // Screen loses focus
            setOutOfFocusTime(new Date());
        };

        const handleFocus = () => {
            // Screen regains focus
            if (outOfFocusTime) {
                const endTime = new Date();
                const timeOutOfFocus = (endTime - outOfFocusTime) / 1000; // in seconds
                logToFile(`Screen was out of focus for ${timeOutOfFocus} seconds`);
                setOutOfFocusTime(null); // Reset the out-of-focus time
            }
        };

        window.addEventListener('blur', handleBlur);
        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('focus', handleFocus);
        };
    }, [outOfFocusTime]);

    return (
        <div>
        </div>
    );
};


export default FocusLogger;
