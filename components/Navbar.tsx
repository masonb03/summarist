import React from 'react'
import logo from '../public/logo.png'
import Image from 'next/image'
import styles from '../styles/navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav__wrapper}>
        <figure className={styles[`nav__img--mask`]}>
          <Image className={styles.nav__img} src={logo} alt="logo" />
        </figure>
        <ul className={styles[`nav__list--wrapper`]}>
          <li className={`${styles.nav__list} ${styles[`nav__list--login`]}`}>
            Login</li>
          <li className={`${styles.nav__list} ${styles[`nav__list--mobile`]}`}>About</li>
          <li className={`${styles.nav__list} ${styles[`nav__list--mobile`]}`}>Contact</li>
          <li className={`${styles.nav__list} ${styles[`nav__list--mobile`]}`} >Help</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar