import styles from "./CallCard.module.css";

function CallCard() {
  return (
    <div className={styles.card}>
      <div className={styles.topSection}>
        <div className={styles.textContent}>
          <h3>
            خرید تلفنی از <span>تورینو</span>
          </h3>
          <p>به هرکجا که می‌خواهید!</p>
        </div>
        <img
          src="/icon/callman.svg"
          alt="خرید تلفنی از تورینو"
          className={styles.image}
        />
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.phoneBox}>
          <img src="/icon/call.svg" alt="تماس" />
          <span>021-1840</span>
        </div>
        <button className={styles.infoButton}>اطلاعات بیشتر</button>
      </div>

    </div>
  );
}

export default CallCard;
