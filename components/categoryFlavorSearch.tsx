import useSWR from 'swr';
import styles from 'styles/items_index.module.css';
import { useState, useEffect, ChangeEvent } from 'react';
import { Users, User, Item } from '../types/type';
import React from 'react';

export default function CategoryFlavorSearch({
  flavor,
  flavorHandler,
}: {
  flavor: string;
  flavorHandler: React.ChangeEventHandler<HTMLSelectElement>;
}) {
  // useStateで取得データを表示する

  return (
    <div className={styles.cp_ipselect}>
      <select
        className={styles.category1}
        onChange={flavorHandler}
        value={flavor}
      >
        <option value="" hidden>
          フレーバー
        </option>
        <option value="">選択してください</option>
        <option value="チョコ">チョコ</option>
        <option value="バニラ">バニラ</option>
        <option value="抹茶">抹茶</option>
        <option value="バナナ">バナナ</option>
        <option value="ミルクティー">ミルクティー</option>
        <option value="ストロベリー">ストロベリー</option>
        <option value="ココナッツ">ココナッツ</option>
        <option value="ヨーグルト-ストロベリー-">
          ヨーグルト-ストロベリー-
        </option>
        <option value="ノンフレーバー">ノンフレーバー</option>
        <option value="バナナ＆シナモン">バナナ＆シナモン</option>
        <option value="ピーチティー">ピーチティー</option>
        <option value="オレンジ">オレンジ</option>
        <option value="パイナップル">パイナップル</option>
        <option value="アイスレモンティー">アイスレモンティー</option>
        <option value="マスカット">マスカット</option>
        <option value="アイスラテ">アイスラテ</option>
        <option value="黒糖ミルクティー">黒糖ミルクティー</option>
        <option value="アップル">アップル</option>
        <option value="ラズベリーレモネード">
          ラズベリーレモネード
        </option>
        <option value="キャラメル">キャラメル</option>
        <option value="ミルクチョコレート">ミルクチョコレート</option>
        <option value="北海道ミルク">北海道ミルク</option>
        <option value="チョコレートスムーズ">
          チョコレートスムーズ
        </option>
        <option value="ストロベリークリーム">
          ストロベリークリーム
        </option>
        <option value="ベリーチェリー">ベリーチェリー</option>
        <option value="バブルガム">バブルガム</option>
      </select>
    </div>
  );
}
