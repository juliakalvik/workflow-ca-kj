import { useState } from 'react';
import { signUp } from "../../lib/my-api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";


/** *Sign up form - login page - @author Cnbergh*/
const Input = ({ type, placeholder, value, onChange }) => (
    <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={true}
        minLength={4}
        className="bg-neutral-100 border-2 border-orange-100 text-gray-900 leading-tight tracking-tight sm:text-sm rounded-3xl focus:ring-primary-600 focus:border-primary-600 block w-full min-w-[220px] sm:min-w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        aria-label={placeholder}
    />
);

const SignUpForm = ({ setShowLogin, setActiveForm }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const signUpMutation = useMutation(async ({ email, password }) => {
        const data = await signUp({ email, password });
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
            navigate({ to: "/", params: { id: data.id } });
        }, 2500);
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let emailValid = /\S+@\S+\.\S+/.test(email);
        let errorMessages = [];

        if (password === confirmPassword && emailValid) {
            signUpMutation.mutate({ email, password });
        } else {
            if (!emailValid) {
                errorMessages.push("Invalid email.");
            }
            if (password.length < 4) {
                errorMessages.push('Password must be at least 4 characters');
            }
            if (password !== confirmPassword) {
                errorMessages.push("Passwords do not match.");
            }

            setErrorMessage(errorMessages.join(' '));
        }
    };


    return (
        <div className="w-full bg-orange-200 rounded-3xl border-2 border-orange-100 mt-1 md:mt-2 sm:max-w-md xl:p-1 dark:bg-gray-800 dark:border-gray-700">
            <div className='p-6 space-y-4 sm:space-y-5 md:space-y-7 sm:p-8'>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Create an Account</h2>
                {errorMessage && <div className="text-red-600">{errorMessage}</div>}
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="/profile">
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required={true} autoComplete="email" />
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required={true} minLength={4} autoComplete="new-password" />
                    <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required={true} minLength={4} autoComplete="new-password" />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-3xl w-full my-2 border-2 border-blue-500 hover:border-blue-400 shadow-custom leading-tight tracking-tight" onClick={handleSubmit} disabled={!email || !password || !confirmPassword}>
                        Sign Up
                    </button>
                    <p className="text-xs sm:text-sm font-light text-gray-700 dark:text-gray-400 leading-tight tracking-tight">
                        Already have an account? <a href="#" onClick={() => { setShowLogin(true); setActiveForm('login'); }} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</a>
                    </p>
                </form>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="modal-content w-auto bg-blue-500 text-white px rounded-3xl border-2 border-blue-400 mt-1 md:mt-2 sm:max-w-md xl:p-3 p-4">
                        <h2 className="text-2xl font-bold leading-tight tracking-tight">Thank You!</h2>
                        <p className="mt-2 text-base leading-tight tracking-tight">Welcome and thank you for signing up!</p>
                    </div>
                </div>
            )}
        </div>
    );
}
export default SignUpForm;