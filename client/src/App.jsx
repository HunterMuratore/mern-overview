import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'

import axios from 'axios'

import Container from 'react-bootstrap/Container'

import Header from './components/Header'

import Landing from './pages/Landing'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'

import { useStore } from './store'

const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      email
  }
}
`

function App() {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const { setState } = useStore()
  // const [loading, setLoading] = useState(true)

  if (error) {
    console.log(error)
  }

  console.log(data)

  // useEffect(() => {
  //   axios.get('/auth/authenticate')
  //     .then(res => {
  //       setState((oldState) => {
  //         return {
  //           ...oldState,
  //           user: res.data.user
  //         }
  //       })
  //       setLoading(false)
  //     })
  // }, [])

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
