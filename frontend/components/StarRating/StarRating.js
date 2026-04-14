import styles from './StarRating.module.css';

export default function StarRating({ rating = 0, reviewCount, size = 'sm' }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<span key={i} className={`${styles.star} ${styles.full}`}>★</span>);
    } else if (i === fullStars + 1 && hasHalf) {
      stars.push(<span key={i} className={`${styles.star} ${styles.half}`}>★</span>);
    } else {
      stars.push(<span key={i} className={`${styles.star} ${styles.empty}`}>★</span>);
    }
  }

  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
      <div className={styles.stars}>{stars}</div>
      {reviewCount !== undefined && (
        <span className={styles.count}>({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}
