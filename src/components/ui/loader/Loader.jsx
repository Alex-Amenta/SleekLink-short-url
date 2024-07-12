import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <div className={`${styles.spinner} ${styles.center}`}>
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
