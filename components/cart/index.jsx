import { getCartData, removeFromCart, updateQuantity } from "@/hooks/cart";
import Image from "next/image";
import { AiOutlineMinus } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import styles from "./styles.module.css";

export default function Cart({ cartData, setCartProducts }) {
  if (!cartData) {
    return <p>No items in cart</p>;
  }

  const handleUpdateQuantity = (productId, change) => {
    updateQuantity(productId, change);
    const updatedCartProducts = getCartData();
    setCartProducts(updatedCartProducts);
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    const updatedCartProducts = getCartData();
    setCartProducts(updatedCartProducts);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {cartData.length == 1
          ? `${cartData.length} product in cart`
          : `${cartData.length} products in cart`}
      </h1>
      <div className={styles.wrapper}>
        {cartData.map((item, index) => (
          <div className={styles.itemWrapper} key={index}>
            <div className={styles.itemContainer}>
              <div className={styles.imgContainer}>
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  priority
                  sizes="(min-width: 50px)"
                  fill
                />
              </div>
              <div className={styles.contentContainer}>
                <h3 className={styles.itemTitle}>{item.name}</h3>
                <p className={styles.desc}>
                  {item.desc.length > 100
                    ? `${item.desc.substring(0, 100)}...`
                    : item.desc}
                </p>

                <p>Price: £{item.price}</p>
                <p>Stock: {item.stock}</p>
              </div>
              <div className={styles.btnsContainer}>
                <button
                  className={styles.btn}
                  onClick={() => {
                    handleRemoveFromCart(item.id);
                  }}
                >
                  <MdDeleteForever className={styles.icon} />
                </button>
              </div>
            </div>
            <div className={styles.quanityContainer}>
              <div className={styles.quantityBtnContainer}>
                <button
                  className={styles.quantityBtn}
                  onClick={() => {
                    handleUpdateQuantity(item.id, -1);
                  }}
                >
                  <AiOutlineMinus />
                </button>
                <p className={styles.quantity}>{item.quantity}</p>
                <button
                  className={styles.quantityBtn}
                  onClick={() => {
                    handleUpdateQuantity(item.id, 1);
                  }}
                >
                  <GoPlus />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
