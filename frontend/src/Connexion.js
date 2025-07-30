import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Connexion() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
        const res = await axios.post("http://localhost:8081/login", {
            username,
            password
        });

        if (res.data.user) {
            navigate("/"); // rediriger après connexion
        }
        } catch (err) {
        alert("Erreur de connexion");
        }
    };

    return (
        <div>
        <h2>Connexion</h2>
        <input placeholder="Nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Se connecter</button>
        </div>
    );
}

export default Connexion