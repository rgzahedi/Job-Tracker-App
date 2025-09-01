import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const SignPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/users/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                navigate("/applications");
            } else {
                alert(data.error || "Sign-up failed");
            }
        } catch (err) {
            console.error("Sign-up error:", err);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8">
                <h2 className="text-center text-2xl font-bold mb-6">Sign Up</h2>
                <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="w-full">
                        <Input
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="w-full">
                        <Input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <Button variant="blue" type="submit" className="w-full">
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SignPage;
