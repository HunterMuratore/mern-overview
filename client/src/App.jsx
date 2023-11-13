import { Routes, Route } from 'react-router-dom'

import { useState } from 'react'

import Container from 'react-bootstrap/Container'

import Header from './components/Header'

import Landing from './pages/Landing'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'

function App() {
  const [user, setUser] = useState(null)

  return (
    <>
      <Header user={user}/>

      <Container>
        <Routes>
          <Route path='/' element={<Landing user={user}/>}></Route>
          <Route path='/register' element={<Auth isLogin={false} setUser={setUser} />}></Route>
          <Route path='/login' element={<Auth isLogin={true} setUser={setUser} />}></Route>

          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </Container>
    </>
  )
}

export default App
