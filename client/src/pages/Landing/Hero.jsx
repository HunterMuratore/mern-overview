const heroStyles = {
    color: 'white',
    
}

import { useStore } from '../../store'

function Hero() {
    const { user } = useStore() 

    return (
        <div style={heroStyles}>
            <h1>{user ? `Welcome back, ${user.email}` : 'Welcome to my Auth App'}</h1>
            <p>A place where you know it's Authentic</p>
        </div>
    )
}

export default Hero