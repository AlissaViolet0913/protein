import useSWR from 'swr';
import styles from 'styles/items_index.module.css';
import { useState, useEffect, ChangeEvent } from 'react';
import { setTokenSourceMapRange } from 'typescript';
import React from 'react';


export default function CategoryTypeSearch({
  category,
  categoryHandler,
}: {
  category: string;
  categoryHandler: React.ChangeEventHandler<HTMLSelectElement>;
}) {
  // useStateで取得データを表示する

  return (
    <div className={styles.cp_ipselect}>
      <select
        className={styles.category1}
        onChange={categoryHandler}
        value={category}
        required
      >
        <option value="" hidden>
          種類
        </option>
        <option value="">選択してください</option>
        <option value="whey">ホエイプロテイン</option>
        <option value="casein">カゼインプロテイン</option>
      </select>
      <span className={styles.category1_highlight}></span>
      <span className={styles.category1_selectbar}></span>
    </div>
  );
}
