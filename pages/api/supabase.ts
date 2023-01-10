import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabase';
import category from '../items/index';


const getAirportAPI = async (_req: NextApiRequest, res: NextApiResponse) => {

  const { data, error } = await supabase.from('items').select("*");
  let  data2 = await supabase.from('items').select("*").eq("category",category);
  // 401 Unauthorized、認証が必要
  if (error) return res.status(401).json({ error: error.message });
  // 200番台は、処理が成功して正常にレスポンスができている状態
  if(category){
    return res.status(200).json(data2);
  }else{
  return res.status(200).json(data);
}
};


export default getAirportAPI;
