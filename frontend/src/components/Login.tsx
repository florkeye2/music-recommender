const Login: React.FC = () => {
    const handleLogin = async () => {
        window.location.href = "http://localhost:3001/login";
    };

    return <button onClick={handleLogin}>Login with Spotify</button>;
};

export default Login;