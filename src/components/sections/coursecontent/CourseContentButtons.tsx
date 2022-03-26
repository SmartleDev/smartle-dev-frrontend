import React from 'react';
import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CourseContentButtons = () => {
    return (
        <Box paddingLeft={"100px"} paddingRight={"100px"}>
            <Link to='/courses' >
                <Button 
                    className='sm:mt-12 md:mt-12 lg:mt-5 xl:mt-0 rounded-md md:rounded-md shadow-xl font-bold py-3 px-5 md:w-auto md:px-10 lg:px-10 h-9 text-white bg-color-400 '>
                        Previous
                </Button>
            </Link>
            <Link to='/courses' >
                <Button 
                    className='sm:mt-12 md:mt-12 lg:mt-5 xl:mt-0 rounded-md md:rounded-md shadow-xl font-bold py-3 px-10 md:w-auto md:px-14 lg:px-14 h-9 text-white bg-color-400' style={{float:"right"}}>
                    Next
                </Button>
            </Link>
        </Box>
    );
};

export default CourseContentButtons;