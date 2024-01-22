import { deleteUserAddress } from "@/hooks/main";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import styles from "./styles.module.css";

export default function UserListAddresses({ id, addresses }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Addresses</h1>
      <div className={styles.wrapper}>
        <Link href={`/user/${id}/addresses/add`} className={styles.btn}>
          Add Address
        </Link>
        {addresses.map((address) => (
          <div className={styles.addressContainer} key={address.uid}>
            <div className={styles.leftContainer}>
              <div className={styles.leftWrapper}>
                <p className={styles.line}>{address.street}</p>
                {address.street2 == "" ? null : (
                  <p className={styles.line}>{address.street2}</p>
                )}
                <p className={styles.line}>{address.postCode}</p>
              </div>
              <div className={styles.middleContainer}>
                <p className={styles.line}>{address.city}</p>
                <p className={styles.line}>{address.country}</p>
              </div>
            </div>
            <div className={styles.btnsContainer}>
              <button
                className={styles.btn1}
                onClick={() =>
                  router.push(`/user/${id}/addresses/edit?id=${address.uid}`)
                }
              >
                <MdOutlineModeEdit />
              </button>
              <button
                className={styles.btn1}
                onClick={() => deleteUserAddress(id, address.uid)}
              >
                <MdDeleteForever />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
