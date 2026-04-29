import { useEffect, useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { Link } from "react-router-dom";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { MutationMessages } from "../../../components/MutationMessages";

export function ProfileForm({ user = null }){
    const updateUserMutation = useUpdateUser();
    const registerUserMutation = useRegister();

    const is_edit = !!user;
    const mutation = is_edit ? updateUserMutation : registerUserMutation; 

    const [formData, setFormData] = useState({
        email: user?.email || "",
        password: "",
        password_confirmation: "",
        username: user?.username ||  "",
        description: user?.description || ""
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

        //REMOVE EMPTY FIELDS
        const filteredData = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== "")
        );

        if (is_edit)
            mutation.mutate({ id: user.id, data: filteredData });
        else
            mutation.mutate({ data: filteredData });
    }

    useEffect(() => {
        if (user)
            setFormData({
                email: user.email,
                password: "",
                password_confirmation: "",
                username: user.username,
                description: user.description
            });
    }, [user]);

    return (
        <div className={`flex flex-col w-full justify-center ${is_edit ? '' : 'min-h-[calc(100vh-64px)]'} lg:w-auto`}>
            <form onSubmit={handleSubmit} className="p-5 space-y-5">
                <h1 className="text-xl my-5 font-light">
                    {is_edit ? (
                        <p>Update your information</p>
                    ) : (
                        <p>Welcome to <span id="waves-sign">Waves</span>!</p>
                    )}
                </h1>

                <div id="credentials" className="space-y-6">
                    <label htmlFor="register-email">Email</label>
                    <input id="register-email" type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" />

                    <label htmlFor="register-password">Password</label>
                    <input id="register-password" type="password" name="password" value={formData.password} onChange={handleChange} className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" />


                    {formData.password && (
                        <>
                            <label htmlFor="register-confirm-password">Confirm password</label>
                            <input id="register-confirm-password" type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" />
                        </>
                    )}
                </div>
                
                <div id="about-myself" className="space-y-6">
                    <h2 className="text-lg font-light my-5">About <span className="text-emerald-300">yourself</span>!</h2>
                    <label htmlFor="register-username">Username</label>
                    <input id="register-username" type="text" name="username" onChange={handleChange} value={formData.username} className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" />

                    <label htmlFor="register-description">Description</label>
                    <input id="register-description" type="text" name="description" onChange={handleChange} value={formData.description} className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" />
                </div>

                {/* -- MUTATION MESSAGES -- */}
                <MutationMessages mutation={mutation} />

                <div className={`flex ${is_edit ? 'justify-end' : 'justify-between'}`}>
                    {!is_edit && (
                        <Link to="/Login" className="font-light hover:text-white/75">
                            <p>Already have an account? Log in here</p>
                        </Link>
                    )}

                    <button disabled={mutation.isPending} type="submit" className="main-button border-2 border-sky-700">
                        {is_edit ? 'Update' : 'Register'}
                    </button>
                </div>
            </form>
        </div>
    );
}