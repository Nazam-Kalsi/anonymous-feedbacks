import ApiRes from "@/lib/apiRes";
import { handler } from "@/lib/handler";
import { NextRequest } from "next/server";
import { google } from '@ai-sdk/google';
import { generateText, LanguageModelV1 } from 'ai';


export const maxDuration = 30;

async function aiSuggestions(req: NextRequest) {
  const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

  const { response } = await generateText({
    model: google('gemini-1.5-pro-latest') as LanguageModelV1,
    prompt: prompt,
  });
  

  return ApiRes(200,'yeat',response.messages[0].content[0]);
}

export const GET = handler(aiSuggestions);
