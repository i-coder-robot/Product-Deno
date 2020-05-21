import {Request, Response} from "https://deno.land/x/oak/mod.ts";
import {createUser} from "../services/users.ts";

export default async ({request, response}: { request: Request; response: Response; }) => {
    if (!request.hasBody) {
        response.status = 400;
        response.body = {msg: "无效的数据"};
        return;
    }
    const d = await request.body()
    const data = JSON.parse(d.value)
    const {name, role, isAdmin} = data

    if (!name || !role) {
        response.status = 422;
        response.body = {msg: "名称和角色是必填字段"};
        return;
    }
    const userId = await createUser({name, role, isAdmin})
    response.body = {msg: "用户创建成功", userId}
}
