import React from 'react';

const GradientBlobTR = () => {
    return (        
        <div className="absolute top-0 -right-1 overflow-x-hidden h-full overflow-y-hidden pointer-events-none">
            <div className="translate-x-20 translate-y-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="669" height="775" viewBox="0 0 669 1024" fill="none">
                    <path d="M59.9411 0H669V1024C669 1024 271.962 1024 59.9411 1024C-152.079 1024 264.461 323.129 290.463 221.867C316.466 120.604 59.9411 0 59.9411 0Z" fill="url(#paint0_linear_246_715)"/>
                    <defs>
                        <linearGradient id="paint0_linear_246_715" x1="0" y1="512" x2="669" y2="512" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#A18CD1"/>
                            <stop offset="1" stopColor="#FBC2EB"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>        
    );
}

export default GradientBlobTR;
