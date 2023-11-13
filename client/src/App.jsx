import { Routes, Route } from 'react-router-dom'

import { useState, useEffect } from 'react'

import axios from 'axios'

import Container from 'react-bootstrap/Container'

import Header from './components/Header'

import Landing from './pages/Landing'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/auth/authenticate')
      .then(res => {
        setUser(res.data.user)
        setLoading(false)
      })
  }, [])

  return (
    <>
      {loading ? (
        <h3 className='d=flex justify-content-center align-items-center vh-100'>Loading...</h3> // Can use font awesome here to make a loading icon
      ) : (
        <>
          <Header user={user} setUser={setUser}/>

          <Container>
            <Routes>
              <Route path='/' element={<Landing user={user} />}></Route>
              <Route path='/register' element={<Auth isLogin={false} setUser={setUser} />}></Route>
              <Route path='/login' element={<Auth isLogin={true} setUser={setUser} />}></Route>

              <Route path='*' element={<NotFound />}></Route>
            </Routes>
          </Container>
        </>
      )}
    </>
  )
}

export default App
