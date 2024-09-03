import React from 'react';

const ProgressBar = ({ progress }) => {
    return (
        <div className="relative mt-5">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden relative">
                <div
                    className="h-full bg-purple-500 transition-width duration-500 ease-in-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
