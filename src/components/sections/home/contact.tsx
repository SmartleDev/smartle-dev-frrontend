import React from 'react';
import ContactForm from '../../molecules/ContactForm';
import { sendMail } from '../../../util/api';

const Contact = () => {
  let fields:any = [
    {
      label: "Name",
      required: true,
      type: 'text',
    },    
    {
      label: "Email Address",
      required: true,
      type: 'email',
      width: '1/2',      
    },    
    {
      label: "Phone",
      required: true,
      type: 'text',      
      width: '1/2',      
    },    
    {
      label: "Contacting As:",
      required: true,
      type: 'multiradio',            
      children: [
        {label:'Parent', value:'Parent'},
        {label:'School', value:'School'},
        {label:'Instructor / Coach', value:'Instructor / Coach'},
      ],      
    },    
    {
      label: "Brief Message",
      required: true,
      type: 'text',        
      multiline: true,
      extraClass:'my-6'
    },    
  ];
  return <div className=' relative z-10 mx-auto'>    
    <div className="py-3">
      <ContactForm fields={fields} />
    </div>
  </div>;
}

export default Contact;