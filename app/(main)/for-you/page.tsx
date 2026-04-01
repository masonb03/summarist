"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Foryou.module.css'
import { FaPlayCircle } from "react-icons/fa";
import { IoIosStarOutline } from 'react-icons/io'
import { CiClock2 } from 'react-icons/ci'
import Link from 'next/link';
import { useUser } from '@/components/UserContext';


const Page = () => {

  const {user, isSubscribed} = useUser();

  type Book = {
    id: string
    title: string
    author: string
    subTitle: string
    imageLink: string
    averageRating: number
    subscriptionRequired: boolean
  }

  

  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);

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

  return (
    <div id="__next">
        <div className={styles.wrapper}>
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
                      <Link href={`/book/${book.id}`} key={book.id}>
                        <div key={book.id} className={`${styles["recommended__books--link"]}`}>
                          {book.subscriptionRequired && !isSubscribed && (
                            <div className={`${styles["book__pill"]} ${styles["book__pill--subscription-required"]}`}>Premium</div>
                          )}
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
                        </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <div className={styles.title}>
                    Suggested Books
                  </div>
                  <div className={`${styles["sub--title"]}`}>
                    Browse those books
                  </div>
                  <div className={`${styles["recommended__books"]}`}>
                  {suggestedBooks.map((book: Book) => (
                    <Link href={`/book/${book.id}`} key={book.id}>
                      <div className={`${styles["recommended__books--link"]}`}>
                        {book.subscriptionRequired && !isSubscribed && (
                              <div className={`${styles["book__pill"]} ${styles["book__pill--subscription-required"]}`}>Premium</div>
                            )}
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
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page