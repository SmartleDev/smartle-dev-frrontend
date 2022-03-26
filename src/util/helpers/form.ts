export function getSchema(label: string, req: boolean, type: string, Yup: any) {
    if (req === true) {
        if(fieldTypes.string.includes(type)) return Yup.string().required(label + ' is required');
        if(fieldTypes.number.includes(type)) return Yup.number().required(label + ' is required');
        if(fieldTypes.email.includes(type)) return Yup.string().email('Enter a valid email id').required(label + ' is required');
        if(fieldTypes.date.includes(type)) return Yup.date().required(label + ' is required');
        if(fieldTypes.mixed.includes(type)) return Yup.mixed().required(label + ' is required');
    } else {
        if(fieldTypes.string.includes(type)) return Yup.string();
        if(fieldTypes.number.includes(type)) return Yup.number();
        if(fieldTypes.email.includes(type)) return Yup.string().email('Enter a valid email id');
        if(fieldTypes.date.includes(type)) return Yup.date();
        if(fieldTypes.mixed.includes(type)) return Yup.mixed();
    }  
}

export const fieldTypes = {
    "string": ["text", "string", "input", "select", "multiradio"],
    "number": ["number"],
    "email": ["email"],
    "date": ["date"],
    "mixed":["file", "multicheckbox"]
};

export function getFieldType(field: string) {
    for (const [key, value] of Object.entries(fieldTypes)) {
        if (value.includes(field)) return key;
    }
}