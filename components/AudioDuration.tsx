import React, { useEffect, useState } from 'react'
import styles from "../styles/Searchbar.module.css"
import { CiClock2 } from 'react-icons/ci';

const AudioDuration = ({ audioLink }: { audioLink: string }) => {
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const audio = new Audio(audioLink);
    audio.addEventListener("loadedmetadata", () => {
      const mins = Math.floor(audio.duration / 60);
      const secs = Math.floor(audio.duration % 60);
      setDuration(`${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`);
    });
  }, [audioLink]);

  return <div className={styles["search__book--duration"]}>
        <div className={`${styles["recommended__book--details"]}`}>
            <div className={`${styles["recommended__book--details-icon"]}`}>
                <CiClock2 />
            </div>
            <div className={`${styles["recommended__book--details-text"]}`}>
                {duration}
            </div>
        </div>
        </div>;
};

export default AudioDuration