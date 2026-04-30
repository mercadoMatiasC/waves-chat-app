import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import { MutationMessages } from "../../../components/MutationMessages";

export function Login(){
    const loginMutation = useLogin();
    const year = new Date().getFullYear();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
        loginMutation.mutate({data: formData});
    }

    return (
        <div className="flex flex-col h-screen w-full bg-[#141414] lg:w-auto justify-between pb-5">
            <div id="colorful_divider" />

            <form onSubmit={handleSubmit} className="p-7 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-light">Welcome back!</h1>
                    <span className="flex items-center">
                        <img src="/brand/mini-logo.webp" width={64} alt="waves-logo" />
                        <h1 id="waves-sign" className="text-xl text-end">Waves</h1>
                    </span>
                </div>

                <label htmlFor="login-email">Email</label>
                <input id="login-email" type="email" name="email" onChange={handleChange} className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" />

                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" name="password" onChange={handleChange} className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" />
        
                <div className="flex justify-between">
                    <Link to="/Register" className="font-light hover:text-white/75">
                        <p>New to Waves? Register here</p>
                    </Link>

                    <button type="submit" className="main-button border-2 border-green-600">
                        Login
                    </button>
                </div>
                {/* -- MUTATION MESSAGES -- */}
                <MutationMessages mutation={loginMutation} />
            </form>

            <footer className="flex justify-center items-center text-center">
                <p className="text-sm font-light">
                    Copyright ©{year} waves.com | All rights reserved by matiasMercado
                </p>
            </footer>
        </div>
    );
}