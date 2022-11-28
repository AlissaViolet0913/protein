import Image from 'next/image';
import Link from 'next/link';
import { NextPage } from 'next';
import styles from '../../styles/item_detail.module.css';
import { GetStaticPaths, GetStaticProps,GetStaticPropsContext } from 'next';
import React, { useState } from 'react';

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`http://localhost:8000/items/`);
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

export const getStaticProps: GetStaticProps = async ({params}: GetStaticPropsContext) => {
  const res = await fetch(`http://localhost:8000/items/${params!.id}`);
  const detail = await res.json();

  return {
    props: { detail },
    revalidate: 10,
  };
};

// detail getStaticPropsから取得
const ItemDetail: NextPage = ({ detail,clickHandler,count,total }: any) => {
  return (
    <>
      <div className={styles.detail_page}>
        <div>
          <Image
            className={styles.detail_img}
            src={detail.imageUrl}
            alt="商品画像"
            width={300}
            height={300}
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
            <p className={styles.ingredient_text}>
              {detail.content}
            </p>
          </div>
          <div className={styles.flavor}>
            <p className={styles.flavor_title}>フレーバー</p>
            <select className={styles.select}>
              <option>{detail.flavor[0]}</option>
              <option>{detail.flavor[1]}</option>
              <option>{detail.flavor[2]}</option>
            </select>
          </div>
          <div className={styles.quantity}>
            <p className={styles.quantity_title}>数量</p>
            <button type="button" onClick={clickHandler}>
              +
             </button>
             <p>&nbsp;{count}個&nbsp;</p>
          </div>
          <div className={styles.total}>
            <p className={styles.total_title}>合計金額</p>
            <p>{total}円</p>
          </div>
          <div className={styles.cart}>
            <button className={styles.cart_button}>
              カートに追加
            </button>
            <div>
              <p>
                お気に入り登録<span>☆</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetail;