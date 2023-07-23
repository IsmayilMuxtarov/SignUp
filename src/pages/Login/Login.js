import React from 'react'
import './Login.css';
import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';

export const Login = () => {

    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .test('username', 'Incorrect Full name, Name and Surname must be at least 3 characters long', (value) => {
                const words = value.trim().split(' ');
                return words.length >= 2 && words.every((word) => word.length >= 3);
            })
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .required('No password provided.')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Required"),
    });


    return (
        <div className='loginContainer'>
            <div className='formContainer'>
                <h2 className='loginTitle'>Sign up</h2>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        alert(values);
                    }}
                >
                    {({errors, touched}) => (
                        <Form className='form'>
                            <Field className='input' name="username"/>
                            {touched.username && errors.username &&
                            <div className='errorContainer'>{errors.username}</div>}

                            <Field className='input' name="email"/>
                            {touched.email && errors.email && <div className='errorContainer'>{errors.email}</div>}

                            <Field className='input' name="password"/>
                            {touched.password && errors.password &&
                            <div className='errorContainer'>{errors.password}</div>}

                            <Field className='input' name="confirmPassword"/>
                            {touched.confirmPassword && errors.confirmPassword &&
                            <div className='errorContainer'>{errors.confirmPassword}</div>}

                            <button className='submitButton' type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
                <p className='signInText'>Have an account? Sign in</p>
            </div>
        </div>
    )
}
