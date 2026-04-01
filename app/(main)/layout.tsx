"use client"
import React, { useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth, db } from '@/firebase';
import { getDoc, doc } from 'firebase/firestore';
import Sidebar from '@/components/Sidebar';
import AuthModal from '@/components/AuthModal';
import CreateAcc from '@/components/CreateAcc';
import ResetPassword from '@/components/ResetPassword';
import UserContext from '@/components/UserContext';
import Searchbar from '@/components/Searchbar';

type ForYouLayoutProps = {
  children: ReactNode;
};

const ForYouLayout = ({ children }: ForYouLayoutProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<"login" | "signup" | "reset" | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const openAuth = () => setAuthView("login");
  const closeAuth = () => setAuthView(null);
  const logout = () => signOut(auth).catch(console.error);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if(currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        setIsSubscribed(userDoc.data()?.isSubscribed ?? false);
      } else {
        setIsSubscribed(false)
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ user, isSubscribed, openAuth }}>
      <Searchbar />
        <Sidebar openAuth={openAuth} logout={logout} />
        <main>
          {children}
        </main>
      </UserContext.Provider>

      <AuthModal
        isOpen={authView === "login"}
        closeAuth={closeAuth}
        openSignup={() => setAuthView("signup")}
        openReset={() => setAuthView("reset")}
      />
      <CreateAcc 
        isOpen={authView === "signup"}
        closeAuth={closeAuth}
        openLogin={() => setAuthView("login")}
      />
      <ResetPassword 
        isOpen={authView === "reset"}
        closeAuth={closeAuth}
        openLogin={() => setAuthView("login")}
      />
    </div>
  )
}

export default ForYouLayout;