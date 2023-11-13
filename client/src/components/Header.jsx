import axios from 'axios'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import { useMediaQuery } from 'react-responsive';

import { NavLink, useNavigate } from 'react-router-dom'

function Header({ user, setUser }) {
    const navigate = useNavigate()
    const isMobile = useMediaQuery({ query: '(max-width: 990px)' })

    const logout = async (e) => {
        e.preventDefault()

        await axios.get('/auth/logout')

        setUser(null)

        navigate('/')
    }

    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">Auth App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavLink to="/">Home</NavLink>
                            {user ? (
                                <>
                                    <p>{user.email}</p>
                                    <a href="/" onClick={logout}>Log Out</a>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/register">Register</NavLink>
                                    {isMobile ? '' : <span>or</span>}
                                    <NavLink to="/login">Log In</NavLink>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header