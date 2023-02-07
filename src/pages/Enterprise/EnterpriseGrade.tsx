import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../../redux/api/api';
import '../../styles/general.css';
import { Box, Typography } from '@mui/material';

function EnterpriseGrade() {
  let location = useLocation();
  let subject = location.pathname.split('/')[3];
  const [getGradNumbers, setGetGradNumbers] = useState<any>([]);
  const [gradeInfo, setGradeInfo] = useState<any>([]);
  const [gradeSelected, setGradeSelected] = useState<any>([]);
  useEffect(() => {
    API.get(`/getGrads/${subject}`)
      .then((res: any) => {
        console.log(res.data);
        setGetGradNumbers(res.data);
        API.post(`/getGradeInfo`, { courseName: subject, grade: res.data[0] })
          .then((res: any) => {
            console.log(res.data);
            setGradeInfo(res.data);
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const handelGrade = (dataItem: any) => {
    API.post(`/getGradeInfo`, { courseName: subject, grade: dataItem })
      .then((res: any) => {
        console.log(res.data);
        setGradeInfo(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  return (
    <Box>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '50px 0 0 0',
        }}
      >
        <h1 style={{ color: '#5290F2' }} className="text_options">
          Select your Grade:
        </h1>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          margin: '50px 0 20px 0',
        }}
      >
        {getGradNumbers?.map((dataItem: any) => (
          <div
            onClick={() => handelGrade(dataItem)}
            className="option_button"
            style={{
              cursor: 'pointer',
              backgroundColor: '#E6F0FF',
              padding: '8px 50px',
              borderRadius: '30px',
              boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)',
              marginRight: '30px',
              marginBottom: '10px',
              color: '#5290F2',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {dataItem}
          </div>
        ))}
      </div>

      <div>
        <h1
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '50px 0 50px 0',
          }}
          className="font-black text-3xl text-center md:text-left"
        >
          Course Curriculum
        </h1>
        {gradeInfo.map((dataItem: any, index: number) => (
          <div className='course_curriculum' style={{ padding: '10px', margin: 'auto'}}>
            {' '}
            <span style={{ fontWeight: 'bolder', color: '#5290F2' }}>
              {index + 1}:  
            </span>{' '}
            <span style ={{marginLeft: '20px'}}>{dataItem?.value}</span>
          </div>
        ))}
      </div>
    </Box>
  );
}

export default EnterpriseGrade;
