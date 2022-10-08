import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { smartlelogo1 } from '../util/resources';

const EmailTemplate = () => {
    return (
        <div style={{width:'80%', margin:'auto'}}>
            <div style={{textAlign: 'center',borderRadius: '40px',background: 'linear-gradient(245.75deg, #FFEBF8 -2.86%, #EAE1FF 103.21%)'}}>
                <div ><img src={smartlelogo1} style={{width:'200px',textAlign:'center',margin:'auto', justifyContent:'center'}}/></div>
                <div> 
                    <p style={{fontSize:'20px', fontWeight:'700'}}>We are glad you are here, Neel</p>
                    <p style={{color: '#917EBD', fontSize:'18px', fontWeight:'900', marginTop:'10px', padding:'20px'}}>Welcome To Smartle</p>
                </div>
            </div>
            <p style={{marginTop:'30px'}}>Congratulations on completing the first step towards a brighter future for your child.</p>
            <p style={{marginTop:'30px'}}>We take pride in being one of few learning solutions that focuses on building critical life skills among young learners.</p>
            <p style={{marginTop:'30px'}}>Get started by adding your Childs profile and let us curate an exciting learning experience that is engaging and one that improves your child’s skills and knowledge for the 21st century.</p>
            <div style={{marginTop:'50px', textAlign:'center'}}><button style={{textAlign:'center',margin:"auto",padding:'10px 30px 10px 30px',color:'white',background: '#917EBD',boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',borderRadius: '20px'}}><a href='www.dev.smartle.co' target="_blank">Get Started</a></button></div>
        </div>
    );
};

export default EmailTemplate;