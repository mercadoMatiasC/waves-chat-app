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
        <div className="flex flex-col w-full bg-[#141414] justify-center min-h-[calc(100vh-64px)] lg:h-full lg:w-auto">
            <form onSubmit={handleSubmit} className="p-5 space-y-6">
                <h1 className="text-xl font-light">Welcome back!</h1>

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