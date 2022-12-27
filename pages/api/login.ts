import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.body['email'];
  const password = req.body['password'];

  const { data, error }: { data: any; error: any } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password);

  const user = data[0];
  console.log(data[0]);
  const id = user.id;
  res.setHeader('Set-Cookie', [
    `id=${id}; max-age=86400; path=/`,
    // max-age保持させる期限
  ]);
  res.status(200).json(data);
}

// API Routesについて調べる
