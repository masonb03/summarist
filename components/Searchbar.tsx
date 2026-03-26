import React from 'react'
import { IoIosSearch } from 'react-icons/io'
import styles from '../styles/Searchbar.module.css'
import Image from 'next/image'

const Searchbar = () => {
  return (
    <div className={styles.search__background}>
            <div className={styles.search__wrapper}>
              <figure>
                <Image src="" alt="" />
              </figure>
              <div className={styles.search__content}>
                <div className={styles.search}>
                  <div className={`${styles["search__input--wrapper"]}`}>
                    <input type="text" className={styles.search__input}
                    placeholder="Search for books"
                    />
                    <div className={styles.search__icon}>
                      <IoIosSearch />
                    </div>
                  </div>
                </div>
            </div>
            </div>
          </div>
  )
}

export default Searchbar