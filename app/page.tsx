"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-2">
      <button
        onClick={() => {
          router.push(`/insta-frame`);
        }}
        className="bg-blue-500 text-white p-2 rounded-md pointer"
      >
        인스타 프레임 만들기
      </button>

      <button
        onClick={() => {
          router.push(`/celebration-frame`);
        }}
        className="bg-blue-500 text-white p-2 rounded-md pointer"
      >
        축전 만들기
      </button>
    </main>
  );
}
