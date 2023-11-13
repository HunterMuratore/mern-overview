function Landing({ user }) {
    return (
        <>
            <div className="text-center mt-5">
                <h1>{user ? `Welcome back ${user.email}` : 'Welcome to my Auth App'}</h1>
                <p>A place where you know it's Authentic</p>
            </div>
        </>
    )
}

export default Landing