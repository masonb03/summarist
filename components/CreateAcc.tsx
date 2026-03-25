"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import google from '../public/google.png'
import { IoMdClose } from 'react-icons/io';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';

type Props = {
   isOpen: boolean;
   closeAuth: () => void;
   openLogin: () => void;
};

const CreateAcc = ({ isOpen, closeAuth, openLogin }: Props) => {

    const router = useRouter();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const register = async (e: React.FormEvent) => {
         e.preventDefault();
                console.log("REGISTER CLICKED")
                try {
                    const user = await createUserWithEmailAndPassword(auth, email, password);
                    console.log("ACCOUNT CREATED:", user);
                    closeAuth();
                    router.push("/for-you")
                } catch (err) {
                    console.log("ERROR", err)
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


    if(!isOpen)
        return null
    
  return (
     <div className="auth__wrapper" onClick={closeAuth}>
        <div className="auth" onClick={(e) => e.stopPropagation()}>
            <div className="auth__content">
                <div className="auth__title">Sign up to Summarist</div>
                <button className="btn google__btn--wrapper" onClick={loginWithGoogle}>
                    <figure className="google__icon--mask">
                        <Image src={google} alt="guest" />
                    </figure>
                    <div>Sign up with Google</div>
                </button>
                <div className="auth__separator">
                    <span className="auth__separator--text">or</span>
                </div>
                <form className="auth__main--form" onSubmit={(register)}>
                    <input 
                    type="text" 
                    placeholder="Email Address" className="auth__main--input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <input 
                    type="password" 
                    placeholder="Password" className="auth__main--input"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <button className="btn">
                        <span>Sign up</span>
                    </button>
                </form>
            </div>
            <button className="auth__switch--btn" onClick={openLogin}>Already have an account?</button>
            <div className="auth__close--btn" onClick={closeAuth}>
                <IoMdClose />
            </div>
        </div>
    </div>
  )
}

export default CreateAcc