import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleSignIn from '../GoogleSignIn/GoogleSignIn';
import { AuthContext } from '../../../Provider/AuthProvider';
import { toast } from 'react-toastify';

const Login = () => {
    const { user, loginUser } = useContext(AuthContext)
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const from = location.state?.from?.pathname || '/';

    const handleLogin = (e) => {
        e.preventDefault()
        if (email, password) {
            loginUser(email, password)
                .then(result => {
                    const user = result.user;
                    toast.success("Logged in")
                    setSuccess("You are Login")
                    navigate(from, { replace: true })
                }).catch(error => {
                    setError(error.message)
                    toast.error("User Not Found")
                })
        }
    }

    return (
        <Container className='w-25 mt-5 mx-auto'>
            <h3>Please login</h3>
            <Form>
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

                <Button onClick={handleLogin} variant="primary" type="submit" className='w-100 '>
                    Login
                </Button> <br />
                <Form.Text className="text-secondary">
                    <span className='mx-5'>Dont’t Have An Account ? <Link to='/register'>Register</Link></span>
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

export default Login;