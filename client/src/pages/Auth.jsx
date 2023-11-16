import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { useStore } from '../store'

import { useMutation, gql } from '@apollo/client'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const initialFormData = {
    email: '',
    password: ''
}

const REGISTER_USER = gql`
    mutation RegisterUser($email: String!, $password: String!) {
        register(email: $email, password: $password) {
            _id
            email
            hobbies {
                _id
                name
            }
        }
    }
`

const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            _id
            email
            hobbies {
                _id
                name
            }
        }
    }
`

function Auth({ isLogin }) {
    const { setState } = useStore()
    const [formData, setFormData] = useState(initialFormData)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const [authenticateUser] = useMutation(isLogin ? LOGIN_USER : REGISTER_USER, {
        variables: formData
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const resolverName = isLogin ? 'login' : 'register'

            const { data: userData } = await authenticateUser()

            setFormData({ ...initialFormData })

            setState(oldState => ({
                ...oldState,
                user: userData[resolverName]
            }))
            setErrorMessage('')

            navigate('/')
        } catch (err) {
            setErrorMessage(err.message)
        }
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

                {errorMessage ? <p className='text-center text-danger-emphasis mt-2'>{errorMessage}</p> : ''}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password" />
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