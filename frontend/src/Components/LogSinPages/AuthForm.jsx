import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Authform.css";
import { Eye, EyeOff } from "lucide-react";
import PokemonParticles from "./PokemonParticles";


const AuthForm = ({ isSignup }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [captchaId, setCaptchaId] = useState("");
    const [captchaText, setCaptchaText] = useState("");
    const [enteredCaptcha, setEnteredCaptcha] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const fetchCaptcha = async () => {
        try {
            console.log("Fetching CAPTCHA...");
            const response = await fetch("http://localhost:5111/api/Auth/captcha");
            const data = await response.json();

            if (!response.ok) throw new Error("Failed to fetch CAPTCHA");

            setCaptchaId(data.captchaId);
            setCaptchaText(data.captchaText);
            console.log("CAPTCHA Fetched:", data);
        } catch (error) {
            console.error("Error fetching CAPTCHA:", error);
        }
    };

    useEffect(() => {
        fetchCaptcha();
    }, []);

    const onSubmit = async (data) => {
        const url = isSignup
            ? "http://localhost:5111/api/Auth/register"
            : "http://localhost:5111/api/Auth/login";

        try {
            const payload = isSignup
                ? {
                    username: data.username,
                    email: data.email,
                    mobilenumber: data.mobilenumber,
                    birthDate: data.birthDate,
                    password: data.password
                }
                : {
                    username: data.username,
                    password: data.password,
                    captchaId,
                    captchaText: enteredCaptcha
                };

            console.log("Sending payload:", payload);

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const responseData = await response.json();
            console.log("API Response:", responseData);

            if (!response.ok) {
                if (responseData.message === "Username is incorrect.") {
                    setMessage("Username is incorrect.");
                } else if (responseData.message === "Password is incorrect.") {
                    setMessage("Password is incorrect.");
                } else {
                    setMessage(responseData.message || "An error occurred");
                }
                throw new Error(responseData.message);
            }


            if (isSignup) {
                setMessage(alert("Are you sure you want to Signup?"));
                setTimeout(() => navigate("/login"), 1000);
            } else {
                localStorage.setItem("token", responseData.token);
                navigate("/home");
                window.location.reload();
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage(error.message);
            fetchCaptcha();
        }
    };


    return (
        <div className="authpage">
            <PokemonParticles/>
            <div className="auth-container">
                <h2 className="auth-title">{isSignup ? "Sign Up" : "Login"}</h2>
                {message && <p className="auth-error">{message}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Username:</label>
                        <input
                            className="auth-input"
                            type="text"
                            {...register("username", { required: "Username is required" })}
                        />
                        {errors.username && <p className="auth-error">{errors.username.message}</p>}
                    </div>
                    {isSignup && (
                        <>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    className="auth-input"
                                    {...register("email", { required: "Email is required" })}
                                />
                                {errors.email && <p className="auth-error">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label>Mobile Number:</label>
                                <input
                                    type="tel"
                                    className="auth-input"
                                    {...register("mobilenumber", { required: "Mobile number is required", pattern: { value: /^[0-9]{10}$/, message: 'Invalid Phone Number' } })}
                                />
                                {errors.mobilenumber && <p className="auth-error">{errors.mobilenumber.message}</p>}
                            </div>
                            <div>
                                <label>Birth Date:</label>
                                <input
                                    type="date"
                                    className="auth-input"
                                    {...register("birthDate", { required: "Birth date is required" })}
                                />
                                {errors.birthDate && <p className="auth-error">{errors.birthDate.message}</p>}
                            </div>
                        </>
                    )}

                    <div className="relative">
                        <label>Password:</label>
                        <input
                            className="auth-input pr-10"
                            type={showPassword ? "text" : "password"}
                            {...register("password", { required: "Password is required" })}
                        />
                        <span
                            className="absolute right-3 top-2 cursor-pointer text-xl"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </span>
                        {errors.password && <p className="auth-error">{errors.password.message}</p>}
                    </div>


                    {!isSignup && captchaText && (
                        <div>
                            <label>CAPTCHA:</label>
                            <p className="captcha-text">{captchaText}</p>
                            <input
                                className="auth-input"
                                type="text"
                                placeholder="Enter CAPTCHA"
                                value={enteredCaptcha}
                                onChange={(e) => setEnteredCaptcha(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <button className="auth-button" type="submit">
                        {isSignup ? "Sign Up" : "Login"}
                    </button>
                </form>

                {!isSignup && (
                    <p className="signupcontainer">
                        Don't have an account?{" "}
                        <button className="auth-link" onClick={() => navigate("/signup")}>
                            Sign Up
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
};

export default AuthForm;
