import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import{updateUser} from "../services/users.ts";
export default async ({params,request,response}:{params:any;request:Request;response:Response})=>{
    const userId = params.id

    if (!userId) {
        response.status = 400;
        response.body = { msg: "无效的用户 ID" };
        return;
    }
    if (!request.hasBody) {
        response.status = 400;
        response.body = { msg: "用户数据无效" };
        return;
    }

    const {
        value:{name,role,isAdmin}
    }=await request.body()

    await updateUser(userId,{name,role,isAdmin})
    response.body = {msg:"更新成功"}
}
