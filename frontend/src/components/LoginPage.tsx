import { useEffect, useState } from 'react';

function LoginPage() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code && !token) {
            fetch(`http://localhost:5173/callback?code=${code}`)
                .then(res => res.json())
                .then(data => {
                    setToken(data.access_token);
                    localStorage.setItem('spotify_token', data.access_token);
                })
                .catch(err => console.error(err));
        }
    }, []);

    const handleLogin = () => {
        window.location.href = 'http://localhost:5173/login';
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Login with Spotify</h1>
                {!token ? (
                    <button
                        onClick={handleLogin}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold"
                    >
                        Login with Spotify
                    </button>
                ) : (
                    <p className="text-center mt-4">Successfully logged in!</p>
                )}
            </div>
        </div>
    );
}

export default LoginPage;