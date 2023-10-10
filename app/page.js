import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.websiteName}>
        Slice Stream
      </div>

      <div className={styles.videoPlayer}>
        <video controls width="700" height="400">
          <source src="./penguinExample.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <div className={styles.span}>
            Select Something
          </div>
        </div>
      </div>
    </main>
    
  )
}
