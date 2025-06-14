import { Github, Twitter } from "lucide-react";
export function Header() {
  return (
    <div className="flex absolute items-center justify-between w-full">
      <h1 className=" text-2xl text-white mt-5">keyStone</h1>
      <div className="flex items-center gap-4">
        <a
          target="_blank"
          href="https://github.com/PriyanshuProgrammer/wallet-generate/"
        >
          <Github className="cursor-pointer" color="white" size={"1rem"} />
        </a>
        <a target="_blank" href="https://x.com/PriyanshuV_code">
          <Twitter className="cursor-pointer" color="white" size={"1rem"} />
        </a>
      </div>
    </div>
  );
}
