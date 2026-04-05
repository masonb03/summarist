"use client"
import React, { useEffect, useRef, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import styles from '../styles/Searchbar.module.css'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import AudioDuration from './AudioDuration'
import SearchSkeleton from './skeletons/SearchSkeleton'

type Book = {
  id: string;
  title: string;
  author: string;
  imageLink: string;
  subscriptionRequired: boolean;
  audioLink: string;
}

const Searchbar = () => {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Book[]>([])
  const [loading, setLoading] = useState(false);
 const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/choose-plan") return null;

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
        );
        const data: Book[] = await res.json();

        const booksWithDuration = await Promise.all(
          data.map(async (book) => {
            const bookRes = await fetch(
              `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${book.id}`
            );
            const bookData = await bookRes.json();
            return { ...book, audioLink: bookData.audioLink };
          })
        );

        setResults(booksWithDuration);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  return (
    <div className={styles.search__background}>
            <div className={styles.search__wrapper}>
              <div></div>
              <div className={styles.search__content}>
                <div className={styles.search}>
                  <div className={`${styles["search__input--wrapper"]}`}>
                    <input 
                    type="text" 
                    className={styles.search__input}
                    placeholder="Search for books"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className={styles.search__icon}>
                      <IoIosSearch />
                    </div>
                  </div>
                </div>

                {search.trim() && (
                  <div className={styles['search__books--wrapper']}>
                    {loading && <SearchSkeleton />}
                    {!loading && results.length === 0 && (
                      <div className={styles["search__no--results"]}>No books found</div>
                    )}
                    {!loading && results.map((book) => (
                      <Link
                        href={`/book/${book.id}`}
                        key={book.id}
                        className={styles["search__book--link"]}
                        onClick={() => setSearch("")}
                      >
                        <figure className={styles["book__img--wrapper"]}>
                          <Image src={book.imageLink} alt="book" width={80} height={80} />
                        </figure>
                        <div className={styles["search__book--title"]}>{book.title}</div>
                        <div className={styles["search__book--author"]}>{book.author}</div>
                        <AudioDuration audioLink={book.audioLink}/>
                      </Link>
                    ))}
                  </div>
                )}
            </div>
            </div>
          </div>
  )
}

export default Searchbar