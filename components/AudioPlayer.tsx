"use client"
import { useState, useRef, useEffect} from 'react'
import styles from '../styles/player.module.css'
import { MdReplay10, MdOutlineForward10, MdPlayCircle, MdPauseCircle } from "react-icons/md";
import Image from 'next/image';

 type Props = {
  audioLink: string;
  title: string;
  author: string;
  imageLink: string;
 }

const AudioPlayer = ({ audioLink, title, author, imageLink }: Props) => {
const audioRef = useRef<HTMLAudioElement>(null);
const [isPlaying, setIsPlaying] = useState(false);
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);

const togglePlay = () => {
  if (isPlaying) {
    audioRef.current?.pause();
  } else {
    audioRef.current?.play();
  }
  setIsPlaying(prev => !prev)
}

const rewind = () => {
  if (audioRef.current) {
    audioRef.current.currentTime -=10;
  }
}

const forward = () => {
  if (audioRef.current) {
    audioRef.current.currentTime +=10;
  }
}

const progressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = Number(e.target.value);
  if (audioRef.current) {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  }
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
}

useEffect(() => {
  const audio = audioRef.current;
  if (!audio) 
    return;

  const updateTime = () => setCurrentTime(audio.currentTime);
  const updateDuration = () => setDuration(audio.duration);

  audio.addEventListener("timeupdate", updateTime);
  audio.addEventListener("loadedmetadata", updateDuration);

  return () => {
  audio.removeEventListener("timeupdate", updateTime);
  audio.removeEventListener("loadedmetadata", updateDuration);
  }
}, [])

  return (
<div className={`${styles.audio__wrapper}`}>
      <audio ref={audioRef} src={audioLink} />

      <div className={`${styles["audio__track--wrapper"]}`}>
        <figure className={`${styles["audio__track--image-mask"]}`}>
          <figure className={`${styles["book__img--wrapper"]}`}>
            <Image src={imageLink} alt={title} width={48} height={48} />
          </figure>
        </figure>
        <div className={`${styles["audio__track--details-wrapper"]}`}>
          <div className={`${styles["audio__track--title"]}`}>{title}</div>
          <div className={`${styles["audio__track--author"]}`}>{author}</div>
        </div>
      </div>
      <div className={`${styles["audio__control--wrapper"]}`}>
        <div className={styles.audio__controls}>
          <button className={`${styles["audio__controls--btn"]}`} onClick={rewind}>
            <MdReplay10 />
          </button>
          <button className={`${styles["audio__controls--btn"]}`} onClick={togglePlay}>
            {isPlaying ? <MdPauseCircle /> : <MdPlayCircle />}
          </button>
          <button className={`${styles["audio__controls--btn"]}`} onClick={forward}>
            <MdOutlineForward10 />
          </button>
        </div>
      </div>
      <div className={`${styles["audio__progress--wrapper"]}`}>
        <div className={styles.audio__time}>{formatTime(currentTime)}</div>
        <input
          type="range"
          className={`${styles["audio__progress--bar"]}`}
          min={0}
          max={duration}
          value={currentTime}
          onChange={progressChange}
          style={{ "--range-progress": `${(currentTime / duration) * 100}%` } as React.CSSProperties}
        />
        <div className={styles.audio__time}>{formatTime(duration)}</div>
      </div>
    </div>
  )
}

export default AudioPlayer