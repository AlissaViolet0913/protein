import Image from 'next/image';
import Link from 'next/link';
import styles from 'styles/cart.module.css';
import type { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../layout/header';


export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  const cookies = req.cookies;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/carts?userId=${cookies.id}`
  );
  const carts = await res.json();

  return {
    props: { carts }
  };
};


const Cart = ({ carts }: any) => {
  const [localData, setLocalData] = useState([])
  const router = useRouter();


  // Local Storageからカートに追加した商品データ取得
  useEffect(() => {
    if (carts.length === 0) {
      const collection = Object.keys(localStorage).map(key => {
        let keyJson = JSON.stringify(key);
        return {
          key: JSON.parse(keyJson),
          value: JSON.parse(localStorage.getItem(key) as string)
        }
      })
      setLocalData(collection as any)
    }
  }, []);


  //"ally-supports-cache" を除外 (Local Storageの中の商品情報以外を削除)
  const filteredData: any = localData.filter((object: any) => {
    return object.key == object.value.itemId;
  });

  // cartsの削除【始まり】
  function deleteItem(cart: any) {
    fetch(`${process.env.NEXT_PUBLIC_PROTEIN}/api/carts/${cart.id}`, {
      method: 'DELETE',
    });
    router.reload();
  }
  // cartsの削除【終わり】


  // localDataの削除【始まり】
  function deleteItemID(data: any) {
    localStorage.removeItem(data.key);
    router.reload();
  }
  // localDataの削除【終わり】


  // cartsの合計【始まり】
  const priceArray: any[] = [];

  carts.forEach((element: any) => {
    const multiPrice = element.price * element.countity;
    priceArray.push(multiPrice);
  });

  const initialValue = 0;
  const sumPrice = priceArray.reduce(
    (accumulator, currentPrice) => accumulator + currentPrice,
    initialValue
  );
  // cartsの合計【終わり】


  // localDataの合計【始まり】
  const priceArrayLocal: any[] = [];

  filteredData.forEach((element: any) => {
    const multiPriceLocal = element.value.price * element.value.countity;
    priceArrayLocal.push(multiPriceLocal);
  });

  const initialValueLocal = 0;
  const sumPriceLocal = priceArrayLocal.reduce(
    (accumulator, currentPrice) => accumulator + currentPrice,
    initialValueLocal
  );
  // localDataの合計【終わり】


  console.log(carts)

  const routerHandler = () => {
    if (carts[0]) {
      router.push('/purchase');
    } else {
      alert('商品一覧から商品を選んでカートに入れてください');
      router.push('/items');
    }
  };

  const handlerWithLocal = () => {
    if (!filteredData.values) {
      alert('商品一覧から商品を選んでカートに入れてください');
      router.push('/items');
    } else {
      alert('ログイン後に商品購入可能です（会員登録してない方は会員登録をお願いします）');
      router.push('/');
    }
  };

  return (
    <>
      <Header />
      <hr className={styles.hr}></hr>
      <div className={styles.item_list}>
        <h4 className={styles.cart_title}>カート</h4>

        {carts.length > 0 ?
          <div>
            <section className={styles.cart_content}>
              {carts.map((cart: any) => (
                <div key={cart.id} className={styles.cart_content2}>
                  <Image
                    priority
                    className={styles.cart_img}
                    src={cart.imageUrl}
                    alt="商品画像"
                    width={260}
                    height={260}
                  />
                  <div className={styles.text_content}>
                    <p>{cart.name}</p>
                    <p>
                      <span className={styles.quantity}>数量</span>
                      {cart.countity}個
                    </p>
                    <p>
                      <span>価格(税込)</span>¥
                      {(cart.price * cart.countity).toLocaleString()}
                    </p>
                    <button
                      className={styles.delete_button}
                      onClick={() => deleteItem(cart)}
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </section>

            <section>
              <div className={styles.cart_total}>
                <p>合計金額:</p>
                <p className={styles.total}>
                  ¥&ensp;{sumPrice.toLocaleString()}
                </p>
              </div>
              <div className={styles.buttons}>
                <Link href="/items">
                  <button className={styles.shopping}>
                    買い物を続ける
                  </button>
                </Link>
                <button className={styles.purchase} onClick={routerHandler}>
                  購入する
                </button>
              </div>
            </section>
          </div>

          :

          <div>
            <section className={styles.cart_content}>
              {filteredData.map((data: any) => (
                <div key={data.value.itemId} className={styles.cart_content2}>
                  <Image
                    priority
                    className={styles.cart_img}
                    src={data.value.imageUrl}
                    alt="商品画像"
                    width={260}
                    height={260}
                  />
                  <div className={styles.text_content}>
                    <p>{data.value.name}</p>
                    <p>
                      <span className={styles.quantity}>数量</span>
                      {data.value.countity}個
                    </p>
                    <p>
                      <span>価格(税込)</span>¥
                      {(data.value.price * data.value.countity).toLocaleString()}
                    </p>
                    <button
                      className={styles.delete_button}
                      onClick={() => deleteItemID(data)}
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </section>

            <section>
              <div className={styles.cart_total}>
                <p>合計金額:</p>
                <p className={styles.total}>
                  ¥&ensp;{sumPriceLocal.toLocaleString()}
                </p>
              </div>
              <div className={styles.buttons}>
                <Link href="/items">
                  <button className={styles.shopping}>
                    買い物を続ける
                  </button>
                </Link>
                <button className={styles.purchase} onClick={handlerWithLocal}>
                  購入する
                </button>
              </div>
            </section>
          </div>}

      </div>
      <footer className={styles.footer}>
        <h1>RAKUTEIN</h1>
      </footer>
    </>
  );
};

export default Cart;
