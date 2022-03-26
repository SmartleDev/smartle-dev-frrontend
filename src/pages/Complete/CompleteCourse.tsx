import React,{useState} from 'react';
import Course from '../course';
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';

const CompleteCourse = () => {
    const [showHeader] = useState<boolean>(true);
    const [showFooter] = useState<boolean>(true);

    return (
        <>
            <div className="App dark:text-white dark:bg-slate-900 min-h-screen mx-auto relative overflow-x-hidden overflow-y-auto">
            <div className='mx-auto' style={{ maxWidth: '1400px' }}>
                {showHeader && <Header />}
                <Course />
                </div>
            </div>
            {showFooter && <Footer />}
        </>
    );
};

export default CompleteCourse;