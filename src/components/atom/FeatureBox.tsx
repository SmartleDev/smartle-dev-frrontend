import React from 'react'

interface Props{
    pos: string;
    img: any;
    title: any;
    desc: any;
    color?: string;
    size?: string;
}
const FeatureBox = ({ pos, img, title, desc, color='bg-accent-200 ', size='h-80  w-60' }:Props) => {
    return (
        <div key={title} className={`absolute text-slate-900 rounded-3xl shadow-2xl z-20 ${color} ${pos} md:w-56 ${size} `}>
            <img className="pt-5 w-16 pb-2 mx-auto" src={img} alt="" />
            <div className="text-2xl text-center font-bold"
                dangerouslySetInnerHTML={{ __html: title }}
            >
            </div>
            <p className="p-4 text-center"
                dangerouslySetInnerHTML={{ __html: desc }}
            >
            </p>
        </div>
    )
}

export default FeatureBox