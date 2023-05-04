import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GoogleSignIn from '../GoogleSignIn/GoogleSignIn';
import { AuthContext } from '../../../Provider/AuthProvider';
import { toast } from 'react-toastify';

const Register = () => {
    const { registerUser } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

const handleRegistration = (e) => {
    e.preventDefault()
    if(!/"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/.test(password)){
        setError("Minimum eight characters, at least one letter and one number")
        return;
    }
    if(name, email, password){
        registerUser(name, email, password)
        .then(result => {
            const user = result.user;
            toast("Logged in")
        }).catch(error => {
            setError(error.message)
            toast("Error")
        })
    }
}

    return (
        <Container className='w-50 mt-5'>
            <Row>
                <Col sm={8}>
                    <h3>Please Register</h3>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={(e) => setName(e.target.value)} type="text" name='name' placeholder="Your name" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Photo URL</Form.Label>
                            <Form.Control onChange={(e) => setPhotoURL(e.target.value)} type="text" name='photo' placeholder="Photo URL" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" name='email' placeholder="Enter email" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" name='password' placeholder="Password" required />
                        </Form.Group>


                        <Button onClick={handleRegistration} variant="primary" type="submit" className='w-25'>
                            Register
                        </Button> <br />
                        <Form.Text className="text-secondary">
                            Already Have An Account ? <Link to='/login'>Login</Link>
                        </Form.Text> <br />
                        <Form.Text className="text-danger">
                            {error}
                        </Form.Text>
                    </Form>
                </Col>
                <Col sm={4}>
                    <GoogleSignIn></GoogleSignIn>
                </Col>
            </Row>

        </Container>
    );
};

export default Register;