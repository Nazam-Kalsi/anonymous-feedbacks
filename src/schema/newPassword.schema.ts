import {z} from 'zod'

export const passwordSchema = z.object({
    newPassword: z.string().min(8,{
        message:'Password must be at least 8 characters long'
    }),
    confirmPassword: z.string().min(8,{
        message:'Password must be at least 8 characters long'
    })
})