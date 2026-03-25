"use client"
import { auth } from '@/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'

  type Props = {
   isOpen: boolean;
   closeAuth: () => void;
   openLogin: () => void;
    };

const ResetPassword = ({ isOpen, closeAuth, openLogin }: Props) => {
    const [email, setEmail] = useState("");

    const resetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await sendPasswordResetEmail(auth, email)
            openLogin()
        } catch(err) {
            console.log(err)
        }
    }
    if(!isOpen) return null;

  return (
    <div className="auth__wrapper" onClick={closeAuth}>
        <div className="auth" onClick={(e) => e.stopPropagation()}>
            <div className="auth__content">
                <div className="auth__title">Reset your password</div>
                <form className="auth__main--form" onSubmit={resetPassword}>
                    <input 
                    type="text" 
                    placeholder="Email address" 
                    className="auth__main--input" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <button className="btn">
                        <span>Send reset password link</span>
                    </button>
                </form>
            </div>
            <button className="auth__switch--btn" onClick={openLogin}>
                Go to login
            </button>
            <div className="auth__close--btn" onClick={closeAuth}>
                <IoMdClose />
            </div>
        </div>
    </div>
  )
}

export default ResetPassword