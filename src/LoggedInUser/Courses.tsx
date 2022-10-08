import React,{useState} from 'react';
import CoursesFetched from '../pages/courses';
import HeaderAfterLoggedIn from '../components/organisms/HeaderAfterLoggedIn';
import Footer from '../components/organisms/Footer';
import MobileLoggedHeader from './MobileLoggedHeader';

const Courses = () => {
    const [showHeader] = useState<boolean>(true);
    const [showFooter] = useState<boolean>(true);

    return (
        <>
            <div className="App dark:text-white dark:bg-slate-900 min-h-screen mx-auto relative overflow-x-hidden overflow-y-auto">
            <div className='mx-auto' style={{ maxWidth: '1400px' }}>
                {showHeader && <MobileLoggedHeader />}
                <CoursesFetched />
                </div>
            </div>
            {showFooter && <Footer />}
        </>
    );
};

export default Courses;