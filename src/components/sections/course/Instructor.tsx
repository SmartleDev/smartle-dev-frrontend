import Rating from '@mui/material/Rating';
import React from 'react';
import GradientBlobBL from '../../atom/GradientBlobBL';
import PopOutCircle from '../../atom/PopOutCircle';
import { RatingStar, RatingStarEmpty } from '../../../util/resources'
import styled from '@emotion/styled';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

interface Props{
    instructor: any;
}

const Instructor = ({instructor}:Props) => {
    return (<div className=''>
        <h1 className="text-4xl font-black text-center mb-10 md:mb-20">Meet your Instructor</h1>
        <div className='mt-30 pb-0 md:pb-32 flex flex-wrap justify-between items-center md:justify-start gap-5 overflow-y-hidden'>
            <div className="w-4/12 h-auto relative ">
                <GradientBlobBL classes="hidden md:block -top-8 left-0" />
                <PopOutCircle
                    extraClasses="origin-top scale-50 md:scale-75 lg:transform-none"
                    circleShadow='' circleBg='transparent' image={instructor.image} imagePos="0% 35%" />
            </div>
            <div className="md:w-6/12 -translate-y-28 md:transform-none h-auto md:my-10 relative z-10">
                <h1 className="font-black text-xl text-center md:text-left">Instructor</h1>
                <h1 className=" text-3xl my-1 text-center md:text-left">{instructor.name}</h1>
                <p className='md:text-xl my-5 text-center md:text-left'>" {instructor.desc}</p>
                {/* <div className="flex flex-wrap justify-center md:justify-start items-center my-3">
                    <div className="mr-3">
                        <StyledRating
                            name="customized-color"
                            value={instructor.stars}
                            max={instructor.stars}
                            readOnly 
                            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            icon={<img alt="" src={RatingStar.default} />}
                            emptyIcon={<img alt="" src={RatingStarEmpty.default} />}
                        />
                    </div>
                    <div className="w-full md:w-auto text-center mt-2 md:mt-0 text-lg ">{instructor.reviews} Total Reviews </div>
                </div> */}
                {/* <p className="text-lg text-center md:text-left"><span className='font-bold font-poppins'>Instructor availability:</span>
                <br className='block md:hidden' />    {instructor.availability}</p> */}
            </div>
        </div>        
    </div>);
}

export default Instructor;
