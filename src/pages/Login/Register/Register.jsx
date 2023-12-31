import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleSignIn from '../GoogleSignIn/GoogleSignIn';
import { AuthContext } from '../../../Provider/AuthProvider';
import { toast } from 'react-toastify';

const Register = () => {
    const { user, registerUser, updateUserProfile } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleRegistration = (e) => {
        e.preventDefault()
        if (!/(?=.*?[A-Z])/.test(password)) {
            setError("At least one upper case")
            return;
        }
        if (email, password, name, photoURL) {
            registerUser(email, password, name, photoURL)
                .then(result => {
                    const user = result.user;
                    toast.success("Registered")
                    setSuccess("You are registered")
                    navigate(from, { replace: true })
                    updateUserProfile(name, photoURL).then(() => {
                    })
                        .catch(error => { toast.error(error.message); });
                }).catch(error => {
                    setError(error.message)
                    toast.error("Error")
                })
        }
    }




    return (
        <Container className='w-25 mt-5 mx-auto'>
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
                    <Form.Control onChange={(e) => setPassword(e.target.value)} type={show ? "text" : "password"} name='password' placeholder="Password" required />
                </Form.Group>
                <p onClick={() => setShow(!show)}><small>
                    {
                        show ? "Hide Password" : "Show Password"
                    }
                </small></p>

                <Button onClick={handleRegistration} variant="primary" type="submit" className='w-100'>
                    Register
                </Button> <br />
                <Form.Text className="text-secondary">
                    <span className='mx-5'>Already Have An Account ? <Link to='/login'>Login</Link></span>
                </Form.Text> <br />
                <Form.Text className="text-success">
                    {success}
                </Form.Text>
                <Form.Text className="text-danger">
                    {error}
                </Form.Text>
            </Form>
            <GoogleSignIn></GoogleSignIn>
        </Container>
    );
};

export default Register;