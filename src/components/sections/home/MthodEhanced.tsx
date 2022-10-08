import React from 'react';
import Grid from '@mui/material/Grid';

const MthodEhanced =() => {
  return (

    <div>
      
    <div className='pt- mt- md:pt-16 md:mt-32'>
      <h2 className='font-black text-3xl md:text-5xl text-center'>4C’s Methodology</h2>
      <p className='text-md md:text-xl text-center mx-auto mt-4 md:mt-8'>The 4 C’s for the 21st Century Skills are vital to a thriving learning environment to prepare young learners for the future.</p>
      </div>
      <Grid container spacing={4} className = 'mt-10 md:mt-32'>
        <Grid item xs={6} lg={3}>
            <h1 style ={{color : '#917EBD',fontFamily: 'Poppins',fontSize: '28px',fontWeight: '600',letterSpacing: '0em',textAlign: 'left'}} className = 'mb-5 mr-2 text-lg md:text-3xl'>Critical thinking</h1>
            <p className="text-xs md:text-lg">Critical thinking is the practice of solving problems, among other qualities. It empowers students to discover the truth in assertions, especially when it comes to separating fact from opinion.</p>
        </Grid>
        <Grid item xs={6} lg={3}>
            <h1 style ={{color : '#917EBD',fontFamily: 'Poppins',fontSize: '28px',fontWeight: '600',letterSpacing: '0em',textAlign: 'left'}} className = 'mb-5 text-lg md:text-3xl'>Collaboration</h1>
            <p className="text-xs md:text-lg">Collaboration means getting students to work together, achieve compromises, and get the best possible results from solving a problem.</p>
        </Grid>
        <Grid item xs={6} lg={3}>
          <h1 style ={{color : '#917EBD',fontFamily: 'Poppins',fontSize: '28px',fontWeight: '600',letterSpacing: '0em',textAlign: 'left'}} className = 'mb-5 pr-2 text-lg md:text-3xl'>Communication</h1>
          <p className="text-xs md:text-lg">Communication is the practice of conveying ideas quickly and clearly. It is the glue that brings all of these educational qualities together.</p>
        </Grid>
        <Grid item xs={6} lg={3}>
          <h1 style ={{color : '#917EBD',fontFamily: 'Poppins',fontSize: '28px',fontWeight: '600',letterSpacing: '0em',textAlign: 'left'}} className = 'mb-5  pr-2 text-lg md:text-3xl'>Creativity</h1>
          <p className="text-xs md:text-lg">Creativity is equally important as a means of adaptation. This skill empowers students to see concepts in a different light, which leads to innovation.</p>
        </Grid>
      </Grid>

      {/* <div className = 'mt-10 md:mt-32' style = {{display: 'flex',flexDirection : 'row', justifyContent: 'spaced-evenly'}}>
        
        <div style={{width: '1000px'}}>
          <h1 style ={{color : '#917EBD',fontFamily: 'Poppins',fontSize: '28px',fontWeight: '600',lineHeight: '24px',letterSpacing: '0em',textAlign: 'left'}} className = 'mb-5'>Critical thinking</h1>
          <p className = 'mr-4'>Critical thinking is the practice of solving problems, among other qualities. It empowers students to discover the truth in assertions, especially when it comes to separating fact from opinion.</p>
        </div>
        
        <div style={{width: '1000px'}}>
          <h1 style ={{color : '#917EBD',fontFamily: 'Poppins',fontSize: '28px',fontWeight: '600',lineHeight: '24px',letterSpacing: '0em',textAlign: 'left'}} className = 'mb-5'>Collaboration</h1>
          <p className = 'mr-4'>Collaboration means getting students to work together, achieve compromises, and get the best possible results from solving a problem.</p>
        </div>

        <div style={{width: '1000px'}}>
          <h1 style ={{color : '#917EBD',fontFamily: 'Poppins',fontSize: '28px',fontWeight: '600',lineHeight: '24px',letterSpacing: '0em',textAlign: 'left'}} className = 'mb-5'>Communication</h1>
          <p className = 'mr-4'>Communication is the practice of conveying ideas quickly and clearly. It is the glue that brings all of these educational qualities together.</p>
        </div>

        <div style={{width: '1000px'}}>
          <h1 style ={{color : '#917EBD',fontFamily: 'Poppins',fontSize: '28px',fontWeight: '600',lineHeight: '24px',letterSpacing: '0em',textAlign: 'left'}} className = 'mb-5'>Creativity</h1>
          <p className = 'mr-4'>Creativity is equally important as a means of adaptation. This skill empowers students to see concepts in a different light, which leads to innovation.</p>
        </div> 
      
      </div>*/}

    </div>
  )
}

export default MthodEhanced