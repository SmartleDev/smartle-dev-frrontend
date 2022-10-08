import React, { useEffect, useState} from 'react';
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import GradientBlobT from '../components/atom/GradientBlobT';
import CoursesStack from '../components/dynamic/CoursesStack';
import { getCourses } from '../util/api';
import { isNull } from '../util/helpers';
import { TopGrad } from '../util/resources/vector';
import { Clock, Card } from '../util/resources';
import axios from 'axios';
import { actionCreators } from '../redux';
import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import API from '../redux/api/api';
import useMediaQuery from '@mui/material/useMediaQuery'
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import CourseGridElement from '../components/dynamic/CourseGridElement'

const Courses = () => {
  const [courses, setCourses] = useState<any>(undefined);
  console.log(courses)
  const [page, setPage] = useState(10);
  const[iterator, setIterator] = useState(10);
  const[numberOfPages, setNumberOfPages] = useState(10);
  const [ogCourses, setOgCourses] = useState<any>(undefined);
  const [updateCourses, setUpdateCourses] = useState(1);
  const [fail, setFail] = useState(undefined);
  const [filterValue, setFilterValue] = useState<string | undefined>(undefined);
  const [filterAge, setFilterAge] = useState<string | undefined>('All');
  const [filterType, setFilterType] = useState<string | undefined>('All');
  const [learner, setLearner] = useState<any>(JSON.parse(localStorage.getItem('learner-details') || 'null'))
  
  const dispatch = useDispatch();
  const { fetchUsers, fetchCourseID, fetchEnrollmentID} = bindActionCreators(actionCreators, dispatch)
  const isMobile = useMediaQuery('(max-width:1400px)');
  const course_id = useSelector((state: RootState) => state.courseIDFetch)
  console.log(course_id)

  useEffect(() => {
    fetchEnrollmentID(0)
  }, []);
  useEffect(() => {
    ( async () => {
			try {
       if(learner !== null){
        API.post("getRecommendedCourses", {learnerAge : Number(learner?.student_age)})
        .then((res)=>{
          const json = res.data;
          if(filterValue !== undefined){
            console.log(json)
           setCourses(json?.filter((dataItem: any, index: any) => dataItem.course_title?.toLowerCase().includes(filterValue?.toLowerCase())))
         }else if (filterType !== 'All'){
          setCourses(json.filter((dataItem: any, index: any) => dataItem.course_type?.includes(filterType)))
         }else{
            setCourses(json);
          }
        }).catch((err) => {
          console.log(err)
        })
       }else{
        const res = await fetch(
          `https://www.backend.smartle.co/courses`
        );
         const json = await res.json();
        if(filterValue !== undefined){
          console.log(json.result)
         setCourses(json.result?.filter((dataItem: any, index: any) => dataItem.course_title?.toLowerCase().includes(filterValue?.toLowerCase())))
       }else if (filterAge !== 'All' && filterType !== 'All'){
         setCourses(json.result?.filter((dataItem: any, index: any) =>dataItem.course_age?.includes(filterAge) &&  dataItem.course_type?.includes(filterType)))
       }else if (filterAge !== 'All'){
         setCourses(json.result?.filter((dataItem: any, index: any) => dataItem.course_age?.includes(filterAge)))
       }else if (filterType !== 'All'){
         setCourses(json.result?.filter((dataItem: any, index: any) => dataItem.course_type?.includes(filterType)))
       }else{
          setCourses(json.result);
        }
       }
			} catch (e: any) {
				setFail(e.message);
			}
		})();
  }, [filterAge, filterValue, filterType])

  useEffect(() => {
    if (!isNull(courses) && !isNull(ogCourses)) {    
      setFilterAge(undefined);
      setCourses([]);
      let lclCourses = [ ...ogCourses ];
      if (isNull(filterValue)) setCourses(lclCourses);  
      (async () => {
        let newlist  = await courses?.filter((dataItem: any, index: any) => dataItem?.includes(filterAge))
        
        // lclCourses?.filter(
        //   (course: any) => course.title?.toLowerCase().includes(filterValue?.toLowerCase())
        // )      
        setCourses(newlist);
        setUpdateCourses(updateCourses+1)
      })();
    }
  }, [filterValue, filterType]);
  
const color='accent-200' 
const width='sm:w-1/2 md:w-1/3 lg:w-3/12'
  return (<>
    <div className="md:w-8/12 mx-auto pb-20 relative z-10">
      <h2 className="text-3xl font-black pt-40 text-center p-3">Explore our courses</h2>
      <p className="px-3 md:px-7 text-md md:text-xl text-center mt-6">Specially designed courses aimed to pique children's interest, curiosity and learning. We have the best curriculum designed in discussion with top advisors from academia and the industry.</p>
      <div className="filter mt-16">
        <div className="hidden md:block">
          <div className="md:w-2/3 shadow-lg  mx-auto flex flex-wrap items-stretch  border-0 md:border-2 border-neutral-300 rounded-lg">
            <div className="md:w-9/12">          
              <input type="text" id="filter-input"
                className="w-full border-2 md:border-0 border-neutral-300  box-content shadow-none outline-0 rounded-lg px-5 text-neutral-400 font-semibold -z-10 h-full"
                onKeyDown={function(e){if (e.key === 'Enter') setFilterValue((e.target as any).value)}}
              />
            </div>
            <button
              type='submit'
              className='sm:text-sm w-full bg-color-400 scale-110 text-xl font-bold md:w-3/12 px-5 py-2 md:px-auto text-white rounded-lg'    
              onClick={()=>setFilterValue((document.getElementById('filter-input') as HTMLInputElement)?.value as string)}
            >
              Search
            </button>
          </div>
        </div>
        <div className="md:hidden">
          <div className=" text-center">
            <input type="text" id="filter-input2"
              placeholder="Filter"
                className="mb-3 mx-auto  border border-slate-500 w-10/12 rounded-lg px-5 py-2"
                onKeyDown={function(e){if (e.key == 'Enter') setFilterValue((e.target as any).value)}}
            />
          </div>
          <div className="text-center">
          <button
              type='submit'
              className='bg-color-400 mx-auto text-xl font-bold  px-10 py-2 w-10/12 text-white rounded-lg'    
              onClick={()=>setFilterValue((document.getElementById('filter-input2') as HTMLInputElement)?.value as string)}
            >
              Search
            </button>
            </div>
        </div>
      
      </div>
      <div className=" mt-10 mb-5">

     {/* {learner === null && <div className="flex flex-wrap justify-center w-10/12 mx-auto" style={{color: '#735AAC', fontWeight: '400', fontSize: '12px'}}>
          <div onClick={()=>{setFilterAge('All')}}>
            {filterAge === 'All' ? <div  style ={{cursor: 'pointer' ,backgroundColor : '#DFD1E7', padding : '8px 50px',borderRadius : '30px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)', marginRight:'30px'}}>All</div>: <div  style ={{cursor: 'pointer' ,backgroundColor : '#F9EDF5', padding : '8px 50px',borderRadius : '30px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)', marginRight:'30px'}}>All</div>}
          </div>
          <div onClick={()=>{setFilterAge('8-10')}} >
            {filterAge === '8-10' ? <div  style ={{cursor: 'pointer' ,backgroundColor : '#DFD1E7', padding : '8px 35px',borderRadius : '30px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)', marginRight:'30px'}}>8-10 Yrs</div>: <div  style ={{cursor: 'pointer' ,backgroundColor : '#F9EDF5', padding : '8px 30px',borderRadius : '35px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)', marginRight:'30px'}}>8-10 Yrs</div>}
          </div>
          <div onClick={()=>{setFilterAge('11-12')}}>
            {filterAge === '11-12' ? <div  style ={{cursor: 'pointer' ,backgroundColor : '#DFD1E7', padding : '8px 35px',borderRadius : '30px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)', marginRight:'30px'}}>11-12 Yrs</div>: <div  style ={{cursor: 'pointer' ,backgroundColor : '#F9EDF5', padding : '8px 30px',borderRadius : '35px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)', marginRight:'30px'}}>11-12 Yrs</div>} 
          </div>
          <div onClick={()=>{setFilterAge('13-14')}}>
          {filterAge === '13-14' ? <div  style ={{cursor: 'pointer' ,backgroundColor : '#DFD1E7', padding : '8px 35px',borderRadius : '30px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)', marginRight:'30px'}}>13-14 Yrs</div>: <div  style ={{cursor: 'pointer' ,backgroundColor : '#F9EDF5', padding : '8px 30px',borderRadius : '35px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)', marginRight:'30px'}}>13-14 Yrs</div>} 
            </div>
        </div>} */}
      </div>
    </div>
    <Grid  container className='mb-10' justifyContent={'space-between'}>
      {learner === null && 
      <Grid item sm={12} md={12} lg={6} className='text-center mb-10' style={{color: '#735AAC', fontWeight: '400', fontSize: '12px', textAlign:'center'}}>
         <Typography className='ml-10 lg:ml-28 mb-2' textAlign={'left'}>Select your child’s age:</Typography>
          <Grid  container spacing={3} className='ml-5 md:ml-10 lg:ml-20' >
            {/* <Grid item sm={3} md={3}>
              <div onClick={()=>{setFilterAge('All')}}>
                {filterAge === 'All' ? <div  style ={{cursor: 'pointer' ,backgroundColor : '#DFD1E7', padding : '8px 0px',borderRadius : '30px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)'}}>All</div>: <div  style ={{cursor: 'pointer' ,backgroundColor : '#F9EDF5', padding : '8px 0px',borderRadius : '30px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)'}}>All</div>}
              </div>
            </Grid> */}
            <Grid item sm={3} md={3}>
              <div onClick={()=>{
                  if(filterAge === '8-10'){
                    setFilterAge('All')
                  }else{
                    setFilterAge('8-10')
                  }
                }} >
                {filterAge === '8-10' ? <div  style ={{cursor: 'pointer' ,backgroundColor : '#DFD1E7', padding : '8px 20px',borderRadius : '30px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)'}}>8-10 Yrs</div>: <div  style ={{cursor: 'pointer' ,backgroundColor : '#F9EDF5', padding : '8px 20px',borderRadius : '35px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)'}}>8-10 Yrs</div>}
              </div>
            </Grid>
            <Grid item sm={3} md={3}>
              <div onClick={()=>{
                 if(filterAge === '11-12'){
                  setFilterAge('All')
                }else{
                  setFilterAge('11-12')
                }
                }}>
                {filterAge === '11-12' ? <div  style ={{cursor: 'pointer' ,backgroundColor : '#DFD1E7', padding : '8px 20px',borderRadius : '30px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)'}}>11-12 Yrs</div>: <div  style ={{cursor: 'pointer' ,backgroundColor : '#F9EDF5', padding : '8px 20px',borderRadius : '35px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)'}}>11-12 Yrs</div>} 
              </div>
            </Grid>
            <Grid item sm={3} md={3}>
              <div onClick={()=>{
                if(filterAge === '13-14'){
                  setFilterAge('All')
                }else{
                  setFilterAge('13-14')
                }
                }}>
              {filterAge === '13-14' ? <div  style ={{cursor: 'pointer' ,backgroundColor : '#DFD1E7', padding : '8px 20px',borderRadius : '30px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)'}}>13-14 Yrs</div>: <div  style ={{cursor: 'pointer' ,backgroundColor : '#F9EDF5', padding : '8px 20px',borderRadius : '35px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)' }}>13-14 Yrs</div>} 
                </div>
            </Grid>
          </Grid>
        </Grid>}
        <Grid item sm={12} md={12}  lg={6} style={{color: '#735AAC', fontWeight: '400', fontSize: '12px'}}>
          <Typography className=' ml-10 lg:ml-28 mb-2'>Choose your learning preference:</Typography>
          <Grid  container spacing={3 } className='ml-5 md:ml-10 lg:ml-20' style={{color: '#735AAC', fontWeight: '400', fontSize: '12px', textAlign:'center'}}>
                {/* <Grid item sm={3} md={3}>
                    <div onClick={()=>{setFilterType('All')}}>
                      {filterType === 'All' ? <div  style ={{cursor: 'pointer' ,backgroundColor : '#DFD1E7', padding : '8px 20px',borderRadius : '30px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)'}}>All</div>: <div  style ={{cursor: 'pointer' ,backgroundColor : '#F9EDF5', padding : '8px 20px',borderRadius : '35px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)'}}>All</div>} 
                    </div>
                </Grid> */}
              <Grid item xs={5} sm={3} md={3}>
                  <div
              onClick={()=>{
                if(filterType === 'Hybrid'){
                  setFilterType('All')
                }else{
                  setFilterType('Hybrid')}
                }
                }>
                {filterType === 'Hybrid' ? <div  style ={{cursor: 'pointer' ,backgroundColor : '#DFD1E7', padding : '8px 0px',borderRadius : '30px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)' }}>Hybrid</div>: <div  style ={{cursor: 'pointer' ,backgroundColor : '#F9EDF5', padding : '8px 0px',borderRadius : '35px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)'}}>Hybrid</div>} 
              </div>
              </Grid>
              <Grid item xs={5} sm={3} md={3}>
                  <div
              onClick={()=>{
                if(filterType === 'Self-Paced'){
                  setFilterType('All')
                }else{
                  setFilterType('Self-Paced')}
                }
                
                }>
                {filterType === 'Self-Paced' ? <div  style ={{cursor: 'pointer' ,backgroundColor : '#DFD1E7', padding : '8px 0px',borderRadius : '30px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)'}}>Self-Paced</div>: <div  style ={{cursor: 'pointer' ,backgroundColor : '#F9EDF5', padding : '8px 0px',borderRadius : '35px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)'}}>Self-Paced</div>} 
              </div>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    {
        (!isMobile && !isNull(courses) && courses && updateCourses) ?(

          <div  style={{display : 'flex', justifyContent:'center', flexWrap: 'wrap', borderRadius:'5px'}}>
          {courses?.map((course:any, index: number) => 
          <Link to={`/course/${course.course_title}`} >                
        <div className={`${width} md:p-3`} style={{borderRadius:'5px'}}>
          <div className="flip-card" style={{borderRadius:'5px'}}>
            <div className="flip-card-inner" style={{borderRadius:'5px'}}>
              <div className="flip-card-front" style={{borderRadius:'5px'}}>
                <div style={{height:'25rem', width : '17rem', borderRadius: '5px',textAlign:"start"}}  className={`bg-${color} rounded-lg  shadow-xl relative md:p-4`}>        
                    <div className="relative overflow-y-hidden h-full">
                        <h2  className='courseFontStyle'>{course.course_title}</h2>
                          <div className='text-sm px-4 md:px-0 my-2 relative overflow-x-hidden overflow-y-hidden'>
                            <p className='text-slate-900'>{course.course_description}</p>
                            <div className={`select-none bg-gradient-to-b from-transparent via-transparent to-${color} w-full h-full absolute inset-0`} />
                        </div>
                        {
                            <div className='heroImg'>
                                <img className="w-full h-39 z-10 relative rounded-t-lg md:rounded-lg" loading="lazy" src={course.course_image} alt={course.course_name} />
                            </div>
                        }
                    </div>
                </div>
            </div>
          <div style = {{textAlign:"start", borderRadius:'5px'}} className="flip-card-back p-4">
          <h2  className='courseFontStyle '>{course.course_title}</h2>
          <br />
          <br />

      <div className='courseFlip'>
        <h4>These are Offered as:</h4>
        {course.course_type.split(',').map((dataItem: any,index: any) => 
        <p>{dataItem}</p>
        )}
        <br />
        <br />
        <h4>Curated for Ages: </h4>
        <p><div id = 'courseAge'>
        {course.course_age.split(',').map((dataItem: any,index: any) => 
        <span>{dataItem}</span>
        )}  
            </div></p>
      </div>
      <p className = 'openCourse' style={{fontSize:'16px', textAlign:'center', marginLeft:'-35px'}}>Take me to course</p>
    </div>
  </div>
  </div>
          </div>      
  </Link>       
          )}
          </div>
           
          // <CoursesStack courses={courses} />
        )

        :
        <div className="mx-auto ">
        <div className=' md:w-10/12 my-10 mx-auto flex flex-wrap items-stretch justify-center'>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            navigation
            loop={true}
            autoplay={{ delay: 3500 }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1150: {
                slidesPerView: 2,
              },
            }}
            className="py-10"
          >
            {
              courses ? courses?.map((course:any, key:any) => {
                return (
                  
                  <SwiperSlide>
                    <div className="flex justify-center" id = "mobile_view_cards">
                        <CourseGridElement width="w-52" course={course} key={key} color={color} />
                    </div>
                  </SwiperSlide>
                );
              }) : null
            }
          </Swiper>
        </div>
        </div>
      }
  </>);
}

export default Courses;
