import React from 'react';
interface Props{
    stats: any;
    text: any;
}
const StatsCard = ({ stats, text }: Props) => {
    return (<>        
        <div className="relative z-30 mt-32 mb-20 py-16 md:py-5 bg-accent-200 w-full h-auto md:h-40 rounded-xl shadow-2xl flex flex-wrap md:flex-nowrap items-center justify-center gap-6">            
            {
                text.length > 0 && text.map((item: { top: string; bottom: string; end: string; start: string; }, itemIdx: number) => {                    
                    return (
                        <React.Fragment key={itemIdx}>
                            <div className="w-40 text-center mt-2">
                                <p className="text-gray-700">{item.top ?? '\u00A0' }</p>
                                <div className={`font-black ${stats[itemIdx].includes('Self-Paced') ? 'text-2xl' : 'text-5xl'} text-center text-color-400`}>
                                    <span className='text-color-400 text-3xl'>{item.start ?? ""}</span>
                                    {stats[itemIdx].includes('Self-Paced') ? 'Self Paced' : stats[itemIdx]}
                                    <span className='text-color-400 text-3xl'>{item.end ?? ""}</span></div>
                                <p className="text-gray-700">{item.bottom ?? '\u00A0' }</p>
                            </div>
                            {
                                itemIdx < text.length - 1 && (<>
                                    <div style={{ height: '0.5px' }} className="w-2/3 bg-slate-300 sm:hidden block"></div>
                                    <div style={{ width: '0.5px' }} className="h-2/3 bg-slate-400 hidden md:block"></div>
                                </>)
                            }
                        </React.Fragment>
                    )
                })
            }
        </div>
    </>);
}

export default StatsCard;

