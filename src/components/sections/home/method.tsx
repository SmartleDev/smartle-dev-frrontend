import React, { useState } from 'react';
import { TriPng } from '../../../util/resources';
import styles from '../../../styles/modules/method.module.scss';

const Method = () => {
  const [activeMeth, setActiveMeth] = useState<string>("ct");  
  let meth:any = {
    "ct":{      
      "title": "Critical <br/> Thinking",
      "text":"<b>Critical thinking</b> is the practice of solving problems, among other qualities. It empowers students to discover the truth in assertions, especially when it comes to separating fact from opinion.",
    },
    "com": {      
      "title": "Communication",
      "text":"<b>Communication</b> is the practice of conveying ideas quickly and clearly. It is the glue that brings all of these educational qualities together.",
    },
    "col": {      
      "title": "Collaboration",
      "text":"<b>Collaboration</b> means getting students to work together, achieve compromises, and get the best possible results from solving a problem.",
    },
    "cr": {      
      "title": "Creativity",
      "text":"<b>Creativity</b> is equally important as a means of adaptation. This skill empowers students to see concepts in a different light, which leads to innovation.",
    },
  };

  return (
    <div className='pt-16 z-10 relative'>
      <h2 className='font-black text-3xl md:text-5xl text-center'>4C’s Methodology</h2>
      <p className='text-md md:text-xl text-center md:w-11/12 mx-auto mt-4 md:mt-8'>The 4 C’s for the 21st Century Skills are vital to a thriving learning environment to prepare young learners for the future.</p>
      
  <div className="-translate-x-10 sm:translate-x-0 scale-50 md:scale-100 md:w-full mt-20 mb-10 sm:flex sm:justify-center sm:items-center">
        <div className="relative mb-10" style={{ height: '25rem', width:'32rem'}}>
          <div className="h-full w-full flex gap-2 md:cursor-pointer"> 
            <div className="w-6/12 gap-2 flex flex-col ">
              <div className="w-full h-44 flex items-end justify-end">
                <div className={`text-white bg-color-400 rounded-xl transition-all ${activeMeth === 'ct' ? 'h-full w-full text-3xl' : 'h-40 w-11/12 text-xl'} hover:w-full hover:h-full shadow flex justify-center items-center font-bold  text-center p-3 hover:text-3xl`}
                  onClick={()=>setActiveMeth("ct")}
                dangerouslySetInnerHTML={{ __html: meth['ct'].title }}>                
                </div>
              </div>
              <div className="w-full h-56 flex justify-end items-start">
                <div className={`text-slate-900 bg-accent-400 rounded-xl transition-all ${activeMeth === 'com' ? 'h-4/5 w-full text-3xl' : 'text-xl h-3/5 w-10/12'} hover:w-full hover:h-4/5 shadow flex justify-center items-center font-bold  hover:text-3xl p-3`}
                  onClick={()=>setActiveMeth("com")}
                dangerouslySetInnerHTML={{ __html: meth['com'].title }}>                  
                </div>
              </div>
            </div>  
            <div className="w-6/12 gap-2 flex flex-col ">
              <div className="w-full h-56  flex items-end">
                <div className={`text-slate-900 bg-accent-400  rounded-xl transition-all ${activeMeth === 'col' ? 'h-full w-11/12 text-3xl' : 'h-5/6 w-9/12 text-xl'} hover:w-11/12 hover:h-full shadow flex justify-center items-center font-bold hover:text-3xl p-3`}
                  onClick={()=>setActiveMeth("col")}
                dangerouslySetInnerHTML={{ __html: meth['col'].title }}>                  
                </div>
              </div>
              <div className="w-full h-44  flex items-start">
                <div className={`text-white bg-color-400 rounded-xl transition-all 
                ${activeMeth === 'cr' ? 'h-full w-11/12 text-3xl' : 'h-5/6 w-9/12 text-xl'} hover:w-11/12 hover:h-full shadow flex justify-center items-center font-bold hover:text-3xl p-3`}
                  onClick={()=>setActiveMeth("cr")}
                dangerouslySetInnerHTML={{ __html: meth['cr'].title }}> 
                </div>
              </div>
            </div> 
          </div>
          <div className=" absolute -z-10 top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
            <img className={`${styles.triangle}`} src={TriPng} alt="" />
          </div>
        </div>
      </div>

      <div className={`rounded-lg mb-20 mx-auto w-11/12`}>
        <h1 className='font-black text-center text-2xl md:text-4xl mb-4'
          dangerouslySetInnerHTML={{ __html: meth[activeMeth].title.replace("<br/>", "") }}
        ></h1>
        <p className='text-center md:text-xl md:px-32 pt-3'
            dangerouslySetInnerHTML={{ __html: meth[activeMeth].text }}
        ></p>
      </div>
    </div>
  );
}

export default Method;


/* 
<div className="h-96 mt-10 mb-20 w-full flex justify-center items-center">
        <div className="scale-75 h-96 md:w-1/2 flex gap-3 font-bold">
          <div className="w-1/2 h-full flex gap-3 flex-col" >
            <div className="h-3/6 flex justify-end items-end">
              <div
                onClick={()=>setActiveMeth("ct")}
                className={`cursor-pointer transition-all text-white bg-color-400 rounded-lg flex justify-center items-center
              ${activeMeth === 'ct' ? 'h-full w-10/12 text-3xl' : 'w-9/12 h-5/6 text-xl'} hover:text-3xl hover:w-10/12 hover:h-full`}
                 dangerouslySetInnerHTML={{ __html: meth['ct'].title }}
              ></div>
            </div> 
            <div className="h-3/6 flex justify-end items-start ">
              <div
                onClick={()=>setActiveMeth("com")}
                className={`cursor-pointer transition-all text-slate-900 bg-accent-400 rounded-lg flex justify-center items-center
              ${activeMeth === 'com' ? 'w-9/12 h-4/5 text-3xl' : 'w-8/12 h-2/3 text-xl'} hover:text-3xl hover:w-9/12 hover:h-4/5`}
                 dangerouslySetInnerHTML={{ __html: meth['com'].title }}
              ></div>
            </div> 
          </div>
          <div className="w-1/2 h-full mt-6 flex flex-col gap-3" >
            <div className="h-4/6 flex justify-start items-end">
              <div
                onClick={()=>setActiveMeth("col")}
                className={`cursor-pointer transition-all text-slate-900 bg-accent-400 rounded-lg flex justify-center items-center
              ${activeMeth === 'col' ? 'w-8/12 h-full text-3xl' : 'w-7/12 h-5/6 text-xl'} hover:text-3xl hover:w-8/12 hover:h-full`}
                 dangerouslySetInnerHTML={{ __html: meth['col'].title }}
              ></div>
            </div>
            <div className="h-3/6 flex justify-start items-start">
              <div
                onClick={()=>setActiveMeth("cr")}
                className={`cursor-pointer transition-all text-white bg-color-400 rounded-lg flex justify-center items-center
              ${activeMeth === 'cr' ? 'w-8/12 h-5/6 text-3xl' : 'w-7/12 h-4/6 text-xl'} hover:text-3xl hover:w-8/12 hover:h-5/6`}
                 dangerouslySetInnerHTML={{ __html: meth['cr'].title }}
              ></div>
            </div>
          </div>
        </div>
      </div>

*/


/*



*/