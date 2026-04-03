"use client"
import React from 'react'
import login from "../../../public/login.png"
import Image from 'next/image'
import styles from '../../../styles/settings.module.css'
import { useUser } from '@/components/UserContext'
import { useRouter } from 'next/navigation'

const Settings = () => {
  const { user, isSubscribed, openAuth } = useUser();
  const router = useRouter();

  if (!user) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={`${styles['section__title']} ${styles['page__title']}`}>Settings</div>
            <div className={styles['settings__login--wrapper']}>
              <Image src={login} alt="login" />
              <div className={styles['settings__login--text']}>
                Log in to your account to see your details.
              </div>
              <button
                className={`${styles['btn']} ${styles['settings__login--btn']}`}
                onClick={openAuth}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={`${styles['section__title']} ${styles['page__title']}`}>Settings</div>
          <div className={styles['setting__content']}>
            <div className={styles['settings__sub--title']}>Your Subscription Plan</div>
            <div className={styles['settings__text']}>
              {isSubscribed === "premium-plus"
                ? "Premium Plus"
                : isSubscribed === "premium"
                ? "Premium"
                : "Basic"}
            </div>
            {!isSubscribed && (
              <button
                className={`${styles['btn']} ${styles['settings__upgrade--btn']}`}
                onClick={() => router.push('/choose-plan')}
              >
                Upgrade to Premium
              </button>
            )}
          </div>
          <div className={styles['setting__content']}>
            <div className={styles['settings__sub--title']}>Email</div>
            <div className={styles['settings__text']}>{user.email}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings