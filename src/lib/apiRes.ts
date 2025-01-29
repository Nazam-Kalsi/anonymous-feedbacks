import { NextResponse } from "next/server";

export default function ApiRes(statusCode:number,message:string,data?:any){
    return NextResponse.json(
        {success:statusCode<202,message,data},
        {status:statusCode}
    )
}