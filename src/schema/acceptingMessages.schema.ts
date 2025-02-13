import {z} from 'zod';

export const isAcceptingMessagesSchema = z.object({
    acceptingMessages : z.boolean(),
})