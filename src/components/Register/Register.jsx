import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPasssword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password, accepted);

        //reset error
        setRegisterError('');
        setSuccess('');

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password should have at least one uppercase character.');
            return;
        }
        else if(!accepted){
            setRegisterError('Please accept our terms and condition.');
            return;
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User created successfully.');

                // update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(() =>{
                    console.log('Profile Updated');
                })
                .catch((error) =>{
                    console.log(error.message);
                })

                // send verification email
                sendEmailVerification(result.user)
                .then(() =>{
                    alert('Please check your email and verify your account.');

                })
            })
            .catch(error => {
                console.log(error);
                setRegisterError(error.message)
            })
    }

    return (
        <div className="">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-4xl my-4">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input className="mb-2 border-2 py-2 px-4 rounded-lg w-1/2" type="text" name="name" placeholder="Your Name" id="" required />
                    <br />
                    <input className="mb-2 border-2 py-2 px-4 rounded-lg w-1/2" type="email" name="email" placeholder="Email Address" id="" required />
                    <br />
                    <div className="relative w-1/2">
                        <input
                            className="mb-2 border-2 py-2 px-4 rounded-lg w-full"
                            type={showPasssword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            id="" required />
                        <span className="absolute top-3 right-4" onClick={() => setShowPassword(!showPasssword)}>
                            {
                                showPasssword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </span>
                    </div>
                    <br />
                    <div className="mb-2">
                        <input type="checkbox" name="terms" id="" />
                        <label className="ml-3" htmlFor="terms">Accept our <a href="">terms and condition</a>.</label>
                    </div>

                    <br />
                    <input className="btn btn-primary mb-4 w-1/2" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className="text-red-600 text-xl">
                        {registerError}
                    </p>
                }
                {
                    success && <p className="text-green-500 text-xl">
                        {success}
                    </p>
                }
                <p>
                    Already have an account? <Link className="text-violet-600 font-semibold" to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;