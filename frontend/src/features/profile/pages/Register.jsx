import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { Link } from "react-router-dom";

export function Register(){
    const { mutate, error, isPending } = useRegister();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password_confirmation: "",
        username: "",
        description: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData(prev => {
            let updates = { [name]: value };

            return { 
                ...prev, 
                ...updates 
            };
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        mutate({ data: formData });
    }

    return (
        <div className="flex flex-col w-full bg-[#141414] justify-center min-h-[calc(100vh-64px)] lg:h-full lg:w-auto">
            <form onSubmit={handleSubmit} className="p-5 space-y-5">
                <h1 className="text-xl my-5">Welcome to <span className="text-emerald-300">Waves</span>!</h1>

                <div id="credentials" className="space-y-6">
                    <label htmlFor="register-email">Email</label>
                    <input id="register-email" type="email" name="email" onChange={handleChange} className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" />

                    <label htmlFor="register-password">Password</label>
                    <input id="register-password" type="password" name="password" onChange={handleChange} className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" />

                    <label htmlFor="register-confirm-password">Confirm password</label>
                    <input id="register-confirm-password" type="password" name="password_confirmation" onChange={handleChange} className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" />
                </div>
                
                <div id="credentials" className="space-y-6">
                    <h2 className="text-lg font-light my-5">About <span className="text-emerald-300">yourself</span>!</h2>
                    <label htmlFor="register-username">Username</label>
                    <input id="register-username" type="text" name="username" onChange={handleChange} className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" />

                    <label htmlFor="register-description">Description</label>
                    <input id="register-description" type="text" name="description" onChange={handleChange} className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" />
                </div>

                {/* -- ERRORS -- */}
                {error && (
                    <div className="bg-red-500/20 text-red-500 p-3 rounded-lg mb-4 text-sm border border-red-500/50">
                        {error.errors 
                            ? Object.values(error.errors).flat()[0] 
                            : error.message}
                    </div>
                )}

                <div className="flex justify-between">
                    <Link to="/Login" className="font-light hover:text-white/75">
                        <p>Already have an account? Log in here</p>
                    </Link>

                    <button type="submit" className="bg-sky-700 px-3 py-2 rounded-2xl hover:cursor-pointer">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}