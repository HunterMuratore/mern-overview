import { useState } from 'react'

import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { NavLink } from 'react-router-dom'

const initialFormData = {
    email: '',
    password: ''
}

function Auth({ isLogin }) {
    const [formData, setFormData] = useState(initialFormData)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const user = await axios.post('/auth/register', formData)

            console.log(user)
        } catch (err) {
            console.log(err)
        }

        setFormData({...initialFormData})
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h2 className="text-center mt-5">{isLogin ? 'Log In' : 'Register'}</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleInputChange} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleInputChange} placeholder="Password" />
                </Form.Group>
                <div className='nav-control mb-3 d-flex'>
                    {isLogin ? (
                        <>
                            <span className='me-1'>Don't have an Account?</span><NavLink to="/register">Register</NavLink>
                        </>
                    ) : (
                        <>
                            <span className='me-1'>Already have an Account?</span><NavLink to="/login">Log In</NavLink>
                        </>)}
                </div>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default Auth