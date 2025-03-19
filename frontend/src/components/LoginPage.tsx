function LoginPage() {

    const handleLogin = () => {
        window.location.href = 'http://localhost:3001/login';
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
            <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Login with Spotify</h1>
                {!localStorage.getItem("spotify_access_token") ? (
                    <button
                        onClick={handleLogin}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold"
                    >
                        Login with Spotify
                    </button>
                ) : (
                    <a className="text-center mt-4 text-blue-500" href="/dashboard">Successfully logged in!</a>
                )}
            </div>
        </div>
    );
}

export default LoginPage;