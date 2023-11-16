import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'

import Container from 'react-bootstrap/Container'

import Header from './components/Header'

import Landing from './pages/Landing'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'

import { useStore } from './store'

const AUTHENTICATE = gql`
  query {
    authenticate {
      _id
      email
      hobbies {
        _id
        name
      }
    }
  }
`

function App() {
  const { loading, error, data: userData } = useQuery(AUTHENTICATE);
  const { setState } = useStore()

  useEffect(() => {
    if (userData) {
      setState(oldState => ({
        ...oldState,
        user: userData.authenticate
      }))
    }
  }, [userData])

  return (
    <>
      {loading ? (
        <h3 className='d=flex justify-content-center align-items-center vh-100'>Loading...</h3> // Can use font awesome here to make a loading icon
      ) : (
        <>
          <Header />

          <Container>
            <Routes>
              <Route path='/' element={<Landing />}></Route>
              <Route path='/register' element={<Auth isLogin={false} />}></Route>
              <Route path='/login' element={<Auth isLogin={true} />}></Route>

              <Route path='*' element={<NotFound />}></Route>
            </Routes>
          </Container>
        </>
      )}
    </>
  )
}

export default App
