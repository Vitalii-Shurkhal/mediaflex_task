import React, { useCallback, useEffect, useState } from 'react';
import style from './ContactUs.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';


const ContactUs = () => {

    const intialValues = {
        firstName: '',
        lastName: '',
        company: '',
        country: '',
        email: '',
        phoneNumber: '',
        tumblrUrl: '',
        websiteUrl: '',
        budget: '',
        assistance: {
            'Sponsored days': false,
            'Creative Guidance': false,
            'Sponsored Posts': false,
            'App Istalls': false,
            'Sponsored Video Posts': false,
            'Something Else': false
        }
    }
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const handlerChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handlerChecekedChange = (event) => {
        const { name, checked } = event.target;
        const { assistance } = formValues;
        const addedAssistance = assistance[name] = checked;
        setFormValues({ ...formValues, [assistance]: addedAssistance });
    }


    const handlerSubmit = (event) => {
        event.preventDefault();
        setFormErrors(validateData(formValues));
        setIsSubmit(true);
    }

    const removeEmptyValues = useCallback((obj) => {

        for (let key in obj) {
            if (!obj[key] || obj[key].length === 0) {
                delete obj[key];
            } else if (typeof obj === 'object') {
                removeEmptyValues(obj[key])
            }
        }
        return obj
    }, [])

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const dataSummary = removeEmptyValues(formValues);
            sendPostRequest(dataSummary);
            setFormValues(intialValues);
        }

    }, [formErrors, isSubmit])

    async function sendPostRequest(obj) {
        const sentData = JSON.stringify(obj);
        const response = await fetch('https://test-task-81474-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
            method: 'POST',
            body: sentData,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data)
    }

    const validateData = (values) => {
        const errors = {}
        const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

        if (!values.firstName.trim()) {
            errors.firstName = 'First Name is required'
        }
        if (!values.lastName.trim()) {
            errors.lastName = 'Last Name is required'
        }
        if (!values.company.trim()) {
            errors.company = 'Company Name is required'
        }
        if (!values.country.trim()) {
            errors.country = 'Country Name is required'
        }
        if (!values.email.trim()) {
            errors.email = 'Email is required'
        } else if (!regex.test(values.email)) {
            errors.email = 'Email is not valid'
        }


        return errors;
    }

    return (

        <Container>
            <div className={style.header} >
                <h2>Contact Us</h2>
                <p>Want to advertise on Tumbl? Great, you're in the right place. We just need to know a little more about you.</p>
            </div>
            <Form onSubmit={handlerSubmit}>
                <Row>
                    <Col sm={4}>
                        <Form.Group className='mb-3' controlId='FirstNameInput' >
                            <Form.Label>*First Name:</Form.Label>
                            <Form.Control type='text' name='firstName' value={formValues.firstName} onChange={handlerChange} />
                            <p style={{ color: 'red' }}>{formErrors.firstName}</p>
                        </Form.Group>
                    </Col>
                    <Col sm={4}>
                        <Form.Group className='mb-3' controlId='LastNameInput'>
                            <Form.Label>*Last Name:</Form.Label>
                            <Form.Control type='text' name='lastName' value={formValues.lastName} onChange={handlerChange} />
                            <p style={{ color: 'red' }}>{formErrors.lastName}</p>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Form.Group className='mb-3' controlId='CompanyInput' >
                            <Form.Label>*Company:</Form.Label>
                            <Form.Control type='text' name='company' value={formValues.company} onChange={handlerChange} />
                            <p style={{ color: 'red' }}>{formErrors.company}</p>
                        </Form.Group>
                    </Col>
                    <Col sm={4}>
                        <Form.Group className='mb-3' controlId='CountryInput'>
                            <Form.Label>*Country:</Form.Label>
                            <Form.Select name='country' value={formValues.country} onChange={handlerChange} >
                                <option>Select...</option>
                                <option value="Poland">Poland</option>
                                <option value="Germany">Germany</option>
                                <option value="France">France</option>
                            </Form.Select>
                            <p style={{ color: 'red' }}>{formErrors.country}</p>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Form.Group className='mb-3' controlId='EmailInput' >
                            <Form.Label>*Email:</Form.Label>
                            <Form.Control type='email' name='email' value={formValues.email} onChange={handlerChange} placeholder='example@gmail.com' />
                            <p style={{ color: 'red' }}>{formErrors.email}</p>
                        </Form.Group>
                    </Col>
                    <Col sm={4}>
                        <Form.Group className='mb-3' controlId='PhoneNumberInput'>
                            <Form.Label>Phone Number:</Form.Label>
                            <Form.Control type='number' name='phoneNumber' value={formValues.phoneNumber} onChange={handlerChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Form.Group className='mb-3' controlId='TumblrUrlInput' >
                            <Form.Label>Tumblr URL:</Form.Label>
                            <Form.Control type='text' name='tumblrUrl' value={formValues.tumblrUrl} onChange={handlerChange} />
                        </Form.Group>
                    </Col>
                    <Col sm={4}>
                        <Form.Group className='mb-3' controlId='WebSiteInput'>
                            <Form.Label>Website URL:</Form.Label>
                            <Form.Control type='text' name='websiteUrl' value={formValues.websiteUrl} onChange={handlerChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Form.Group className='mb-3' controlId='TumblrUrlInput' >
                            <Form.Label>What is Your Monthly Advertising Budget?</Form.Label>
                            <Form.Select name='budget' value={formValues.budget} onChange={handlerChange} >
                                <option>Select...</option>
                                <option value="100">$100</option>
                                <option value="200">$200</option>
                                <option value="300">$300</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <Form.Group className='mb-3' controlId='CheckBox' >
                            <Form.Label>What can we help you with?</Form.Label>
                            <Row className='mb-3'>
                                <Col>
                                    <Form.Check id='1' inline type="checkbox" label="Sponsored Days" name="Sponsored days" onChange={handlerChecekedChange} />
                                </Col>
                                <Col>
                                    <Form.Check id='2' inline type="checkbox" label="Creative Guidance" name="Creative Guidance" onChange={handlerChecekedChange} />
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>
                                    <Form.Check id='3' inline type="checkbox" label="Sponsored Posts" name="Sponsored Posts" onChange={handlerChecekedChange} />
                                </Col>
                                <Col>
                                    <Form.Check id='4' inline type="checkbox" label="App Istalls" name="App Istalls" onChange={handlerChecekedChange} />
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>
                                    <Form.Check id='5' inline type="checkbox" label="Sponsored Video Posts" name="Sponsored Video Posts" onChange={handlerChecekedChange} />
                                </Col>
                                <Col>
                                    <Form.Check id='6' inline type="checkbox" label="Something Else" name="Something Else" onChange={handlerChecekedChange} />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant='success' type='submit'>Submit</Button>
            </Form>
        </Container>


    )
}

export default ContactUs;


