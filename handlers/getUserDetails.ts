import { Response, RouteParams } from "https://deno.land/x/oak/mod.ts";
import {getUser} from "../services/users.ts";

export default async ({
   params,
   response
}:{
    params:RouteParams;
    response: Response
})=>{
    const userId=params.id;
    if(!userId){
        response.status=400;
        response.body={msg:"无效的用户 ID"}
        return
    }
    const foundUser=await getUser(userId)
    if(!foundUser){
        response.status=404
        response.body={msg:`用户 ${userId} 不存在`}
        return
    }
    response.body=foundUser
}
