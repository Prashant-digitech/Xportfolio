import { NextRequest, NextResponse } from "next/server";
import { ai, checkAIHealth } from "@/ai";

export const dynamic = "force-static";

export async function GET() {
  const health = await checkAIHealth();
  return NextResponse.json(health);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action = "generateText", prompt, messages, system, temperature, maxTokens, tools, mode } = body;

    if (mode === "json") {
      const jsonRes = await ai.generateJSON({
        prompt,
        messages,
        system,
        temperature,
        maxTokens,
      });
      return NextResponse.json(jsonRes);
    }

    if (action === "streamText") {
      const encoder = new TextEncoder();
      const customReadable = new ReadableStream({
        async start(controller) {
          await ai.streamText({
            prompt,
            messages,
            system,
            temperature,
            maxTokens,
            onChunk: (chunk, model) => {
              const data = JSON.stringify({ chunk, model });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            },
          });
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        },
      });

      return new NextResponse(customReadable, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // Default generateText
    const result = await ai.generateText({
      prompt,
      messages,
      system,
      temperature,
      maxTokens,
      tools,
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: (err as Error).message || "Internal server error processing AI request",
      },
      { status: 500 }
    );
  }
}
