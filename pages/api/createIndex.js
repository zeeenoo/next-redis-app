//create another api route called 
import { createIndex } from "../../lib/redis";

export default async function handler(req,res){
    const index = await createIndex()
    res.status(200).json({index})
}




