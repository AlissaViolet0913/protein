import useSWR from 'swr';
import Link from 'next/link';
import styles from '../styles/items_index.module.css';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import ItemDisplay from '../pages/items';
import { Users,Users2,Users3,User,Item } from './../types/type';
import React from 'react';

// const fetcher = (resource: any, init: any) =>
//   fetch(resource, init).then((res) => res.json());

export default function Searching({ handleSearch, inputref }: {handleSearch:any, inputref:any}) {
  // const [items, setItems] = useState('');
  // itemの表示が変われば再レンダリングされる
  // const [searchQuery, setSearchQuery] = useState([]);
  // searchQuery フィルターした後の情報を格納する
  // const ref = useRef();

  // const { data, error } = useSWR(
  //   `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/items`,
  //   fetcher
  // );
  // if (error) return <div>Failed to Load</div>;
  // if (!data) return <div>Loading...</div>;

  // const handleSearch = () => {
  //   // フィルタリング機能
  //   // toLowerCaseはすべて小文字になおす
  //   setSearchQuery(
  //     data.filter((item: any) =>
  //       item.name.toLowerCase().includes(ref.current.value)
  //     )
  //   );
  // };

  // APIをたたくのは、ページがマウントされた1回だけでいいからuseEffect。
  // 第2引数を空の[]にすることで、｛｝が使えるようになる
  // useEffect(() => {
  //   fetch(
  //     `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/items/${item.name}`
  //   )
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => setItems(data));
  // }, []);

  return (
    <>
      <form method="get" action="#" className={styles.search_box}>
        <input
          type="text"
          placeholder="検索ワード"
          ref={inputref}
          onChange={() => handleSearch()}
        />
      </form>

      {/* <div className={styles.side}>
        {searchQuery.map((item: any) => {
          const MAX_LENGTH = 25;
          let modStr = '';
          if (item.description.length > MAX_LENGTH) {
            modStr = item.description.substr(0, MAX_LENGTH) + '...';
          }

          return (
            <div key={item.id} className={styles.items_list1}>
              <div className={styles.itemsImg}>
                <Image
                  priority
                  src={item.imageUrl}
                  alt="商品画像"
                  width={260}
                  height={260}
                  className={styles.imgPro}
                />
              </div>

              <div className={styles.ul}>
                <Link
                  href={`./items/${encodeURIComponent(item.id)}`}
                  className={styles.a}
                >
                  <p className={styles.itemA}>{item.name}</p>
                </Link>
                <p className={styles.itemB}>
                  価格 &nbsp;¥{item.price.toLocaleString()}
                </p>
                <p className={styles.item}>{modStr}</p>
              </div>
            </div>
          );
        })}
      </div> */}
    </>
  );
}
