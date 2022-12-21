import Head from 'next/head';
import ItemData from '../../components/itemData';
import styles from '../../styles/purchase.module.css';
import { GetServerSideProps } from 'next';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { Item, User } from '../../types/type';

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  const cookies = req.cookies;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/users?id=${cookies.id}`
  );
  const users = await res.json();
  const user = users[0];

  const resCarts = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/carts?userId=${cookies.id}`
  );
  const carts = await resCarts.json();

  return {
    props: {
      user: user,
      carts: carts,
    },
  };
};

export default function PurchaseDisplay({
  user,
  carts,
}: {
  user: User;
  carts: Item;
}) {
  // const {user,carts} = props

  return (
    <>
      <div className={styles.container}>
        <Header />

        <Head>
          <title>ご注文内容確認</title>
          <meta name="turbolinks-visit-control" />
        </Head>
        <ItemData user={user} carts={carts} />
      </div>
      <Footer />
    </>
  );
}
