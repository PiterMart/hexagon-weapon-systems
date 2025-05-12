import styles from "../styles/video.module.css"

export default function Video() {

    return(
        <div>
          <video className={styles.video} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', position: 'fixed', objectFit: 'cover', zIndex: '-1', left: '0', bottom: '0', pointerEvents: 'none', }}>
            <source src="/hex-anim-render-edit.mp4" />
          </video>
        </div>
    )
}