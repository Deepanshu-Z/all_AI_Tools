import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Boxes } from "@/components/ui/background-boxes";

export default function Home() {
  const products = [
    {
      productName: "OpenAI ChatGPT",
      productDescription:
        "Advanced LLM for coding, writing, automation, and business workflows.",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/0/04/OpenAI_Logo.svg", // :contentReference[oaicite:0]{index=0}
    },
    {
      productName: "Anthropic Claude",
      productDescription:
        "Strong reasoning-focused LLM used heavily in enterprise and research.",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/4c/Claude_AI_logo.svg", // :contentReference[oaicite:1]{index=1}
    },
    {
      productName: "Google Gemini",
      productDescription:
        "Google’s multimodal AI model integrated into search, workspace and android.",
      imageUrl: "", // Gemini ka official logo koi public SVG nahi easily mil raha abhi
    },
    {
      productName: "Meta Llama",
      productDescription:
        "Open-source LLM widely used in startups, custom training, and local inference.",
      imageUrl: "", // Llama ka bhi koi consistent logo link nahi mil paaya reliable source se
    },
    {
      productName: "Microsoft Copilot",
      productDescription:
        "AI suite integrated into Windows, Office, GitHub, and cloud workflows.",
      imageUrl: "", // Copilot ki brand assets publicly distributed images limited hain
    },
    {
      productName: "GitHub Copilot",
      productDescription:
        "AI coding assistant used for autocompletion and code generation.",
      imageUrl: "", // GitHub Copilot ka specific logo link saaf stable source pe nahi mil paaya
    },
    {
      productName: "Midjourney",
      productDescription:
        "AI image generation for marketing, design, and creative work.",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/a/a4/Midjourney_Emblem_%28in-colour%29.svg", // :contentReference[oaicite:2]{index=2}
    },
    {
      productName: "Stable Diffusion",
      productDescription:
        "Open-source image generation model for custom pipelines.",
      imageUrl:
        "https://stablediffusionweb.com/image/26459060-stability-ai-s-stable-diffusion-logo", // :contentReference[oaicite:3]{index=3}
    },
    {
      productName: "Hugging Face",
      productDescription:
        "Platform offering ML models, datasets, and inference APIs.",
      imageUrl:
        "https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/logo.svg", // :contentReference[oaicite:4]{index=4}
    },
    {
      productName: "ElevenLabs",
      productDescription: "Best-in-class AI voice generation + text-to-speech.",
      imageUrl: "", // ElevenLabs ka official logo public vector link mujhe abhi nahi mila
    },
    {
      productName: "Perplexity AI",
      productDescription: "AI search engine for research-grade answers.",
      imageUrl: "", // Perplexity ki branding mein publicly accessible simple logo link limited hai
    },
    {
      productName: "Notion AI",
      productDescription:
        "Productivity assistant for writing, wiki creation, and team workflows.",
      imageUrl: "", // Notion ka generic Notion logo use hota hai, AI-specific nahi alag logo mil paaya nahi
    },
    {
      productName: "Replit AI",
      productDescription:
        "AI for building and deploying code quickly in the cloud.",
      imageUrl: "", // Replit AI ka koi official distinct logo link mujhe abhi nahi mila
    },
    {
      productName: "Figma AI",
      productDescription: "AI design assistance for UI/UX workflows.",
      imageUrl: "", // Figma ka AI-product ke liye separate logo widely available nahi hai
    },
  ];

  return (
    <div className=" flex flex-col gap-10 min-h-screen w-full items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="h-screen w-full flex items-center justify-center bg-slate-900 relative overflow-hidden">
        {/* MASK LAYER */}
        <div className="absolute inset-0 bg-slate-900 z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        {/* ANIMATION BACKGROUND */}
        <Boxes />

        {/* CONTENT */}
        <div className="relative z-20 flex flex-col items-center px-4">
          <h1 className="text-xl md:text-4xl text-white font-bold">AIOneHub</h1>

          <p className="text-center mt-2 text-neutral-300">
            Every AI tool bundled for your workflow.
          </p>
        </div>
      </div>

      <div className=" w-full grid grid-cols-3 justify-center gap-4">
        {products.map((product, key) => (
          /* FIX 2:
            - Removed 'w-full'.
            - Kept 'max-w-sm' (this is a good max width).
            - Added 'flex-grow' (so it can grow) and 'flex-basis-[350px]' 
              (so it has a base size, forcing it to wrap).
          */
          <div key={key} className="max-w-sm flex-grow flex-basis-[350px]">
            <Card>
              <CardHeader>
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="w-full h-40 object-cover rounded-md"
                />

                <CardTitle>{product.productName}</CardTitle>
                <CardDescription>{product.productDescription}</CardDescription>
              </CardHeader>

              <CardContent>
                <Button className="w-full">View More</Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
