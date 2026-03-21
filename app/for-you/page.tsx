"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import logo from "../../public/logo.png"
import styles from '../../styles/Foryou.module.css'
import { AiOutlineHome } from 'react-icons/ai'
import { CiBookmark, CiSettings, CiCircleQuestion, CiClock2 } from 'react-icons/ci'
import { RiBallPenLine } from 'react-icons/ri'
import { IoMdSearch, IoIosSearch, IoIosStarOutline } from 'react-icons/io'
import { IoLogOutOutline } from 'react-icons/io5'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPlayCircle } from "react-icons/fa";
import Link from 'next/link'

const Page = () => {

  type Book = {
    id: string
    title: string
    author: string
    subTitle: string
    imageLink: string
    averageRating: number
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);

  const pathname = usePathname();

useEffect(() => {
  const fetchData = async () => {
    try {
      const [selectedRes, recommendedRes, suggestedRes] = await Promise.all([
        fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"),
        fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"),
        fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"),
      ]);

      const selectedData: Book[] = await selectedRes.json();
      const recommendedData: Book[] = await recommendedRes.json();
      const suggestedData: Book[] = await suggestedRes.json();

      setSelectedBook(selectedData[0] ?? null);
      setRecommendedBooks(recommendedData);
      setSuggestedBooks(suggestedData);

    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  return (
    <div id="__next">
        <div className={styles.wrapper}>
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
                <div className={`${styles["sidebar__toggle--btn"]}`}
                onClick={toggleSidebar}>
                <RxHamburgerMenu />
                </div>
            </div>
            </div>
          </div>
          <div className={`${styles["sidebar__overlay"]} ${
            !isSidebarOpen && styles["sidebar__overlay--hidden"]}`}
            onClick={toggleSidebar}></div>
          <div className={`${styles['sidebar']} ${ isSidebarOpen ? "" : styles['sidebar--closed']}`}>
            <div className={styles.sidebar__logo}>
              <Image src={logo} alt="" />
            </div>
            <div className={styles.sidebar__wrapper}>
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
              <div className="sidebar__bottom">
                <div className={`${styles["sidebar__link--wrapper"]}`}>
                  <div className={`${styles["sidebar__link--line"]}`}></div>
                  <div className={`${styles["sidebar__icon--wrapper"]}`}>
                    <CiSettings />
                  </div>
                  <div className={`${styles["sidebar__link--text"]}`}>Settings</div>
                </div>
                <div className={`${styles['sidebar__link--wrapper']} ${styles['sidebar__link--not-allowed']}`}>
                  <div className={`${styles["sidebar__link--line"]}`}></div>
                  <div className={`${styles["sidebar__icon--wrapper"]}`}>
                    <CiCircleQuestion />
                  </div>
                  <div className={`${styles["sidebar__link--text"]}`}>Help & Support</div>
                </div>
                <div className={`${styles["sidebar__link--wrapper"]}`}>
                  <div className={`${styles["sidebar__link--line"]}`}></div>
                  <div className={`${styles["sidebar__icon--wrapper"]}`}>
                    <IoLogOutOutline />
                  </div>
                  <div className={`${styles["sidebar__link--text"]}`}>Logout</div>
                </div>
              </div>
            </div>
          </div>
        <div className={styles.row}>
          <div className={styles.container}>
              <div className={`${styles["for-you__wrapper"]}`}>
                <div className={styles.title}>
                  Selected just for you
                </div>
                
                {selectedBook && (
                  <div className={styles["selected__book"]}>
                    <div className={styles["selected__book--sub-title"]}>
                      {selectedBook.subTitle}
                    </div>

                    <div className={styles["selected__book--line"]}></div>

                    <div className={styles["selected__book--content"]}>
                      <figure className={styles["book__image--wrapper"]}>
                        <Image
                          className={styles["book__img"]}
                          src={selectedBook.imageLink}
                          alt={selectedBook.title}
                          width={140}
                          height={140}
                        />
                      </figure>

                      <div className={styles["selected__book--text"]}>
                        <div className={styles["selected__book--title"]}>
                          {selectedBook.title}
                        </div>

                        <div className={styles["selected__book--author"]}>
                          {selectedBook.author}
                        </div>

                        <div className={styles["selected__book--duration-wrapper"]}>
                          <div className={styles["selected__book--icon"]}>
                            <FaPlayCircle />
                          </div>

                          <div className={styles["selected__book--duration"]}>
                            3 mins 23 secs
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <div className={styles.title}>
                    Recommended For You
                  </div>
                  <div className={`${styles["sub--title"]}`}>
                    We think you&apos;ll like these
                  </div>
                  <div className={`${styles["recommended__books"]}`}>
                    {recommendedBooks.map((book : Book) => (
                        <div key={book.id} className={`${styles["recommended__books--link"]}`}>
                          <figure className={`${styles["book__img--wrapper"]}`}>
                            <Image 
                            src={book.imageLink}
                            alt="book" 
                            width={172}
                            height={172}
                            />
                          </figure>
                          <div className={`${styles["recommended__book--title"]}`}>{book.title}</div>
                          <div className={`${styles["recommended__book--author"]}`}>{book.author}</div>
                          <div className={`${styles["recommended__book--sub-title"]}`}>{book.subTitle}</div>
                          <div className={`${styles["recommended__book--details-wrapper"]}`}>
                            <div className={`${styles["recommended__book--details"]}`}>
                              <div className={`${styles["recommended__book--details-icon"]}`}>
                                <CiClock2 />
                              </div>
                              <div className={`${styles["recommended__book--details-text"]}`}>03:02</div>
                            </div>
                            <div className={`${styles["recommended__book--details"]}`}>
                              <div className={`${styles["recommended__book--details-icon"]}`}>
                                <IoIosStarOutline />
                              </div>
                              <div className={`${styles["recommended__book--details-text"]}`}>{book.averageRating}</div>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className={styles.title}>
                    Suggested Books
                  </div>[]
                  <div className={`${styles["sub--title"]}`}>
                    Browse those books
                  </div>
                  <div className={`${styles["recommended__books"]}`}>
                  {suggestedBooks.map((book: Book) => (
                    <div key={book.id}  className={`${styles["recommended__books--link"]}`}>
                          <figure className={`${styles["book__img--wrapper"]}`}>
                            <Image 
                            src={book.imageLink}
                            alt="book" 
                            width={172}
                            height={172}
                            />
                          </figure>
                          <div className={`${styles["recommended__book--title"]}`}>{book.title}</div>
                          <div className={`${styles["recommended__book--author"]}`}>{book.author}</div>
                          <div className={`${styles["recommended__book--sub-title"]}`}>{book.subTitle}</div>
                          <div className={`${styles["recommended__book--details-wrapper"]}`}>
                            <div className={`${styles["recommended__book--details"]}`}>
                              <div className={`${styles["recommended__book--details-icon"]}`}>
                                <CiClock2 />
                              </div>
                              <div className={`${styles["recommended__book--details-text"]}`}>03:24</div>
                            </div>
                            <div className={`${styles["recommended__book--details"]}`}>
                              <div className={`${styles["recommended__book--details-icon"]}`}>
                                <IoIosStarOutline />
                              </div>
                              <div className={`${styles["recommended__book--details-text"]}`}>{book.averageRating}</div>
                            </div>
                          </div>
                        </div>
                  ))}</div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page