import React from 'react';

const SpinnerLoader = () => {
    return (
        <div role='status'>
            <svg aria-hidden="true" 
                className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-900"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                 d='M100 50.5908C100 78.2051 77.6142 100 50.0001 100C22.3859 100 0 78.2051 0 50.5908C0 22.9766 22.3859 0.181641 50.0001 0.181641C77.6142 0.181641 100 22.9766 100 50.5908ZM9.09091 50.5908C9.09091 73.0454 27.5455 91.5 50.0001 91.5C72.4546 91.5 90.9091 73.0454 90.9091 50.5908C90.9091 28.1363 72.4546 9.68164 50.0001 9.68164C27.5455 9.68164 9.09091 28.1363 9.09091 50.5908Z'
                fill="currentColor"
                />
                <path
                 d='M93.9676 39.0454C96.1705 38.1816 97.2727 35.9545 96.4091 33.7516C95.5455 31.5487 93.3182 30.4468 91.1153 31.3105L75.2273 37.2727C73.0244 38.1364 71.9225 40.3636 72.7862 42.5665C73.6499 44.7694 75.8771 45.8713 78.0801 45.0076L93.9676 39.0454Z'
                fill="currentFill"
                />


            </svg>
            <span className='sr-only'>Loading...</span>
        </div>
    );
}

export default SpinnerLoader;
