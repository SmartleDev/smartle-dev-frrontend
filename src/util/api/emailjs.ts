export const sendMail = async (formVal: any) => {
    var formData = {
            service_id: process.env.REACT_APP_SERVICE,
            template_id: process.env.REACT_APP_EMAIL_TEMPLATE,
            user_id: process.env.REACT_APP_EMAIL_USER,
            template_params: {
                ...formVal
            }
    };    
    const res = await fetch(`https://api.emailjs.com/api/v1.0/email/send`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (res.status === 400) {
        throw new Error('Failed to Submit Form.');
    }    
    return res;
};