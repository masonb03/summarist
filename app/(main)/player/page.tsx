"use client"
import AudioPlayer from '@/components/AudioPlayer';
import styles from '../../../styles/player.module.css'
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';

type Player = {
  id: string;
  title: string;
  author: string;
  imageLink: string;
  audioLink: string;
  summary: string;
}

type Props = {
  book: Player;
}

const Player = ({ book }: Props) => {

const [loading, setLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 500);

  return () => clearTimeout(timer);
}, []);

if (loading) return <Spinner />

  return (
    <div className={styles.summary}>
      <div className={styles["audio__book--summary"]}>
        <div className={styles["audio__book--summary-title"]}>
          <b>{book.title}</b>
        </div>
        <div className={styles["audio__book--summary-text"]}>
          {book.summary}
        </div>
      </div>

      <AudioPlayer
        audioLink={book.audioLink}
        title={book.title}
        author={book.author}
        imageLink={book.imageLink}
      />
    </div>
  );
};

export default Player;