import { IncomingMessage } from "http";


export default async function Handler(req:IncomingMessage & {
  cookies: Partial<{
      [key: string]: string;
  }>;
},res:any) {
  const cookies = req.cookies;
  console.log(`cookie:${cookies.id}`)
  const r = await fetch(
    `http://localhost:8000/carts?userId=${cookies.id}`
  );
  const carts = await r.json();
  // const cart = carts[0];
  console.log(`carts${carts}`)

  const purchaseHistories = {
    userId : cookies.id,
    items:carts
  }
  await fetch(
    `http://localhost:8000/purchaseHistories`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( purchaseHistories),
    }
  ).then(() => res.redirect('/purchase/purchased'));
};

//stripe cliをインストールをインストール