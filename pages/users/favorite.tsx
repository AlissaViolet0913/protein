import Image from 'next/image';
import styles from '../../styles/detail_user.module.css';
import Link from 'next/link';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { Favorite, Item } from '../../types/type';

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  const cookies = req.cookies;

  let favs;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/favorites?userId=${cookies.id}`
  );
  favs = await res.json();

  const itemsArray = favs.map((fav: Item) => {
    return `id=${fav.itemId}`;
  });
  // console.log(favs);
  const Array = itemsArray.join('&');
  // console.log(Array);

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/items?${Array}`
  );
  // console.log(data);

  const itemsArray2 = await data.json();
  //空の配列を作るために存在しないid=0を指定した。
  const data2 = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/items?id=0`
  );

  const itemsArray3 = await data2.json();

  let itemsArray4 = '';
  if (Array) {
    itemsArray4 = itemsArray2;
  } else {
    itemsArray4 = itemsArray3;
  }

  return {
    props: { itemsArray4, favs },
  };
};

export default function FavoriteList({ itemsArray4 }: Favorite) {
  const router = useRouter();
  // お気に入り情報の削除
  function deleteItem(favoriteItem: Favorite) {
    fetch(
      `/api/favorites/${favoriteItem.id}`,
      {
        method: 'DELETE',
      }
    );
    router.reload();
  }

  return (
    <>
      <Header />

      <div className={styles.main}>
        <section className={styles.element}>
          <h2 className={styles.title_favorite} id="user_favorites">
            お気に入りリスト
          </h2>

          {itemsArray4.map((favoriteItem: any) => {
            return (
              <div key={favoriteItem.id}>
                <br />
                <div>
                  <div className={styles.list}>
                    <Image
                      priority
                      src={favoriteItem.imageUrl}
                      width={260}
                      height={260}
                      alt="商品画像"
                      className={styles.img}
                    />
                    <div className={styles.itemDetail}>
                      <Link
                        href={`../items/${encodeURIComponent(
                          favoriteItem.id
                        )}`}
                        className={styles.a}
                      >
                        <div className={styles.itemA}>
                          {favoriteItem.name}
                        </div>
                      </Link>

                      <div>
                        価格 &nbsp;&nbsp;&nbsp;&nbsp; ¥
                        <span className={styles.style}>
                          &nbsp;{favoriteItem.price.toLocaleString()}
                          &nbsp;
                        </span>
                      </div>
                      <div className={styles.rightSide}>
                        <button
                          className={styles.delete_button}
                          onClick={() => deleteItem(favoriteItem)}
                        >
                          <a>削除</a>
                        </button>
                      </div>
                    </div>
                  </div>
                  <br />
                  <hr />
                </div>
              </div>
            );
          })}
        </section>
      </div>
      <Footer />
    </>
  );
}
