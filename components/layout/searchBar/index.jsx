import styles from "./styles.module.css";

export default function SearchBar({
  state,
  setState,
  onClick,
  maxWidth,
  placeholder,
}) {
  return (
    <div className={styles.container}>
      <input
        type="search"
        placeholder={placeholder ? placeholder : "Search . . . "}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className={`${styles.input} ${
          maxWidth == true ? styles.maxWidth : null
        }`}
      />
      <button className={styles.btn} onClick={onClick}>
        Search
      </button>
    </div>
  );
}
