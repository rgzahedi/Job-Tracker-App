import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const { register, handleSubmit } = useForm();

    const handleLogin = async (data) => {
        try {
            const res = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: data.email, password: data.password }),
            });

            const responseData = await res.json();

            if (res.ok) {
                localStorage.setItem("token", responseData.token);
                navigate("/applications");
            } else {
                alert(responseData.error || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Something went wrong. Please try again.");
        }
    };

    const handleRedirectToSignUp = () => {
        navigate("/sign-up");
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8">
                <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                    <div className="w-full">
                        <Input
                            placeholder="Email"
                            {...register("email", { required: "Email is required" })}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="w-full">
                        <Input
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: "Password is required" })}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <Button variant="blue" type="submit" className="w-full">
                        Login
                    </Button>
                </form>

                <div className="mt-4 text-center">
                    <Button variant="outline" onClick={handleRedirectToSignUp} className="w-full">
                        Don't have an account? Sign Up
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
