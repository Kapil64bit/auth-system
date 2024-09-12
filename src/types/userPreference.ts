import { Document } from "mongoose"
import { IUserDocument } from "./User"
import { ICategoryDocument } from "./Category"

export interface IUserpref {
    userId:IUserDocument | string | null,
    state:[string],
    category:[string],
    bidAmount:{
        min:number,
        max:number
      },
    others:string
}


export interface IUserprefDocument extends IUserpref, Document{}