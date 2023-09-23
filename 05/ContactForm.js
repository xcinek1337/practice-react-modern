/* eslint-disable no-console */
import React, { useReducer } from 'react';

const ContactForm = () => {
    const init = {
        firstName: '',
        surName: '',
        email: '',
        phone: '',
        subject: '',
        textArea: '',
        errors: {
            firstName: '',
            surName: '',
            email: '',
            subject: '',
            textArea: '',
        },
    };
    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };
    const validateFields = (values) => {
        const errors = {};

        if (values.firstName.trim() === '') {
            errors.firstName = 'Pole Imię nie może być puste';
        }

        if (values.surName.trim() === '') {
            errors.surName = 'Pole Nazwisko nie może być puste';
        }

        if (!isValidEmail(values.email)) {
            errors.email = 'Niepoprawny format adresu e-mail';
        }
        if (values.subject.trim() === '') {
            errors.subject = 'Temat wiadomosci jest obowiazkowy';
        }
        if (values.textArea.trim() === '') {
            errors.textArea = 'wiadomosc nie moze być pusta';
        }

        return errors;
    };

    const reducer = (state, { name, value }) => {
        // tutaj tworze obiekt kopiujac stary state i dodaje aktualizuje pola o nowe value(jesli sie zmienia, a  wiemy ze sie zmienai bo funkcja sie wykonuje XD)
        const newState = { ...state, [name]: value };
        // tutaj waliduje pola wg potrzeb w validateFields i jednoczesnie dodaje nowy klucz errors ktory moze przechowywac bledy walidacji
        newState.errors = validateFields(newState);
        // zwracam newState, ktory bedzie state dla useReducera v
        return newState;
    };

    const [state, dispatch] = useReducer(reducer, init);
    const { firstName, surName, email, errors, phone, subject, textArea } = state;

    const submit = (e) => {
        e.preventDefault();

        // Wywołaj funkcję walidacji pól
        const updatedErrors = validateFields(state);
        dispatch({ name: 'errors', value: updatedErrors });

        console.log(updatedErrors);

        if (Object.values(updatedErrors).every((error) => error === '')) {
            // eslint-disable-next-line no-alert
            window.alert('brawo');
        }
    };
    return (
        <form noValidate onSubmit={submit}>
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
                <label htmlFor="surName">
                    Nazwisko:
                    <input
                        type="text"
                        id="surName"
                        name="surName"
                        required
                        value={surName}
                        onChange={(e) => dispatch(e.target)}
                    />
                </label>
                {errors.surName && <p style={{ color: 'red' }}>{errors.surName}</p>}
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
                        required
                        value={phone}
                        onChange={(e) => dispatch(e.target)}
                    />
                </label>
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
