import Hero from './Hero'

const landingStyles = {
    background: 'black',
    padding: '5px'
}

function Landing() {

    return (
        <>
            <div style={landingStyles} className="text-center mt-5">
                <Hero />
            </div>
        </>
    )
}

export default Landing