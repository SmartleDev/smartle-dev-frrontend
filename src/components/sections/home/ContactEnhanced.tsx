import React, {useState, useEffect} from 'react'
import '../../../styles/general.css'
import PhoneInput, {formatPhoneNumberIntl } from 'react-phone-number-input'
import useMediaQuery from '@mui/material/useMediaQuery'
import 'react-phone-number-input/style.css'
import Button from "@mui/material/Button";
import API from '../../../redux/api/api';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Grid } from '@mui/material';
import './home.css'

function ContactEnhanced() {
  
    const [value, setValue] = useState<any>(0)
    const [phoneNumber, setPhoneNumber] = useState<any>(formatPhoneNumberIntl(value)?.split(' '))

  const [contactInfo, setContactInfo] = useState({
      fullName : '',
      emailAddress : '',
      contactas : '',
      description: ''
  })

  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:450px)');

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  console.log(value)

  useEffect(() => {

  },[value, contactInfo])

  console.log(contactInfo)

  const handelSubmit = (e:any) => {
    e.preventDefault();
    API.post('contactus', {  name : contactInfo?.fullName, email : contactInfo?.emailAddress, contactno : value, message : contactInfo?.description, contacting_as : contactInfo?.contactas})
    .then((res)=>{
      handleClick()
      setContactInfo({
        fullName : '',
        emailAddress : '',
        description: '',
        contactas : ''
      })
      setValue(0)
    }).catch((err) => {
      console.log(err)
    })
  }
  const handelChange = (e: any) => {
    const {name, value} = e.target
    setContactInfo({...contactInfo, [name]:value})
    formatPhoneNumberIntl(value)?.split(' ')
  }
  return (
    <div> 
      <form action="" onSubmit={handelSubmit}>
       <h1 className="text-3xl md:text-3xl text-center mb-10 font-black md:pb-10" id="contactForm">Get in touch with us</h1>
        <input type="text" name="fullName" onChange={handelChange} value = {contactInfo.fullName}  className='formInputGeneral' id ='fullName' placeholder='Name' />

        <Grid  container spacing={4} className="mt-1 mb-3">
          <Grid item xs={12} lg={7}>
            <input type="email" name="emailAddress" onChange={handelChange}  value = {contactInfo.emailAddress}  id="emailAddress" className='formInputGeneral' placeholder='Email Address' />
          </Grid>
          <Grid item xs={12} lg={5}>
            <PhoneInput
            international
            defaultCountry="IN"
            name = 'phoneNumber'
            countryCallingCodeEditable={false}
            placeholder = 'Phone'
            value={value}
            onChange={setValue}/>
          </Grid>
        </Grid>
        <div className = 'pb-5 radio_style'>

          <span>Contacting as: </span> 
          {isMobile &&<br />}
          <label className ='radioContact'>
          <input type="radio" onChange={handelChange}  value = "Parent" name="contactas" id="parent" className = 'mx-5'/>
          Parent </label>
          {isMobile &&
            <>
            <br />
            <br />
            </>
            }

          <input type="radio" onChange={handelChange}  value = "School" name="contactas" id="School" className = 'mx-5'/>
          <label>School </label>
          {isMobile &&
            <>
            <br />
            <br />
            </>
            }

          <input type="radio" onChange={handelChange}  value = "Instructor/Coach" name="contactas" id="Instructor/Coach" className = 'mx-5'/>
          <label>Instructor/Coach </label>
        </div>

        <textarea className = 'formInputGeneral' onChange={handelChange}  value = {contactInfo.description} name = "description" placeholder='Brief message' id="" style ={{width : '100%', height: '14rem', resize: 'none'}}></textarea>
        <div className='flex justify-center pt-10'>
        <Button style = {{backgroundColor : '#917EBD'}} type = 'submit' className={`bg-#917EBD text-white rounded-md font-bold shadow-none drop-shadow-lg px-8 py-2 ml-5`} >
                                    Contact US
                                </Button>
                                </div>
                               </form>
                               <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    Your Respnse has been Recorded and we will get back to you as soon as possbile 
  </Alert>
</Snackbar>
    </div>

  )
}

export default ContactEnhanced