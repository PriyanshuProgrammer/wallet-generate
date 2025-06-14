"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getWallet } from "@/lib/createwallet";
import { seed } from "@/lib/store";
import { useAtomValue } from "jotai";
import { toast } from "sonner";
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
  wallet,
} from "@/lib/localstorage";
import { type wallets } from "@/lib/localstorage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  //states
  const [activeIndex, setActiveIndex] = useState(0);
  const [count, setCount] = useState(0);
  const seedValue = useAtomValue(seed);
  const [wallets, setWallets] = useState<wallets>([]);

  // hooks
  const router = useRouter();

  // actions
  function onAddWallet() {
    if (!seedValue) {
      toast.error("Seed is not set");
      return;
    }
    setCount((prev) => prev + 1);
    const wallet = getWallet(seedValue, count);
    setWallets((prev) => [...prev, wallet] as wallets);
    setItemInLocalStorage("wallets", [...wallets, wallet] as wallets);
  }

  function onDeleteAccount() {
    localStorage.removeItem("wallets");
    localStorage.removeItem("seed");
    router.push("/");
  }

  useEffect(() => {
    if (!seedValue) {
      router.push("/");
    }
    if (count === 0) {
      const storedWallets = JSON.parse(
        getItemFromLocalStorage("wallets") ?? "[]",
      );
      setCount(storedWallets.length);
      setWallets(storedWallets);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col  justify-center max-h-screen">
        <h1 className="text-5xl font-bold text-center text-white mt-8 ">
          Generate Wallets
        </h1>
        <div className="flex w-full gap-2 justify-center mb-4 border-b border-zinc-700 mt-8 pb-8">
          <Button onClick={onAddWallet} className="flex items-center gap-2 ">
            <PlusIcon size={"1rem"} />
            Add Wallet
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 ">
                <TrashIcon color="red" size={"1rem"} />
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md text-white bg-zinc-900 border-1 border-zinc-500">
              <DialogHeader>
                <DialogTitle>Warning!!!</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete your account? This action will
                  remove all your wallets and seed phrase. This action cannot be
                  undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button className="flex items-center justify-center">
                    Close
                  </Button>
                </DialogClose>
                <Button onClick={onDeleteAccount}>Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Wallets ({count})
        </h1>
        <div className="flex flex-col pr-2 items-center overflow-y-auto overflow-x-hidden w-full">
          <Accordion
            type="single"
            value={`item-${activeIndex}`}
            collapsible
            className="w-full"
          >
            {wallets.length > 0
              ? wallets.map((wallet, index) => (
                  <Wallet
                    key={index}
                    wallet={wallet}
                    setActiveIndex={setActiveIndex}
                    index={index + 1}
                  />
                ))
              : ""}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

function Wallet({
  index,
  setActiveIndex,
  wallet,
}: {
  index: number;
  wallet: wallet;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <AccordionItem
      onClick={() => setActiveIndex((prev) => (prev === index ? 0 : index))}
      value={`item-${index}`}
      className="rounded-lg border-none bg-zinc-800 mb-2 p-4"
    >
      <AccordionTrigger className="text-white">Wallet {index}</AccordionTrigger>
      <AccordionContent className="flex text-white flex-col gap-4 text-balance">
        <div className="flex gap-2 px-10 justify-between items-center">
          <span className="text-sm break-all">
            Public Key: {wallet.publickey}
          </span>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(wallet.publickey.toString());
              toast.success("Public Key copied to clipboard");
            }}
            className="flex items-center gap-2"
          >
            Copy
            <CopyIcon size={"1rem"} />
          </Button>
        </div>
        <div className="flex justify-between px-10 items-center">
          <span className="text-sm">
            Private Key: never share your private key at any cost
          </span>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(wallet.privatekey.toString());
              toast.success("Private Key copied to clipboard");
            }}
            className="flex items-center gap-2"
          >
            Copy
            <CopyIcon size={"1rem"} />
          </Button>{" "}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
