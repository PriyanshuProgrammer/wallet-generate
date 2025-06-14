"use client";
import { Account } from "@/components/ui/account";
import { Header } from "@/components/ui/header";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-zinc-900">
      <div className="w-[90%] relative md:w-[60%] flex flex-col h-screen bg-zinc-900 mx-auto">
        <Header />
        <Account />
      </div>
    </div>
  );
}
