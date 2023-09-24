/* eslint-disable no-console */
import React, { useReducer, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import emailjs from '@emailjs/browser';
import { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } from './account';

const ContactForm = () => {
    const form = useRef();

    const init = {
        firstName: '',
        email: '',
        phone: '',
        subject: '',
        textArea: '',
        errors: {
            firstName: '',
            email: '',
            subject: '',
            textArea: '',
        },
    };
    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };
    // eslint-disable-next-line no-unused-vars
    const isValidPhone = (phone) => {
        const phoneRegex = /^\d{9}$/;
        return phoneRegex.test(phone);
    };

    const validateFields = (values) => {
        const errors = {};

        if (values.firstName.trim() === '') {
            errors.firstName = 'Pole Imię nie może być puste';
        }

        if (!isValidEmail(values.email)) {
            errors.email = 'Niepoprawny format adresu e-mail';
        }
        if (values.subject.trim() === '') {
            errors.subject = 'Temat wiadomosci jest obowiazkowy';
        }
        if (!isValidPhone(values.phone) && values.phone.length > 0) {
            errors.phone = 'Nieprawidłowa długość znaków';
        }
        if (values.textArea.trim() === '') {
            errors.textArea = 'wiadomosc nie moze być pusta';
        }

        return errors;
    };

    const reducer = (state, { name, value }) => {
        // tutaj tworze obiekt kopiujac stary state i dodaje aktualizuje pola o nowe value(jesli sie zmienia, a  wiemy ze sie zmienai bo onChange wywolalo wlasnie te  funkcje)
        const newState = { ...state, [name]: value };
        // tutaj waliduje pola wg potrzeb w validateFields i jednoczesnie dodaje nowy klucz errors do state ktory moze przechowywac bledy walidacji
        newState.errors = validateFields(newState);
        // zwracam newState, ktory bedzie state'm dla useReducera v
        return newState;
    };

    const [state, dispatch] = useReducer(reducer, init);
    const { firstName, email, errors, phone, subject, textArea } = state;

    const submit = (e) => {
        e.preventDefault();

        const updatedErrors = validateFields(state);
        dispatch({ name: 'errors', value: updatedErrors });

        // jak zobaczyc stan state po kliknieciu pierwszego submita, bo jak klikne drugi raz to juz bede mial ten pierwszy zaktualizowany stan, ale ja chce w momencie pierwszego kliklniecia
        // wiem ze juz raz o to pytalem ale nie pamietam, wiem ze to sie wywolywalo przez funkcje
        // setTimeout(() => console.log(state), 100);

        if (Object.values(updatedErrors).every((error) => error === '')) {
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
                (result) => {
                    console.log(result.text);
                    console.log('message sent');
                },
                (error) => {
                    console.log(error.text);
                },
            );
            // eslint-disable-next-line no-alert
            window.alert('thanks for message');

            // powinno sie czyscic jednym dispatchem ktory przyjmuje obiekt z pustymi wartosciami.. ale sie nie czysci
            // dispatch(init);

            dispatch({ name: 'firstName', value: '' });
            dispatch({ name: 'email', value: '' });
            dispatch({ name: 'phone', value: '' });
            dispatch({ name: 'subject', value: '' });
            dispatch({ name: 'textArea', value: '' });
        }
    };

    return (
        <form ref={form} noValidate onSubmit={submit}>
            <div>
                <label htmlFor="firstName">
                    Imię:
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={firstName}
                        onChange={(e) => dispatch(e.target)}
                    />
                </label>

                {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
            </div>

            <div>
                <label htmlFor="email">
                    email:
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => dispatch(e.target)}
                    />
                </label>
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="phone">
                    telefon:
                    <input
                        type="number"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => dispatch(e.target)}
                    />
                </label>
                {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
            </div>
            <div>
                <label htmlFor="subject">
                    temat wiadomosci:
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={subject}
                        onChange={(e) => dispatch(e.target)}
                    />
                </label>
                {errors.subject && <p style={{ color: 'red' }}>{errors.subject}</p>}
            </div>
            <div>
                <label htmlFor="textArea">
                    <textarea
                        value={textArea}
                        onChange={(e) => dispatch(e.target)}
                        name="textArea"
                        id="textArea"
                        cols="30"
                        rows="10"
                    />
                </label>
                {errors.textArea && <p style={{ color: 'red' }}>{errors.textArea}</p>}
            </div>

            <input type="submit" />
        </form>
    );
};

export default ContactForm;
