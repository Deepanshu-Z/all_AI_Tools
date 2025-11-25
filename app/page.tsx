"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppHeader from "./_components/AppHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const products = [
  {
    productName: "Text AI",
    productDescription:
      "Have a chat with our advance AI model and ask any question around.",
    imageUrl:
      "https://tse2.mm.bing.net/th/id/OIP.9aTJvg9m--4Ysldl0XNU_gHaEK?pid=Api&P=0&h=180",
    link: "/generalai",
  },
  {
    productName: "AI Video Generation",
    productDescription:
      "Generate full videos from text, audio or images with cinematic quality.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/11622/11622566.png",
    link: "http:/localhost/3000/generalai",
  },
  {
    productName: "AI Coding Assistant",
    productDescription:
      "Write, fix, refactor and generate code automatically using advanced LLMs.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/10885/10885228.png",
    link: "http:/localhost/3000/generalai",
  },
  {
    productName: "AI Voice Generation",
    productDescription:
      "Generate ultra-realistic voices for content, characters, ads and narration.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/12814/12814457.png",
    link: "http:/localhost/3000/generalai",
  },
  {
    productName: "AI Speech-to-Text",
    productDescription:
      "Convert any audio or video into accurate transcription instantly.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/12791/12791191.png",
    link: "http:/localhost/3000/generalai",
  },
  {
    productName: "AI Search Engine",
    productDescription:
      "Research anything with real-time data, citations and fast answers.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/10828/10828496.png",
    link: "http:/localhost/3000/generalai",
  },
  {
    productName: "AI Automation & Agents",
    productDescription:
      "Automate workflows, build agents and let AI complete multi-step tasks.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/12606/12606961.png",
    link: "http:/localhost/3000/generalai",
  },
  {
    productName: "AI Document Intelligence",
    productDescription:
      "Analyze large PDFs, contracts, tables and extract structured insights.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/10470/10470718.png",
    link: "http:/localhost/3000/generalai",
  },
  {
    productName: "AI Chat & Assistants",
    productDescription:
      "Conversational LLMs that help in learning, support and productivity.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/10836/10836257.png",
    link: "http:/localhost/3000/generalai",
  },
];

export default function page() {
  return (
    <div className="bg-black">
      {/* Header */}
      <AppHeader />
      {/* Hero Section */}
      <div className="h-screen relative isolate px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-2xl   ">
          <div className="hidden sm:mb-8 pt-40 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
              Announcing our next round of funding.{" "}
              <a href="#" className="font-semibold text-indigo-400">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
              All AI Tools in One Place
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Get started
              </a>
              <a href="#" className="text-sm/6 font-semibold text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
      {/* Product List */}
      <div className=" w-full grid grid-cols-3 justify-center gap-4 p-10">
        {products.map((product, key) => (
          <div key={key} className=" max-w-sm flex-grow flex-basis-[350px]">
            <Card className="bg-gray-900">
              <CardHeader>
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  height={50}
                  width={100}
                  className=" w-full h-40 object-cover rounded-md"
                />

                <CardTitle className="text-white">
                  {product.productName}
                </CardTitle>
                <CardDescription>{product.productDescription}</CardDescription>
              </CardHeader>

              <CardContent>
                <Button
                  variant={"default"}
                  className="w-full bg-indigo-500 cursor-pointer hover:bg-indigo-700"
                >
                  <Link href={product.link!}>View More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
