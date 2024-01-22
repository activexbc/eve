import { trending } from "@/data/trending";
import Image from "next/image";
import styles from "./styles.module.css";

export default function TrendingSection() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {trending.map((data) => (
          <div className={styles.dataContainer} key={data.id}>
            <div className={styles.imgContainer}>
              <Image src={data.img} alt={""} fill />
              <div className={styles.contentContainer}>
                <h1 className={styles.title}>{data.title}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
