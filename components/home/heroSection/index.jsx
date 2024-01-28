import { Logo } from "@/components/layout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function HeroSection({ bannerInfo }) {
  const router = useRouter();

  return (
    <section className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={bannerInfo?.imageURL}
          alt={"hi"}
          fill
          priority
          sizes="(min-width: 50px)"
        />
      </div>
      <div className={styles.contentContainer}>
        <Logo size={"xLarge"} />
        <p className={styles.subTitle}>{bannerInfo?.subText}</p>
        <p className={styles.mainText}>{bannerInfo?.mainText}</p>
        <button
          onClick={() => router.push(`/${bannerInfo?.btn?.path}`)}
          className={styles.btn}
        >
          {bannerInfo?.btn?.name}
        </button>
      </div>
    </section>
  );
}
