"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-evenly p-2 bg-[url('/images/heroImage.webp')] min-h-screen w-full bg-cover bg-fill bg-center bg-no-repeat md:p-24">
      <div className="rounded overflow-hidden shadow-lg bg-white px-12 py-36 md:px-24">
        <div className="flex flex-col h-75 items-center md:flex-row">
          <div className="px-6 py-4 flex flex-col justify-evenly w-full md:w-4/6 ">
            <div className="font-bold text-2xl mb-2 md:text-4xl">Welcome</div>
            <p className="text-gray-700 text-base md:text-2xl">
              YTCG Builder has it all, from building decks to having discussions
            </p>
          </div>
          <div className="px-6 py-4 flex flex-col gap-2 border-t border-gray-400 w-full md:w-2/6 md:border-l md:border-t-0">
            <p className="text-gray-700 text-base md:text-2xl">Will you be:</p>
            <button
              onClick={() => router.push("/login")}
              className="bg-neutral-900 text-white p-3 rounded"
            >
              Building a Deck
            </button>
            <p className="font-bold text-center">OR</p>
            <button
              onClick={() => router.push("/cards")}
              className="bg-zinc-200 p-3 rounded"
            >
              Looking at Cards
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
