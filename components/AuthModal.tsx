import React from 'react'
import Image from 'next/image'
import google from '../public/google.png'
import { IoMdClose } from "react-icons/io";
import Link from 'next/link';

type Props = {
   isOpen: boolean;
   closeAuth: () => void;
   openSignup: () => void;
};

const AuthModal = ({ isOpen, closeAuth, openSignup }: Props) => {
    if(!isOpen) return null;

  return (
    <div className="auth__wrapper" onClick={closeAuth}>
        <div className="auth" onClick={(e) => e.stopPropagation()}>
            <div className="auth__content">
            <div className="auth__title">Log in to Summarist</div>
            <button className="btn guest__btn--wrapper">
                <figure className="google__icon--mask guest__icon--mask">
                <Image src={google} alt="guest" />
                </figure>
                <Link href={"/for-you"}>
                <div>Login as a Guest</div>
                </Link>
            </button>
            <div className="auth__separator">
                <span className="auth__separator--text">or</span>
            </div>
            <button className="btn google__btn--wrapper">
                <figure className="google__icon--mask">
                <Image src={google} alt='google' />
                </figure>
                <div>Login with Google</div>
            </button>
            <div className="auth__separator">
                <span className="auth__separator--text">or</span>
            </div>
            <form className="auth__main--form">
                <input type="text" placeholder="Email Address" className="auth__main--input" />
                <input type="password" placeholder="Password" className="auth__main--input" />
                <button className="btn">
                <span>Login</span>
                </button>
            </form>
            </div>
            <div className="auth__forgot--password">Forget your password?</div>
            <button className="auth__switch--btn" onClick={openSignup}>Don&apos;t have an account?</button>
            <div className="auth__close--btn" onClick={closeAuth}>
                <IoMdClose />
            </div>
        </div>
    </div>
  )
}

export default AuthModal