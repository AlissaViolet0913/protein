import Link from 'next/link';
import styles from '../styles/items_index.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { Users, Users2, Users3, User, Item } from '../types/type';
import React from 'react';

// const fetcher = (resource: any, init: any) =>
//   fetch(resource, init).then((res) => res.json());

export default function ItemDisplayNew({
  data,
  searchQuery,
}: {
  data: any;
  searchQuery: any;
}) {
  // const { data, error } = useSWR('/api/items', fetcher);
  // if (error) return <div>Failed to Load</div>;
  // if (!data) return <div>Loading...</div>;
  return (
    <>
      <div className={styles.side}>
        {data.map((item: Item) => {
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
      </div>
    </>
  );
}
