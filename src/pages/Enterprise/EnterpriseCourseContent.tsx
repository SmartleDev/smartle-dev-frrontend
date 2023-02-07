import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import API from '../../redux/api/api';

interface props {
  course: any;
}

function EnterpriseCourseContent({ course }: props) {
  const [open, setOpen] = React.useState(false);
  const [registerIntrest, setRegisterIntrest] = useState<any>('');
  const [interestError, setInterestError] = useState<any>('');

  const handleClose = (value: string) => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const validateEmail = (email: string) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handelRegisterIntrest = () => {
    console.log(
      String(registerIntrest)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    );
    if (registerIntrest.trim() === '') {
      setInterestError('Please Enter your Email to Proceed');
    } else if (validateEmail(registerIntrest) === false) {
      setInterestError('Please Enter a Proper Email Address');
    } else {
      API.post('registerIntrest', {
        course_name: course?.title,
        course_type: 'Enterprise',
        course_age: 'Enterprise',
        user_email: registerIntrest,
        course_id: course?.enterprise_course_id,
      })
        .then((res: any) => {
          setOpen(false);
          setRegisterIntrest('');
          console.log(res.data);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Box
        
      >
        <div style={{ display: 'flex', justifyContent: 'Center' }}>
          <div>
            <div className="z-20 relative flex flex-wrap md:flex-row">
              <div className="md:2/3 mt-10 md:mt-0 md:pr-10 main_course">
                <h1 className="font-black text-3xl text-center md:text-left">
                  {course?.title}
                </h1>
                <p className="md:text-lg mt-4 pb-10">{course?.desc}</p>
                <Button
            onClick={handleClickOpen}
            variant="contained"
            style={{ margin: '50px 10px 0 50px' }}
          >
            <Typography
              fontWeight={'600'}
              fontSize="14px"
              px={'30px'}
              py={'3px'}
            >
              Register your interest
            </Typography>
          </Button>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 2xl:w-1/2 flex items-center justify-center flex-col main_course">
            <div
              className={`${'bg-contrastAccent-200'} rounded-md shadow-xl p-3 w-2/3 relative`}
            >
              <img src={course?.image} className="rounded-md w-full" alt="" />
            </div>
          </div>
        </div>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            backgroundColor: '#D3E4FF',
            color: '#5290F2',
            fontWeight: '700',
          }}
        >
          Register Your Interest
        </DialogTitle>
        <DialogContent style={{ backgroundColor: '#D3E4FF' }}>
          <DialogContentText style={{ color: '#5290F2' }}>
            Register Your Interest in this course so we will send you an update
            on your Email as soon as the Course is
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            color="primary"
            value={registerIntrest}
            onChange={(e) => setRegisterIntrest(e.target.value)}
          />
          <h4 style={{ color: '#B52F2F' }}>{interestError}</h4>
        </DialogContent>
        <DialogActions style={{ backgroundColor: '#D3E4FF', color: '#5290F2' }}>
          <Button
            style={{ color: '#5290F2', fontWeight: '700' }}
            onClick={handelRegisterIntrest}
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EnterpriseCourseContent;
