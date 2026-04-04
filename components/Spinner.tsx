// components/Spinner.tsx
import styles from '@/styles/spinner.module.css'

const Spinner = () => {
  return (
    <div className={styles.spinner__wrapper}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default Spinner