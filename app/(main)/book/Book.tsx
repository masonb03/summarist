"use client"
import Image from "next/image";
import { IoIosStarOutline } from 'react-icons/io'
import { IoMicOutline } from "react-icons/io5";
import { CiClock2, CiBookmark } from 'react-icons/ci'
import { HiOutlineLightBulb, HiOutlineBookOpen } from "react-icons/hi";
import styles from '../../../styles/book.module.css'
import { useContext } from "react";
import UserContext from "@/components/UserContext";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import AudioDuration from "@/components/AudioDuration";

type Book = {
  id: string;
  title: string;
  author: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  averageRating: number;
  totalRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

type Props = {
  book: Book;
}



const Book = ({ book }: Props) => {
  const {user, isSubscribed, openAuth} = useContext(UserContext);
  const router = useRouter();

  const handleReadOrListen = () => {
    if(!user){
      openAuth();
      return
    }

    if (book.subscriptionRequired && !isSubscribed) {
      router.push("/choose-plan")
      return
    }
  
    router.push(`/player/${book.id}`)
  }


  const handleLibrary = async () => {
  if(!user) {
    openAuth();
    return
  }
  await setDoc(doc(db, "users", user.uid, "library", book.id), {
    id: book.id,
    title: book.title,
    author: book.author,
    imageLink: book.imageLink,
    subscriptionRequired: book.subscriptionRequired,
  });
}


  return (
    <div className={styles.row}>
      <div className={styles.container}>
        <div className={styles.wrapper}>

          <div className={styles.book}>
            <div className={styles.book__title}>{book.title}</div>
            <div className={styles.book__author}>{book.author}</div>
            <div className={styles["book__sub--title"]}>{book.subTitle}</div>

            <div className={styles.book__wrapper}>
              <div className={styles["book__description--wrapper"]}>
                <div className={styles["inner__book--description"]}>
                  <div className={styles.book__icon}><IoIosStarOutline /></div>
                  <div className={styles["book__average--rating"]}>{book.averageRating}</div>
                  <div className={styles["book__total--rating"]}>{book.totalRating} ratings</div>
                </div>
                <div className={styles["inner__book--description"]}>
                  <div className={styles.book__icon}><CiClock2 /></div>
                  <div className={styles.book__duration}><AudioDuration audioLink={book.audioLink} /></div>
                </div>
                <div className={styles["inner__book--description"]}>
                  <div className={styles.book__icon}><IoMicOutline /></div>
                  <div className={styles.book__type}>{book.type}</div>
                </div>
                <div className={styles["inner__book--description"]}>
                  <div className={styles.book__icon}><HiOutlineLightBulb /></div>
                  <div className={styles["book__key--ideas"]}>{book.keyIdeas} Key Ideas</div>
                </div>
              </div>
            </div>
            
            <div className={styles["book__read--btn-wrapper"]}>
              <button className={styles["book__read--btn"]} onClick={handleReadOrListen}>
                <div className={styles["book__read--icon"]}><HiOutlineBookOpen /></div>
                <div className={styles["book__read--text"]}>Read</div>
              </button>
              <button className={styles["book__read--btn"]} onClick={handleReadOrListen}>
                <div className={styles["book__read--icon"]}><IoMicOutline /></div>
                <div className={styles["book__read--text"]}>Listen</div>
              </button>
            </div>

            <div className={styles.book__bookmark} onClick={handleLibrary}>
              <div className={styles["book__bookmark--icon"]}><CiBookmark /></div>
              <div className={styles["book__bookmark--text"]}>Add title to My Library</div>
            </div>

            <div className={styles["book__second--title"]}>What&apos;s it about?</div>

            <div className={styles["book__tags--wrapper"]}>
              {book.tags?.map((tag, index) => (
                <div key={index} className={styles.book__tag}>{tag}</div>
              ))}
            </div>

            <div className={styles["book__description"]}>{book.bookDescription}</div>

            <h2 className={styles["book__second--title"]}>About the Author</h2>
            <div className={styles["book__author--description"]}>{book.authorDescription}</div>

          </div>

          <div className={styles["book__img--wrapper"]}>
            <figure className={styles["book__image--wrapper"]}>
              <Image
                className={styles.book__image}
                src={book.imageLink}
                alt={book.title}
                height={300}
                width={300}
              />
            </figure>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Book;