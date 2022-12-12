import Image from 'next/image';
import Link from 'next/link';
import { NextPage } from 'next';
import styles from '../../styles/item_detail.module.css';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next';
import React, { useState, useEffect } from 'react';
import Header from '../layout/header';
import { useRouter } from 'next/router';


export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/items/`
  );
  const items = await res.json();
  const paths = items.map((item: any) => ({
    params: {
      // idをdb.jsonファイルの文字列に合わせる
      id: item.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/items/${params!.id}`
  );
  const detail = await res.json();

  return {
    props: { detail },
    revalidate: 10,
  };
};


// detail getStaticPropsから取得
const ItemDetail: NextPage = ({ detail }: any) => {
  const router = useRouter();
  const [count, setCount] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [userId, setUserId] = React.useState('');
  const [flavor, setFlavor] = React.useState(detail.flavor[0]);

  
  //　数量変更
  const addHandlerNext = (sub: any) => {
    setTotal(total + sub);
  };
  const addHandlerPrev = (sub: any) => {
    if (total <= 0) {
      setTotal(0);
    } else {
      setTotal(total - sub);
    }
  };

  const clickHandlerNext = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    const nextTotal = detail.price * nextCount;
    setTotal(nextTotal);
    addHandlerNext(detail.price);
  };

  const clickHandlerPrev = () => {
    const prevCount = count - 1;
    if (prevCount <= 0) {
      setCount(0);
    } else {
      setCount(prevCount);
    }
    const prevTotal = detail.price * count;
    setTotal(prevTotal);
    addHandlerPrev(detail.price);
  };
  // 数量変更【終わり】


  // カートへ追加【始まり】
  const carts = {
    userId: Number(userId),
    itemId: detail.id,
    imageUrl: detail.imageUrl,
    name: detail.name,
    flavor: flavor,
    price: detail.price,
    countity: count,
  };
  // カートへ追加【終わり】

  // ローカルストレージへ追加【始まり】
  const cartsForStrage = {
    userId: 0,
    itemId: detail.id,
    imageUrl: detail.imageUrl,
    name: detail.name,
    flavor: flavor,
    price: detail.price,
    countity: count,
  };
  // ローカルストレージへ追加【終わり】


  // cookie取得【始まり】
  useEffect(() => {
    const user = document.cookie;
    const userId = user.slice(3);
    setUserId(userId);
  }, []);
  // cookie取得【終わり】


  // localstrageへ保存【始まり】
  useEffect(() => {
    if (!document.cookie) {
      localStorage.setItem(carts.itemId, JSON.stringify(cartsForStrage));
    }
  }, [count]);
  // localstrageへ保存【終わり】


  const handler = (event: any) => {
    if (count === 0) {
      return
      // 数量0の場合はカートへ入れない
    } else {
      event.preventDefault();
      fetch(`${process.env.NEXT_PUBLIC_PROTEIN_DATA}/carts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carts),
      })

        .then(() => {
          // if (document.cookie !== '') 
          {
            router.push('/cart');
            // } else {
            //   alert('カートに追加するにはログインが必要です');
            //   router.push('/');
            // 
          }
        });
    }
  };


  //サブスクリプション
  const Subscription = (event: any) => {

    const SubscriptionCart = {
      userId: Number(userId),
      itemId: detail.id,
      imageUrl: detail.imageUrl,
      name: detail.name,
      flavor: flavor,
      price: detail.price,
      countity: count,
    };
    if (count === 0) {
      // 数量0の場合はカートへ入れない
    } else {
    fetch(
      `${process.env.NEXT_PUBLIC_PROTEIN}/api/subscriptionCart/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SubscriptionCart),
      }
    ).then(() => {
      router.push(`/items/subscription`);
    });
  }
};

  return (
    <>
      <Header />
      <hr className={styles.hr}></hr>
      <div className={styles.detail_page}>
        <div>
          <Image
            priority
            className={styles.detail_img}
            src={detail.imageUrl}
            alt="商品画像"
            width={450}
            height={450}
          />
        </div>

        <div className={styles.details}>
          <div className={styles.detail_title}>
            <h4>{detail.name}</h4>
          </div>
          <div className={styles.explain}>
            <p className={styles.explain_title}>商品説明</p>
            <p className={styles.explain_text}>
              {detail.description}
            </p>
          </div>
          <div className={styles.ingredient}>
            <p className={styles.ingredient_title}>成分</p>
            <p className={styles.ingredient_text}>{detail.content}</p>
          </div>

          <div className={styles.flavor}>
            <p className={styles.flavor_title}>フレーバー</p>
            <select
              className={styles.select}
              onChange={(e) => setFlavor(e.target.value)}
            >
              <option>{detail.flavor[0]}</option>
              <option>{detail.flavor[1]}</option>
              <option>{detail.flavor[2]}</option>
              <option>{detail.flavor[3]}</option>
              <option>{detail.flavor[4]}</option>
            </select>
          </div>
          <div className={styles.quantity}>
            <p className={styles.quantity_title}>数量</p>
            <button
              className={styles.plus}
              type="button"
              onClick={clickHandlerNext}
            >
              +
            </button>
            <p>&nbsp;{count}&nbsp;</p>
            <button
              className={styles.minus}
              type="button"
              onClick={clickHandlerPrev}
            >
              -
            </button>
            <p>&nbsp;個&nbsp;</p>
          </div>
          <div className={styles.total}>
            <p className={styles.total_title}>合計金額</p>
            <p>¥{total.toLocaleString()}</p>
          </div>
          <div>
            <button
              onClick={Subscription}
              className={styles.button05}
            >
              <a>今すぐ定期購入を開始</a>
            </button>
          </div>
          <div className={styles.cart}>
            <button className={styles.cart_button} onClick={handler}>
              カートに追加
            </button>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <h1>RAKUTEIN</h1>
      </footer>
    </>
  );
};

export default ItemDetail;
