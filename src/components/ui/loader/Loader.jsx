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
        <p className="mt-10 flex justify-center items-center text-sm text-black/80">
          Loading...
        </p>
      </div>
    </>
  );
};

export default Loader;
