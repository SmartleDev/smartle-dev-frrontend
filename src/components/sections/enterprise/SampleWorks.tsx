import React, { useEffect, useState } from 'react';
import { getCourses } from '../../../util/api';
import { isNull } from '../../../util/helpers';
import CoursesGrid from '../../molecules/CoursesGrid';
import CoursesStack from '../../molecules/CoursesStack';

const SampleWorks = () => {
    const [courses, setCourses] = useState<any>(undefined);
    const [fail, setFail] = useState(undefined);

    useEffect(() => {
    ( () => {
			try {
                var data = getCourses('enterprise', true, '=', true);
				setCourses(data);
			} catch (e: any) {
				setFail(e.message);
			}
		})();
      }, [])
    
    return (
        <div className='my-16'>
            <h1 className="mb-10 text-center text-3xl font-extrabold">Explore Sample STEM Courses</h1>
            {
                !isNull(courses) && (<CoursesGrid elementWidth='sm:w-1/2 md:w-3/12' color="contrastAccent-200" courses={courses} />)
            }
        </div>
    );
}

export default SampleWorks;
