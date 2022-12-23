import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req: any, res: any) => {
  // console.log(req.path)
  const dataRes = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/items?flavor_like=&category=`
  );
  console.log(dataRes);
  const body = await dataRes.json();
  res.status(200).json(body);
};

export default handler;
