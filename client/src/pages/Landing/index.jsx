import Hero from './Hero'

const landingStyles = {
    background: 'black',
    padding: '5px'
}

function Landing({ user }) {
    return (
        <>
            <div style={landingStyles} className="text-center mt-5">
                <Hero user={user}></Hero>
            </div>
        </>
    )
}

export default Landing