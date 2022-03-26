import Button from '@mui/material/Button';
import React from 'react';
import Modal from '@mui/material/Modal';
import RegisterInterestModal from '../../organisms/RegisterInterestModal';

interface Props {
    course: any;
    isEnterprise?: boolean;
}
const Banner = ({ course, isEnterprise=false }: Props) => {
    const [openVideo, setOpenVideo] = React.useState(false);
    const handleOpenVideo = () => setOpenVideo(true);
    const handleCloseVideo = () => setOpenVideo(false);
    const [openInterest, setOpenInterest] = React.useState(false);
    const handleOpenInterest = () => setOpenInterest(true);
    const handleCloseInterest = () => setOpenInterest(false);

    return (<>
        <RegisterInterestModal isEnterprise={isEnterprise} courseId={course.id} openInterest={openInterest} handleCloseInterest={handleCloseInterest} />
        <div className="z-20 relative flex flex-wrap flex-col-reverse md:flex-row">
            <div className="md:w-1/2 mt-10 md:mt-0 md:pr-10">
                <h1 className="font-black text-3xl text-center md:text-left">{course.title}</h1>
                <p className="md:text-lg mt-4">{course.desc}</p>
                {
                    !isEnterprise && (<>
                        <h1 className="font-black md:text-xl mt-6">Learning Objectives</h1>
                        <p className="md:text-lg mt-4">{course.objective}</p>
                    </>)
                }
                <div className="flex gap-4">
                    <Button
                        onClick={handleOpenInterest}
                        className={`mt-12 px-7 md:px-14 py-2 text-white ${isEnterprise ? 'bg-contrast-400' : 'bg-color-400'} font-bold rounded-md`}>Register Your Interest</Button>
                </div>
            </div>
            <div className="md:w-1/2 flex items-center justify-center">
                <div className={`${isEnterprise ? 'bg-contrastAccent-200' : 'bg-accent-200'} rounded-md shadow-xl p-3 w-10/12 relative`}>
                    <img src={course?.image} className="rounded-md w-full" alt="" />
                </div>
            </div>          
        </div>        
    </>);
}

export default Banner;


/* 

<div onClick={handleOpenVideo} className="cursor-pointer absolute inset-3 rounded-md bg-gray-800 opacity-30 z-30"></div> 
    <button onClick={handleOpenVideo} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-8 h-8 bg-slate-100 z-40 p-0 flex justify-center items-center">                        
        <i className="bi bi-caret-right-fill text-slate-800 text-xl"></i>
    </button> 

<Modal
            open={openVideo}
            onClose={handleCloseVideo}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"            
        >
            <div className="w-11/12 md:w-9/12 md:h-full py-20 md:py-10 mx-auto">
                <div className="rounded-md md:p-5 bg-white h-full w-full relative">
                    <div onClick={handleCloseVideo} className="cursor-pointer absolute -top-5 -right-5 h-10 w-10 bg-color-400 text-white text-3xl rounded-full flex justify-center items-center">
                        &times;
                    </div>
                    <div className="bg-slate-300 h-full rounded-lg">                        
                        <iframe className="w-full h-full rounded-lg" src={course.videoBase+course.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        </Modal>

*/
