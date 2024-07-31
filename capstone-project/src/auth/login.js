import axios from "axios";
import { useState } from "react";
import './loginn.css'
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const [param] = useSearchParams();
    const [msg, setMsg] = useState(param.get('msg') || '');

    const onLogin = () => {
        const token = window.btoa(`${username}:${password}`);
        axios.get('http://localhost:8081/capstone/login', {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
        .then(response => {
            const user = {
                token,
                username,
                role: response.data.role
            };
            
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('role', user.role);
            
            switch (user.role) {
                case 'HR':
                    navigate('/hr');
                    break;
                case 'MANAGER':
                    navigate('/manager');
                    break;
                default:
                    navigate('/employee');
                    break;
            }
        })
        .catch(() => {
            setErrorMsg('Invalid Credentials');
        });
    };

    return (
        <section className="login-section vh-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 d-flex justify-content-center align-items-center text-black">
                        <div className="login-form-container">
                            <h3 className="login-title">Login Page</h3>
                            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                            {msg && <div className="alert alert-dark">You have logged Out</div>}
                            
                            <div className="form-group">
                                <label htmlFor="username">Enter username</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="text"
                                    id="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary btn-lg btn-block" onClick={onLogin}>
                                Login
                            </button>
                        </div>
                    </div>
                    <div className="col-sm-6 d-none d-sm-block">
                        < div class="centered" style={{color:"white"}}><h1 style={{'text-align':"center"}}>WELCOME <br/>TO <br/>INCEDO</h1></div>
                        <img
                            src="https://plus.unsplash.com/premium_photo-1678903964473-1271ecfb0288?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Login"
                            className="login-image"
                            
                        />
                        
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
