import React,{useState} from 'react';
import Legal from '../legal';
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';

const CompleteLegal = () => {
    const [showHeader] = useState<boolean>(true);
    const [showFooter] = useState<boolean>(true);

    return (
        <>
            <div className="App dark:text-white dark:bg-slate-900 min-h-screen mx-auto relative overflow-x-hidden overflow-y-auto">
            <div className='mx-auto' style={{ maxWidth: '1400px' }}>
                {showHeader && <Header />}
                <Legal />
                </div>
            </div>
            {showFooter && <Footer />}
        </>
    );
};

export default CompleteLegal;