import React, { useState } from 'react';
import { cleanText, isNull } from '../../../util/helpers';
import Transition from '../../atom/Transition';
interface Props{
  curr: any;
  enterprise?: any;
}
const Curriculum = ({ curr, enterprise = false }: Props) => {
  const [tabVal, setTabVal] = useState<number>(0);
  let keys = Object.keys(curr);
  return (<>
    <div className='mb-20'>
      <h1 className="text-4xl font-black text-center mb-20">Course Curriculum</h1>
      {
        !isNull(curr) && (
          enterprise === false ? curr.map((cur: any, idx: number) => {
            return (
              <div className='mb-5' key={idx}>
                <span className='font-extrabold'>{String(idx + 1).padStart(2, '0')}:&nbsp;&nbsp; </span>{cur.value}
              </div>
            );
          }) : (<>
              <div className="flex justify-center">
                {
                  keys.map((k, kidx) => {
                    let activeClass="border-2 border-contrast-400 bg-white text-contrast-400";
                    if (kidx === tabVal) activeClass = "border-2 border-contrast-400 bg-contrast-400 text-white"
                    return (
                      <button onClick={()=>setTabVal(kidx)} className={`${activeClass} py-2 px-5 mx-4 rounded-md`}>{k}</button>
                    )
                  })
                }
              </div>
              <div>
                {
                  Object.entries(curr).map((c:any, cidx) => {
                    let activeClass = "hidden";
                    if (cidx === tabVal) activeClass = "";
                    return (
                      <Transition index={cidx} >
                      <div className={`${activeClass} mt-10`}>
                        {
                          c?.[1]?.map((cur: any, idx: number) => {
                            return (
                              <div className='mb-5 flex' >
                                <div className='font-extrabold'>{String(idx + 1).padStart(2, '0')}:&nbsp;&nbsp; </div>{cur.value}
                              </div>
                            );
                          })
                        }
                        </div>
                      </Transition>
                    );
                  })
                }
              </div>
          </>)
        )
      }      
    </div>
  </>);
}

export default Curriculum;
