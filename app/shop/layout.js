import { FiltersSidebar } from "@/components";
import styles from "./layout.module.css";

export default function layout({ children }) {
  return (
    <div className={styles.container}>
      <FiltersSidebar />
      {children}
    </div>
  );
}
