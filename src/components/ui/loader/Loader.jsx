import styles from "./Loader.module.css";

const Loader = ({ className = null }) => {
  return (
    <>
      <div
        className={`${styles.spinner} ${styles.center} relative inline-block size-4 ${className}`}
      >
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
      </div>
    </>
  );
};

export default Loader;
