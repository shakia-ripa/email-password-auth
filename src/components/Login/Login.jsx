import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";



const Login = () => {

    const [loginError, setLoginError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setLoginError('');
        setSuccess('');

        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                if(result.user.emailVerified){
                    setSuccess('Login successfull.');
                }
                else {
                    alert('Please verify your email address')
                }
            })
            .catch((error) => {
                console.log(error.message);
                setLoginError('Invalid Password');
            })
    };

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if(!email){
            console.log('Please provide an email', emailRef.current.value);
            return;
        }
        else if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)){
            console.log('Please write a valid email');
            return;
        }

        //send validation email
        sendPasswordResetEmail(auth, email)
        .then(() =>{
            alert('Please check your email');
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    return (

        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                name="email"
                                ref={emailRef}
                                className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password"
                                name="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        {
                            loginError && <p className="text-xl text-red-500">{loginError}</p>
                        }
                        {
                            success && <p className="text-xl text-green-500 ">{success}</p>
                        }
                        <p className="text-lg">New to this website? Please <Link className="text-violet-600 font-semibold" to="/register">Register</Link></p>
                    </form>

                </div>
            </div>

        </div>
    );
};

export default Login;