import styles from '../styles/purchase.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Users, Users2, Users3, User, Item } from '../types/type';
import { supabase } from '../utils/supabase';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
const ItemData: React.FunctionComponent<{
  user: User;
  carts: Item;
  cookie:number;
}> = ({ user, carts,cookie }) => {
  const router = useRouter();

  carts.forEach((cart: Item) => {
    cart.date = new Date().toLocaleString('ja-JP');
  });

console.log(cookie)
  const userId = user.id;
  const items = carts;
//  const cart:any = items.forEach(element => console.log(element));
// console.log(cart)
  // const purchaseHistories = {
  //   userId: user.id,
  //   items: carts,
  // };

  // 購入履歴jsonサーバーに購入商品を追加する処理[始まり]
  const handler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    //purchaseHistoriesに情報をPOST(supabase)
    await supabase.from('purchaseHistories').insert({userId,items}).then(() => {

    //purchaseHistoriesに情報をPOST(fetch)
    // fetch(
    //   `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/purchaseHistories`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(purchaseHistories),
    //   }
    // )
      deleteCarts(event);
      router.push('/purchase/purchased');
    });
  };
  // 購入履歴jsonサーバーに購入商品を追加する処理[終わり]

  // カート内の商品を消去[始まり]
  // fetch(`/api/carts/${cartItem.id})
  const deleteCarts = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // const data = { deleted: true };
    event.preventDefault();
     //カート内の情報を消去(supabase)
    await supabase.from('carts').delete().eq("userId",cookie);

    //カート内の情報を消去（fetch）
    // const data = {};
    // carts.forEach((cart: Item) => {
    //   fetch(`${process.env.NEXT_PUBLIC_PROTEIN_DATA}/carts/${cart.id}`, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   });
    // });
  };
  // カート内の商品を消去[終わり]

  // 合計金額を算出する処理[始まり]
  const priceArray: number[] = [];
  carts.forEach((element: Item) => {
    const multiPrice = element.price * element.countity;
    priceArray.push(multiPrice);
  });
  const initialValue = 0;
  const sumPrice = priceArray.reduce(
    (accumulator, currentPrice) => accumulator + currentPrice,
    initialValue
  );
  // 合計金額を算出する処理[終わり]

  return (
    <>
      <section className={styles.itemdata_main}>
        <main className="purchase_main">
          <h1 className={styles.title}>ご注文内容確認</h1>
        </main>
        <div>
          <h2 className={styles.purchase_h2}>配送先住所</h2>

          <p>
            お名前：{user.firstName}
            {user.lastName}&nbsp;({user.firstNameKana}
            {user.lastNameKana})
          </p>
          <p>電話番号：{user.tel}</p>
          <p>郵便番号：{user.postCode}</p>
          <p>
            住所：{user.prefecture}
            {user.city}
            {user.aza}
            {user.building}
          </p>
        </div>

        <section className={styles.purchased}>
          <h2 className={styles.purchase_h2} id="user_purchased">
            ご注文内容
          </h2>
          {carts.map((cart: Item) => {
            return (
              <div key={cart.id}>
                {/* <div> */}
                {/* <h3>購入日時：{item.date}</h3> */}
                <div>
                  <div className={styles.list}>
                    <Image
                      src={cart.imageUrl}
                      width={260}
                      height={260}
                      alt="商品画像"
                      className={styles.img}
                    />
                    <div className={styles.itemDetail}>
                      {/* <Link
                          href={`./items/${encodeURIComponent(
                            item.itemId
                          )}`}
                        > */}
                      <h4 className={styles.itemA}>{cart.name}</h4>
                      {/* </Link> */}
                      <p>
                        フレーバー &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={styles.style}>
                          &nbsp;{cart.flavor}&nbsp;
                        </span>
                      </p>
                      <p>
                        価格 &nbsp;&nbsp;&nbsp;&nbsp; ¥
                        <span className={styles.style}>
                          &nbsp;{cart.price.toLocaleString()}&nbsp;
                        </span>
                      </p>
                      <p>
                        数量&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={styles.style}>
                          &nbsp;{cart.countity}&nbsp;
                        </span>
                      </p>
                      <p>
                        小計 &nbsp;&nbsp;&nbsp;&nbsp; ¥
                        <span className={styles.style}>
                          &nbsp;
                          {(
                            cart.price * cart.countity
                          ).toLocaleString()}
                          &nbsp;
                        </span>
                      </p>
                    </div>
                  </div>
                  <br />
                  <hr />
                </div>
                {/* </div> */}
              </div>
            );
          })}
        </section>

        <br />
        <br />
        <br />

        <div
          style={{ textAlign: 'right' }}
          className={styles.sumPrice}
        >
          <u>合計金額:&nbsp;￥{sumPrice.toLocaleString()}</u>
        </div>
        <br />
        <br />

        <section className={styles.button_display}>
          <Link href="/cart">
            <button className={styles.btnA}>
              <span>キャンセル</span>
            </button>
          </Link>
          <form action="/api/checkout_sessions" method="POST">
            <input type="hidden" name="price" value={sumPrice} />
            <button className={styles.btnB} type="submit">
              クレジット決済
            </button>
          </form>
          <button className={styles.btnB} onClick={handler}>
            <span>代引き決済</span>
          </button>
        </section>
      </section>
    </>
  );
};

export default ItemData;
