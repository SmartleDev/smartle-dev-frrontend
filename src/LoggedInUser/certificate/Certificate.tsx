import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import './template.style.css';
import StartJpg from './star.jpg';
import API from '../../redux/api/api';
import moment from 'moment';

const DUMMY_DATA = [
  { name: 'XXX', occupation: 'Founder & Director' },
  { name: 'YYY', occupation: 'Mentor' },
];

function Certificate({
  name = 'MARK',
  courseName = 'Course_Name',
  offered_by = 'Offered_by',
  date = '18 February, 2022',
}) {
  const ref = useRef(null);
  const generatePDF = () => {
    const content: any = ref.current;

    const doc = new jsPDF('l', 'mm', [1000, 640]);

    doc.html(content, {
      callback: function (doc) {
        doc.addFont('Pinyon Script', 'Comic Sans', 'normal');
        doc.save('sample.pdf');
      },
      x: 10,
      y: 10,
    });
  };

  const [studentData, setStudentData] = useState<any>('');
  console.log(studentData);
  const [leanerUser, setLearnerUser] = useState<any>(
    JSON.parse(localStorage.getItem('learner-details') || 'null')
  );

  const { id } = useParams();

  useEffect(() => {
    API.post('getEnrolledCourseView', {
      courseId: id,
      studentId: leanerUser.student_id,
    })
      .then((res) => {
        setStudentData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let imgSrc__dummy =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaEOB_CNa6DXF5-w_Fy5uyHodcA4lK1FwhTmnP1eWt6k-wKlBEkfnQ0Uc5wO9eM1QGByU&usqp=CAU';

  return (
    <>
      <div className="c_template-wrapper">
        <div ref={ref}>
          <header className="c_template-header">
            <h2>
              CERTIFICATE <span>of</span> <span>COURSE COMPLETION</span>
            </h2>
            <div className="c_template-header-divider">
              {/* <img src={StartJpg} alt="star" /> */}
              <span></span>
              <div className="c_lead">Presented To</div>
            </div>
          </header>
          <main className="c_template-main">
            <h1>{leanerUser.student_name}</h1>
            <p className="c_para">
              who has successfully completed the{' '}
              <b>{studentData?.course_name}</b> course offered by{' '}
              <b>Smartle Co</b> on <span>{moment(studentData?.date_of_completion).format('DD/MM/YYYY')}</span>. We value and appreciate
              your efforts and interest in completing the course.
            </p>

            <div className="c_sign-wrapper">
              {/* {DUMMY_DATA.map((sign, index) => (
              <SignItem key={index} {...sign} />
            ))} */}
              <div className="c_sign-item">
                <img src={imgSrc__dummy} alt="signature here" />
                <p>{'Paddy'}</p>
                <p>{'Smartle CEO'}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="generate_certificate_button_main">
        <button className="generate_certificate_pdf" onClick={generatePDF}>
          Generate PDF
        </button>
      </div>
    </>
  );
}

export default Certificate;
