"use client"
import Image from 'next/image'
import  logo  from '../public/logo.png'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineHome } from 'react-icons/ai';
import { CiBookmark, CiCircleQuestion, CiSettings } from 'react-icons/ci';
import { IoMdSearch } from 'react-icons/io';
import { IoLogOutOutline } from 'react-icons/io5';
import { RiBallPenLine } from 'react-icons/ri';
import { RxHamburgerMenu } from 'react-icons/rx';
import styles from '../styles/Sidebar.module.css'
import { useState } from 'react';
import { useUser } from './UserContext';


const Sidebar = ({ logout, openAuth }: { logout: () => void; openAuth: () => void}) => {
  const {user} = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isPlayerPage = pathname?.startsWith("/player");
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);


  return (
    <div>
      <div className={`${styles["sidebar__toggle--btn"]}`}
            onClick={toggleSidebar}>
            <RxHamburgerMenu />
      </div>
      <div className={`${styles["sidebar__overlay"]} ${
            !isSidebarOpen && styles["sidebar__overlay--hidden"]}`}
            onClick={toggleSidebar}></div>
          <div className={`${styles['sidebar']} ${ isSidebarOpen ? styles["sidebar--open"] : ""}`}>
            <div className={styles.sidebar__logo}>
              <Image src={logo} alt="" />
            </div>
            <div className={styles.sidebar__wrapper}
             style={{ paddingBottom: isPlayerPage ? "100px" : "20px" }}>
              <div className={styles.sidebar__top}>
                <Link href="/for-you">
                <div className={`${styles['sidebar__link--wrapper']}`}>
                  <div className={`${styles["sidebar__link--line"]} ${pathname === "/for-you" ? styles["active--tab"] : "" }`}></div>
                  <div className={`${styles["sidebar__icon--wrapper"]}`}>
                    <AiOutlineHome />
                  </div>
                  <div className={`${styles["sidebar__link--text"]}`}>For you</div>
                </div>
                </Link>
                <div className={`${styles["sidebar__link--wrapper"]}`}>
                  <div className={`${styles["sidebar__link--line"]}`}></div>
                  <div className={`${styles["sidebar__icon--wrapper"]}`}>
                    <CiBookmark />
                  </div>
                  <div className={`${styles["sidebar__link--text"]}`}>My Library</div>
                </div>
                <div className={`${styles['sidebar__link--wrapper']} ${styles['sidebar__link--not-allowed']}`}>
                  <div className={`${styles["sidebar__link--line"]}`}></div>
                  <div className={`${styles["sidebar__icon--wrapper"]}`}>
                    <RiBallPenLine />
                  </div>
                  <div className={`${styles["sidebar__link--text"]}`}>Highlights</div>
                </div>
                <div className={`${styles['sidebar__link--wrapper']} ${styles['sidebar__link--not-allowed']}`}>
                  <div className={`${styles["sidebar__link--line"]}`}></div>
                  <div className={`${styles["sidebar__icon--wrapper"]}`}>
                    <IoMdSearch />
                  </div>
                  <div className={`${styles["sidebar__link--text"]}`}>Search</div>
                </div>
              </div>
              <div className={styles.sidebar__bottom}>
                <Link href="/settings">
                  <div className={`${styles["sidebar__link--wrapper"]}`}>
                    <div className={`${styles["sidebar__link--line"]}`}></div>
                    <div className={`${styles["sidebar__icon--wrapper"]}`}>
                      <CiSettings />
                    </div>
                    <div className={`${styles["sidebar__link--text"]}`}>Settings</div>
                  </div>
                </Link>
                <div className={`${styles['sidebar__link--wrapper']} ${styles['sidebar__link--not-allowed']}`}>
                  <div className={`${styles["sidebar__link--line"]}`}></div>
                  <div className={`${styles["sidebar__icon--wrapper"]}`}>
                    <CiCircleQuestion />
                  </div>
                  <div className={`${styles["sidebar__link--text"]}`}>Help & Support</div>
                </div>
                <div className={`${styles["sidebar__link--wrapper"]}`}
                      onClick={user ? logout : openAuth}
                >
                <div className={`${styles['sidebar__link--line']}`}></div>
                <div className={`${styles["sidebar__icon--wrapper"]}`}>
                  <IoLogOutOutline />
                </div>
                <div className={`${styles["sidebar__link--text"]}`}>
                  {user ? "Logout" : "Login"}
                </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Sidebar