import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    model,
    messages,
    webSearch
  }: {
    messages: UIMessage[];
    model: string;
    webSearch?: boolean;
  } = await req.json();

  // Xác định provider nếu là Gemini
  let selectedModel: any = model;
  if (model.startsWith('gemini')) {
    selectedModel = google(model); // Dùng provider google cho Gemini
  }

  // Nếu webSearch bật thì chuyển sang Perplexity
  if (webSearch) {
    selectedModel = 'perplexity/sonar';
  }

  const result = streamText({
    model: selectedModel,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}