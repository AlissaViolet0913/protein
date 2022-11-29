import Head from 'next/head';
import ItemData from '../../components/itemData';
import styles from '../../styles/purchase.module.css';
import { GetServerSideProps } from "next";
import Header from '../layout/header';


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = req.cookies;
  console.log(cookies.id)
  const res = await fetch(`http://localhost:8000/users?id=${cookies.id}`);
  const users = await res.json();
  const user = users[0];
  console.log(user)
  return {
    props: { user }
  };
};

export default function PurchaseDisplay({user}:{user:any}) {
  return (
    <div className={styles.container}>
      <Header />
      <Head>
        <title>ご注文内容確認</title>
      </Head>
      <ItemData user={user} />
    </div>
  );
}
