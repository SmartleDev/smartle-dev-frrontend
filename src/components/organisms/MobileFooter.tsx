import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Footer from './Footer';

const MobileFooter = () => {
    const isMobile = useMediaQuery('(max-width:1199px)');
    return (
        <div style={{marginTop: '10px'}}>
            {isMobile && <Footer />}
        </div>
    );
};

export default MobileFooter;