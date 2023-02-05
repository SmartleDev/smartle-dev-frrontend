import React, { useState } from 'react';
import Course from '../courseViewHome';
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';
import HeaderAfterLoggedIn from '../../components/organisms/HeaderAfterLoggedIn';
import MobileLoggedHeader from '../../LoggedInUser/MobileLoggedHeader';
import CourseViewLoggedIn from '../../LoggedInUser/CourseViewLoggedIn';

const CompleteCourse = () => {
  const [showHeader] = useState<boolean>(true);
  const [showFooter] = useState<boolean>(true);
  const [leanerUser, setLearnerUser] = useState<any>(
    JSON.parse(localStorage.getItem('learner-details') || 'null')
  );

  return (
    <>
      <div className="App dark:text-white dark:bg-slate-900 min-h-screen mx-auto relative overflow-x-hidden overflow-y-auto">
        <div className="mx-auto" style={{ maxWidth: '1400px' }}>
          {showHeader && leanerUser ? <MobileLoggedHeader /> : <Header />}
          {showHeader && leanerUser ? <CourseViewLoggedIn /> : <Course />}
        </div>
      </div>
      {showFooter && <Footer />}
    </>
  );
};

export default CompleteCourse;
