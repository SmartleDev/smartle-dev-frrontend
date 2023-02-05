import React from 'react';
import { Link } from 'react-router-dom';
import { CreditsTag } from '../../util/resources';
import './courseOnHome.css';

interface Props {
  course: any;
  width?: string;
  color?: string;
}

const CourseGridElement = ({
  course,
  width = 'sm:w-1/2 md:w-1/3 lg:w-3/12',
  color = 'accent-200',
}: Props) => {
  return (
    <div className={`${width} md:p-3`} style={{ borderRadius: '5px' }}>
      <Link className={``} to={`/course/${course.course_title}`}>
        <div className="flip-card" style={{ borderRadius: '5px' }}>
          <div className="flip-card-inner" style={{ borderRadius: '5px' }}>
            <div className="flip-card-front" style={{ borderRadius: '5px' }}>
              <div
                style={{
                  height: '25rem',
                  width: '17rem',
                  borderRadius: '5px',
                  textAlign: 'start',
                }}
                className={`bg-${color} rounded-lg  shadow-xl relative md:p-4`}
              >
                {course.credits ? (
                  <>
                    <img
                      src={CreditsTag.default}
                      alt="Credits"
                      className="absolute z-20 -top-2 -right-2"
                    />
                  </>
                ) : (
                  <></>
                )}
                <div className="relative overflow-y-hidden h-full">
                  <h2 className="courseFontStyle p-3 md:p-0">
                    {course.course_title}
                  </h2>
                  <div className="text-sm px-4 md:px-0 my-2 relative overflow-x-hidden overflow-y-hidden">
                    <p className="text-slate-900">
                      {course.course_description}
                    </p>
                    <div
                      className={`select-none bg-gradient-to-b from-transparent via-transparent to-${color} w-full h-full absolute inset-0`}
                    />
                  </div>
                  {
                    <div className="heroImg">
                      <img
                        className="w-full h-39 z-10 relative rounded-t-lg md:rounded-lg"
                        loading="lazy"
                        src={course.course_image}
                        alt={course.course_name}
                      />
                    </div>
                  }
                </div>
              </div>
            </div>
            <div
              style={{ textAlign: 'start', borderRadius: '5px' }}
              className="flip-card-back p-4"
            >
              <h2 className="courseFontStyle ">{course.course_title}</h2>
              <br />
              <br />

              <div className="courseFlip" style={{ borderRadius: '5px' }}>
                <h4>These are Offered as:</h4>
                {course.course_type
                  .split(',')
                  .map((dataItem: any, index: any) => (
                    <p>{dataItem}</p>
                  ))}
                <br />
                <br />
                <h4>Curated for Ages: </h4>
                <p>
                  <div id="courseAge">
                    {course.course_age
                      .split(',')
                      .map((dataItem: any, index: any) => (
                        <span>{dataItem}</span>
                      ))}
                  </div>
                </p>
              </div>
              <p
                className="openCourse"
                style={{
                  fontSize: '16px',
                  textAlign: 'center',
                  marginLeft: '-35px',
                }}
              >
                Take me to course
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseGridElement;
