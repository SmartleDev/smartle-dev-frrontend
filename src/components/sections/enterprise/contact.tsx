import React, { useState } from 'react';
import { sendMail } from '../../../util/api';
import { BlueBar } from '../../../util/resources';
import ContactForm from '../../molecules/ContactForm';

const Contact = () => {
  const [fail, setFail] = useState<string | undefined>(undefined);
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
        {label:'Company', value:'Company'},
        {label:'School', value:'School'},        
      ],      
    },    
    {
      label: "Company / School",
      required: true,
      type: 'text',
      extraClass:''
    },  
    {
      label: "Brief Message",
      required: true,
      type: 'text',        
      multiline: true,
      extraClass:'my-6'
    },    
  ];
  return <div className='mx-auto relative md:mt-40' id="contactForm">  
    <h1 className="text-4xl mb-8 font-extrabold text-center">Get in touch with us</h1>
    {!fail && (<img src={BlueBar.default} className='absolute top-40' alt="" />)}
    <div className="py-3 mx-5 md:mx-auto md:w-3/5 z-10 relative pb-40">
      <ContactForm setTopFail={setFail} fields={fields} color="bg-contrastAccent-200" whichForm='Enterprise' btnColor="bg-contrast-400" />
    </div>
  </div>;
}

export default Contact;