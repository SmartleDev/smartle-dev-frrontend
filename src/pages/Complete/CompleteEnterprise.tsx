import React,{useState} from 'react';
import Enterprise from '../enterprise';
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';

const CompleteEnterprise = () => {
    const [showHeader] = useState<boolean>(true);
    const [showFooter] = useState<boolean>(true);

    return (
        <>
            <div className="App dark:text-white dark:bg-slate-900 min-h-screen mx-auto relative overflow-x-hidden overflow-y-auto">
            <div className='mx-auto' style={{ maxWidth: '1400px' }}>
                {showHeader && <Header />}
                <Enterprise />
                </div>
            </div>
            {showFooter && <Footer />}
        </>
    );
};

export default CompleteEnterprise;