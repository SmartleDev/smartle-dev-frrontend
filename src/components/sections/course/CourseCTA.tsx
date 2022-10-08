import Button from '@mui/material/Button';
import React,{useState} from 'react';
import RegisterInterestModal from '../../organisms/RegisterInterestModal';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from '../../../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../../../redux/reducers';
import Dialog from '@mui/material/Dialog';
import {Grid} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

interface Props{
    courseId: any;
    isEnterprise?: boolean;
    status: string | null;
}
const CourseCTA = ({courseId, isEnterprise=false, status}:Props) => {
    const [registerIntrest, setRegisterIntrest] = useState<any>('')
    const [openInterest, setOpenInterest] = React.useState(false);
    const handleOpenInterest = () => setOpenInterest(true);
    const handleCloseInterest = () => setOpenInterest(false);
    const [open, setOpen] = React.useState(false);

    const validateEmail = (email: string) =>{
    
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


    const redTheme = createTheme({ palette: { primary:{
        main:  '#917EBD'}
      } });

      const navigate = useNavigate();

      const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || 'null'))
      const [instructors, setInstructors] = useState<instrcutorViewer[]>([]);
      const [courseView, setCourseView] = useState<courseViewer[]>([]);
      const { id } = useParams<{ id: string }>();
      const course_id = useSelector((state: RootState) => state.courseIDFetch)
      const [bookTrialMessage, setBookTrialMessage] = useState<any>('');
      const [interestError, setInterestError] = useState<any>('')
      const emails = ['username@gmail.com', 'user02@gmail.com'];
      const [leanerUser, setLearnerUser] = useState<any>(JSON.parse(localStorage.getItem('learner-details') || 'null'))
      const [selectedValue, setSelectedValue] = React.useState(emails[1]);
      interface courseViewer {
        course_id: number;
        course_name: string;
        course_age: string;
        course_type: string;
        course_cost:string;
        course_description: string;
        course_learningobjective: string;
        course_image: string;
        course_numberofclasses: number;
        course_duration: number;
        course_status: string | null;
    }

    interface instrcutorViewer {
        instructor_course_id: number;
        instructor_id: number;
        course_id ?: number | null;
        instructor_name: string;
        instructor_email:string;
        instructor_timing : string | null;
        instructor_description : string | null;
      }

      const handleBookCourse = () => {
        if(user === null){
          navigate('/login')
        }else{
          navigate('/bookingcourse')
        }
      }

      const handleClickOpen = () => {
        setOpen(true);
      };

      const handelBookTrial = () => {
        if(user === null){
          navigate('/login')
        }else{
          if(instructors.length > 1){
            handleClickOpen()
          }else{
            if(courseView[0]?.course_type === 'Self-Paced'){      
          API.post('enrollLearner', {courseId : course_id, studentId : leanerUser?.student_id, studentFeeStatus : null, sessionId : null, enrollmentType : 'trial'})
          .then((res)=>{
          setBookTrialMessage(res.data)
          navigate('/loggedcourseview')
        }).catch((err) => {
          console.log(err)
        })
            }else{
              setOpen(false);
              // fetchInstructorID(instructors[0]?.instructor_id)
              navigate('/booktrial')
            }
          }
        }
      }

      const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
      };
    

      const handelRegisterIntrest =() => {
        console.log(String(registerIntrest).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        if(registerIntrest.trim() === ''){
        setInterestError('Please Enter your Email to Proceed')
        }else if (validateEmail(registerIntrest) === false){
          setInterestError('Please Enter a Proper Email Address')
        }else{
          API.post('registerIntrest', {course_name : courseView[0]?.course_name, course_type: courseView[0]?.course_type, course_age : courseView[0]?.course_age, user_email: registerIntrest, course_id : courseView[0]?.course_id})
          .then((res)=>{
            setOpen(false)
            setRegisterIntrest('')
            console.log(res.data)
          }).catch((err) => {
            console.log(err)
          })
        }
      }

    

    return (
        <div className={`${isEnterprise ? 'bg-contrastAccent-200' : 'bg-accent-200'}  pt-20 pb-16`}>
            <div className="w-10/12 mx-auto">
                <div className="text-center pb-5">Register now to give your kids the competitive edge with Smartle.</div>
                <div className="flex justify-center gap-4">
                <ThemeProvider theme={redTheme}>
                    {/* <RegisterInterestModal isEnterprise={isEnterprise} courseId={courseId} openInterest={openInterest} handleCloseInterest={handleCloseInterest} /> */}
                    {status === 'WAITLISTED' && <Button
                        onClick = {handleClickOpen}
                        className={`px-14 py-2 text-white ${isEnterprise ? 'bg-contrast-400' : 'bg-color-400'} font-bold rounded-md`}>Register Your Interest</Button>}
                    {status === 'ACTIVE' && <>
                    <Grid container spacing={5}>
                      <Grid item xs={12} md={6} className="text-center md:text-right">
                          <Button variant='contained' 
                            style={{paddingLeft: "25px", paddingRight:"25px"}} onClick={handleBookCourse}>
                        <Typography fontWeight={"500"} className='text-sm md:text-lg' >
                          Book Course
                        </Typography>
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6} className="text-center md:text-left">
                        <Button variant='contained' style={{ paddingLeft: "40px", paddingRight:"40px"}} onClick = {handelBookTrial}>
                      <Typography fontWeight={"500"}  className='text-sm md:text-lg'>
                        Book Trial
                      </Typography>
                      </Button>
                      </Grid>
                    </Grid>

  
                    </>}
                    </ThemeProvider>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle style ={{backgroundColor : '#DFD1E7', color : '#735AAC', fontWeight : '700'}}>Register Your Interest</DialogTitle>
                        <DialogContent style ={{backgroundColor : '#DFD1E7'}}>
                        <DialogContentText style ={{color : '#735AAC'}}>
                        Register Your Interest in this course so we will send you an update on your Email as soon as the Course is
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            color="secondary"
                            value = {registerIntrest}
                            onChange = {(e) => setRegisterIntrest(e.target.value)}
                        />
                        <h4 style ={{color : '#B52F2F'}}>{interestError}</h4>
                        </DialogContent>
                        <DialogActions style ={{backgroundColor : '#DFD1E7', color : '#735AAC'}}>
                        <Button style ={{color : '#735AAC', fontWeight : '700'}} onClick = {handelRegisterIntrest}>Register</Button>
                        </DialogActions>
                    </Dialog>
                    {/* <Button className='px-14 py-2 text-white bg-color-400 font-bold rounded-md'>Buy Course</Button>
                    <Button className='px-14 py-2 text-white bg-color-400 font-bold rounded-md'>Book Trial</Button> */}
                </div>
            </div>            
        </div>
    );
}

export default CourseCTA;
