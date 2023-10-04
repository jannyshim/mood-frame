"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`/insta-frame`);
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        인스타 프레임 만들기
      </button>
    </main>
  );
}
