import ApiRes from "@/lib/apiRes";
import { handler } from "@/lib/handler";
import { NextRequest } from "next/server";
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

async function aiSuggestions(req: NextRequest) {
    const { messages } = await req.json();

    const result = streamText({
      model: openai('gpt-4o'),
      messages,
    });
    return ApiRes(200, "hello",result.toDataStreamResponse());
}

export const GET = handler(aiSuggestions);