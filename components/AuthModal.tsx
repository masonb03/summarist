"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import google from '../public/google.png'
import { IoMdClose } from "react-icons/io";
import { auth } from "../firebase"
import { signInAnonymously, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import guest from "../public/people.png";



type Props = {
    isOpen: boolean;
    closeAuth: () => void;
    openSignup: () => void;
    openReset: () => void;
};


const AuthModal = ({ isOpen, closeAuth, openSignup, openReset }: Props) => {
    
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("LOGIN CLICKED")
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log("LOGGED IN:", user);
            closeAuth();
            router.push("/for-you")
        } catch (err) {
            console.log(err)
        }
    }

    const loginAsGuest = async () => {
        try {
            await signInAnonymously(auth)
            closeAuth()
            console.log("LOGGED IN AS GUEST")
            router.push("/for-you")
        }catch (err) {
            console.log(err)
        }
    }

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider)
            closeAuth();
        }catch (err) {
            console.log(err)
        }
    }

    if(!isOpen) return null;

  return (
    <div className="auth__wrapper" onClick={closeAuth}>
        <div className="auth" onClick={(e) => e.stopPropagation()}>
            <div className="auth__content">
            <div className="auth__title">Log in to Summarist</div>
                    <button className="btn guest__btn--wrapper" onClick={loginAsGuest}>
                        <figure className="google__icon--mask guest__icon--mask">
                        <Image src={guest} alt="guest" />
                        </figure>
                        <div>Login as a Guest</div>
                    </button>
            <div className="auth__separator">
                <span className="auth__separator--text">or</span>
            </div>
            <button className="btn google__btn--wrapper" onClick={loginWithGoogle}>
                <figure className="google__icon--mask">
                <Image src={google} alt='google' />
                </figure>
                <div>Login with Google</div>
            </button>
            <div className="auth__separator">
                <span className="auth__separator--text">or</span>
            </div>
            <form className="auth__main--form" onSubmit={login}>
                <input 
                type="text" 
                placeholder="Email Address" 
                className="auth__main--input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input 
                type="password"
                 placeholder="Password" 
                 className="auth__main--input" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
                 />
                <button className="btn">
                    <span>Login</span>
                </button>
            </form>
            </div>
            <div className="auth__forgot--password" onClick={openReset}>Forget your password?</div>
            <button className="auth__switch--btn" onClick={openSignup}>Don&apos;t have an account?</button>
            <div className="auth__close--btn" onClick={closeAuth}>
                <IoMdClose />
            </div>
        </div>
    </div>
  )
}

export default AuthModal

