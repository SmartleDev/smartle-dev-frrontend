import * as React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import {
  Grid,
  Box,
  Typography,
  CardContent,
  CardActions,
  Button,
  Stack,
} from "@mui/material";
import API from "../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

interface instrcutorViewer {
  instructor_course_id: number;
  instructor_id: number;
  course_id?: number | null;
  instructor_name: string;
  instructor_email: string;
  instructor_timing: string | null;
  instructor_description: string | null;
}

export interface SimpleDialogProps {
  open: boolean;
  message: any;
  selectedValue: string;
  onClose: (value: string) => void;
}

export function InstructorList(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, message } = props;
  const [instructors, setInstructors] = React.useState<instrcutorViewer[]>([]);
  const course_id = useSelector((state: RootState) => state.courseIDFetch);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchInstructorID } = bindActionCreators(actionCreators, dispatch);

  const instructor_id = useSelector(
    (state: RootState) => state.InstructorIDFetch
  );

  React.useEffect(() => {
    // API.post("getinstructorlist", { courseId: course_id })
    //   .then((res) => {
    //     setInstructors(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} style = {{width : '100%'}}>
      <DialogTitle>Select an Instructor</DialogTitle>
      <div style = {{ display : 'flex', padding : '20px', width : '50vw' }}>
      {/* {message?.status === 'success'  ? <CheckCircleIcon> : <ErrorIcon/>} */}
        <h1>{message?.message}</h1> 
      </div>
    </Dialog>
  );
}
