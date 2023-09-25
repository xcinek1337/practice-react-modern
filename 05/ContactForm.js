/* eslint-disable */

import React, { useReducer, useRef } from 'react';

const ContactForm = () => {
    const form = useRef();

    const initFields = [
        {
            name: 'firstName',
            label: 'Imię',
            required: true,
            pattern: '^[a-zA-Z –-]+$',
        },
        {
            name: 'email',
            label: 'Email',
            required: true,
            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$',
        },
        {
            name: 'phone',
            type: 'number',
            label: 'Numer Telefonu',
            required: false,
            pattern: '/^d{9}$',
        },
        {
            name: 'subject',
            label: 'Temat wiadomośći',
            required: true,
        },
        {
            name: 'textArea',
            label: 'Wiadomość',
            required: true,
        },
    ];

    const emptyFields = {
        firstName: '',
        email: '',
        phone: '',
        subject: '',
        textArea: '',
        errors: {
            firstName: '',
            email: '',
            phone: '',
            subject: '',
            textArea: '',
        },
    };

    const validateFields = (name, value) => {
        const errors = {};

        const field = initFields.find((field) => field.name === name);

        if (!field) {
            return errors;
        }

        const { label, required, pattern } = field;

        if (required && value.trim() === '') {
            errors[name] = `Pole ${label} jest wymagane.`;
        }
        if (pattern && value.trim() !== '') {
            const reg = new RegExp(pattern);
            if (!reg.test(value)) {
                errors[name] = `Dane w polu ${label} są niepoprawne.`;
            }
        }

        return errors;
    };

    const reducer = (state, { name, value, action = 'change' }) => {
        switch (action) {
            case 'change': {
                const newState = { ...state, [name]: value };
                newState.errors = validateFields(newState);
                // newState.errors = { ...newState.errors, [name]: validateFields(name, value) };
                return newState;
            }
            case 'reset': {
                return emptyFields;
            }
            default: {
                return state;
            }
        }
    };

    const [state, dispatch] = useReducer(reducer, emptyFields);
    const { firstName, email, errors, phone, subject, textArea } = state;

    const submit = (e) => {
        e.preventDefault();

    
        const updatedErrors = validateFields(state);

        if (Object.values(updatedErrors).every((error) => error === '')) {
      
            // emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
            //     (result) => {
            //         console.log(result.text);
            //         console.log('message sent');
            //     },
            //     (error) => {
            //         console.log(error.text);
            //     },
            // );
            // eslint-disable-next-line no-alert
         
            console.log(`formularz wysłany`);

            // dispatch({ action: 'reset' });
        } else {
        
            console.log('else');
            dispatch({ name: 'errors', value: updatedErrors });
        }
    };

    return (
        <form ref={form} noValidate onSubmit={submit}>
            {initFields.map((field) => (
                <div key={field.name}>
                    <label htmlFor={field.name}>
                        {field.label}:
                        {field.name === 'textArea' ? (
                            <textarea
                                type="text"
                                id={field.name}
                                name={field.name}
                                required={field.required}
                                value={state[field.name]}
                                onChange={(e) => dispatch(e.target)}
                            />
                        ) : (
                            <input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                required={field.required}
                                value={state[field.name]}
                                onChange={(e) => dispatch(e.target)}
                            />
                        )}
                    </label>
                    {errors[field.name] && <p style={{ color: 'red' }}>{errors[field.name]}</p>}
                </div>
            ))}
            <input type="submit" />
        </form>
    );
};

export default ContactForm;
