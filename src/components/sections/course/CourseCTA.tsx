import Button from '@mui/material/Button';
import React from 'react';
import RegisterInterestModal from '../../organisms/RegisterInterestModal';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface Props{
    courseId: any;
    isEnterprise?: boolean;
    status: string | null;
}
const CourseCTA = ({courseId, isEnterprise=false, status}:Props) => {
    const [openInterest, setOpenInterest] = React.useState(false);
    const handleOpenInterest = () => setOpenInterest(true);
    const handleCloseInterest = () => setOpenInterest(false);

    const redTheme = createTheme({ palette: { primary:{
        main:  '#917EBD'}
      } });
    

    return (
        <div className={`${isEnterprise ? 'bg-contrastAccent-200' : 'bg-accent-200'}  pt-20 pb-16`}>
            <div className="w-10/12 mx-auto">
                <div className="text-center pb-5">Register now to give your kids the competitive edge with Smartle.</div>
                <div className="flex justify-center gap-4">
                <ThemeProvider theme={redTheme}>
                    {/* <RegisterInterestModal isEnterprise={isEnterprise} courseId={courseId} openInterest={openInterest} handleCloseInterest={handleCloseInterest} /> */}
                    {status === 'WAITLISTED' && <Button
                        onClick={handleOpenInterest}
                        className={`px-14 py-2 text-white ${isEnterprise ? 'bg-contrast-400' : 'bg-color-400'} font-bold rounded-md`}>Register Your Interest</Button>}
                    {status === 'ACTIVE' && <><Button variant='contained' 
                    style={{marginTop:"30px", marginRight:"30px", paddingLeft: "25px", paddingRight:"25px"}}>
                    <Typography fontWeight={"500"} fontSize="18px">
                      Book Course
                    </Typography>
                    </Button>
                    <Button variant='contained' style={{marginTop:"30px", paddingLeft: "40px", paddingRight:"40px"}}>
                    <Typography fontWeight={"500"} fontSize="18px">
                      Book Trial
                    </Typography>
                    </Button>
                    </>}
                    </ThemeProvider>
                    {/* <Button className='px-14 py-2 text-white bg-color-400 font-bold rounded-md'>Buy Course</Button>
                    <Button className='px-14 py-2 text-white bg-color-400 font-bold rounded-md'>Book Trial</Button> */}
                </div>
            </div>            
        </div>
    );
}

export default CourseCTA;
