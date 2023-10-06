import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPasssword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

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

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User created successfully.')
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
                    <input className="mb-4 border-2 py-2 px-4 rounded-lg w-1/2" type="email" name="email" placeholder="Email Address" id="" required />
                    <br />
                    <input
                        className="mb-4 border-2 py-2 px-4 rounded-lg w-1/2"
                        type={ showPasssword? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        id="" required />
                    <span onClick={() => setShowPassword(!showPasssword)}>
                        {
                            showPasssword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }
                    </span>
                    <br />
                    <input className="btn btn-accent mb-4 w-1/2" type="submit" value="Register" />
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
            </div>
        </div>
    );
};

export default Register;