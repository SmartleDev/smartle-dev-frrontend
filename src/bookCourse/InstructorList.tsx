import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

import API from '../redux/api/api'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../redux';
import {useNavigate} from 'react-router-dom'


interface instrcutorViewer {
	instructor_course_id: number;
	instructor_id: number;
	course_id ?: number | null;
	instructor_name: string;
	instructor_email:string;
	instructor_timing : string | null;
	instructor_description : string | null;
}

export interface SimpleDialogProps {
  open: boolean;
  instructorListing : {}[],
  selectedValue: string;
  onClose: (value: string) => void;
}



export function InstructorList(props: SimpleDialogProps) {

  const { onClose, selectedValue, open} = props;
  const [instructors, setInstructors] = React.useState<instrcutorViewer[]>([]);
  const course_id = useSelector((state: RootState) => state.courseIDFetch)

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {fetchInstructorID} = bindActionCreators(actionCreators, dispatch)

  const instructor_id = useSelector((state: RootState) => state.InstructorIDFetch)
  console.log(instructor_id)

  React.useEffect(() => {
    API.post("getinstructorlist", {courseId : course_id})
    .then((res) => {
    setInstructors(res.data);
    })
    .catch((err) => {
    console.log(err);
    });
  },[])
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select an Instructor</DialogTitle>
      <List sx={{ pt: 0 }}>
        {instructors?.map((dataItem, index) => (
          <ListItem button onClick={()=> {
			  fetchInstructorID(dataItem.instructor_id)
			  onClose('hello')
			  navigate('/booktrial')
			  }} key={index}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={dataItem?.instructor_name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}