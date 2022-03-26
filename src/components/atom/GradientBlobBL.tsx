import React from 'react';
interface Props{
    classes?: any;
    height?: string;
}
const GradientBlobBL = ({classes, height="1153"}:Props) => {
    return (        
        <div className={`absolute z-10 ${classes ?? "bottom-0 left-0" } overflow-x-hidden`}>
            <div className="translate-x-0 translate-y-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="450" height={height} viewBox="0 0 450 1153" fill="none">
                <path d="M437.488 0H0V1153C0 1153 108.564 1153 370.524 1153C632.483 1153 164.315 399.045 148.496 285.026C132.677 171.007 437.488 0 437.488 0Z" fill="url(#paint0_linear_89_716)"/>
                    <defs>
                        <linearGradient id="paint0_linear_89_716" x1="450" y1="576.5" x2="0" y2="576.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#A18CD1"/>
                            <stop offset="1" stopColor="#FBC2EB"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>        
    );
}

export default GradientBlobBL;
