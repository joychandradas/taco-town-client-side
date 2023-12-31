import React, { useContext } from 'react';
import { Button, Container, Image, Nav, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../../../Provider/AuthProvider';
import { toast } from 'react-toastify';
import logo from '../../../../public/chef-hat.png'

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout()
            .then(result => {
                const user = result.user;
                toast.success("Successfully logout")
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <Navbar collapseOnSelect expand="lg" className='navbar-color' variant="dark">
            <Container>
                <Link to="/"><Image src={logo} className='banner-logo ps-5' /></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto ps-3">
                        <NavLink className='nav-text-color mx-3 text-decoration-none fs-6' to="/">Home</NavLink>
                        <NavLink className='nav-text-color mx-4 text-decoration-none fs-6' to="/blog">Blog</NavLink>
                    </Nav>
                    {
                        user ?
                            <>

                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id="button-tooltip-2">{user?.displayName}</Tooltip>}
                                >
                                    {({ ref, ...triggerHandler }) => (
                                        <Button
                                            variant="dark"
                                            {...triggerHandler}
                                            className="d-inline-flex align-items-center"
                                        >
                                            <Image
                                                ref={ref}
                                                roundedCircle
                                                className='header-img'
                                                src={user.displayName ? user.photoURL : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                                            />
                                        </Button>
                                    )}
                                </OverlayTrigger>
                                <NavLink onClick={handleLogout} className='nav-text-color mx-4 text-decoration-none fs-6'>Logout</NavLink>
                            </> :
                            <>
                                <NavLink className='nav-text-color mx-4 text-decoration-none fs-6' to="/login">Login</NavLink>
                            </>
                    }
                    {!user &&
                        <NavLink className='nav-text-color mx-4 text-decoration-none fs-6' to="/register">Register</NavLink>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;