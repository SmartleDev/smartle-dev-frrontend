import React from 'react';
import {TopResp} from '../../util/resources'

const GradBlobResp = () => {
    return <div className='w-full z-10 absolute top-0 right-0 pointer-events-none'>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="360" height="298" viewBox="0 0 360 298" fill="none">
        <path d="M0 205.839L0 0H360C360 0 365 31.7225 365 219.648C365 407.573 124.8 202.832 97 168.695C69.2 134.557 0 205.839 0 205.839Z" fill="url(#paint0_linear_378_1468)"/>
            <defs>
                <linearGradient id="paint0_linear_378_1468" x1="180" y1="278.556" x2="180" y2="0.000450362" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#A18CD1"/>
                    <stop offset="1" stop-color="#FBC2EB"/>
                </linearGradient>
            </defs>
        </svg> */}
        <img className="w-full" src={TopResp} alt="" />
  </div>;
}

export default GradBlobResp;
