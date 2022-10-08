import React,{useState} from 'react';
import Home from '../home';
import Header from '../../components/organisms/Header';
import HeaderAfterLoggedIn from '../../components/organisms/HeaderAfterLoggedIn';
import Footer from '../../components/organisms/Footer';

const CompleteHome = () => {
    const [showHeader] = useState<boolean>(true);
    const [showFooter] = useState<boolean>(true);
    const [leanerUser, setLearnerUser] = useState<any>(JSON.parse(localStorage.getItem('learner-details') || 'null'))

    return (
        <>
            <div className="App dark:text-white dark:bg-slate-900 min-h-screen mx-auto relative overflow-x-hidden overflow-y-auto">
            <div className='mx-auto' style={{ maxWidth: '1400px' }}>
            {(showHeader && leanerUser) ? <HeaderAfterLoggedIn /> : <Header />}
                <Home />
                </div>
            </div>
            {showFooter && <Footer />}
        </>
    );
};

export default CompleteHome;