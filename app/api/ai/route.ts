import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openrouter/sherlock-think-alpha",
      messages: [
        {
          role: "user",
          content: body.query,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  const message = response.data.choices[0].message.content;
  return Response.json(message);
}
