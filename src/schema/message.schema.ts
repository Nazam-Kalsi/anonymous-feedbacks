import {z} from 'zod';

export const messageSchema=z.object({
    content:z.string().min(3,{message:'massage must be atleast of 3 characters'})
})