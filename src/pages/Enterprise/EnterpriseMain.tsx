import React, { useEffect, useState } from 'react';
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';
import EnterpriseCourseContent from './EnterpriseCourseContent';
import API from '../../redux/api/api';
import { Box } from '@mui/material';
import { Link, useNavigate, useParams, useLocation  } from 'react-router-dom';

function EnterpriseMain() {
  const [enterpirseCourses, setenterpirseCourses] = useState<any>([]);
  let location = useLocation();
  let subject = location.pathname.split('/')[3]
  useEffect(() => {
    API.get(`/getEnterpriseCourse/${subject}`)
      .then((res: any) => {
        console.log(res.data);
        setenterpirseCourses(res.data[0]);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Header />
     <EnterpriseCourseContent  course = {enterpirseCourses}/>
      <Footer />
    </>
  );
}

export default EnterpriseMain;
