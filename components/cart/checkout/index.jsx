"use client";
import styles from "./styles.module.css";

export default function Checkout({ adddresses, setAddressData, addressData }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your addresses</h1>
      <div className={styles.wrapper}>
        {adddresses?.map((address) => (
          <div className={styles.addressContainer} key={address.id}>
            <input
              type={"checkbox"}
              checked={addressData == address.id ? true : false}
              onChange={() =>
                setAddressData((prev) => (address.id == prev ? "" : address.id))
              }
              className={styles.input}
            />
            <div className={styles.contentContainer}>
              <p>{address.street}</p>
              {address.street2 && <p>{address.street2}</p>}
              <p>{address.postCode}</p>
              <p>{address.city}</p>
              <p>{address.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
