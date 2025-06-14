import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
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
import { getMnemonic, getSeed } from "@/lib/createwallet";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { useSetAtom } from "jotai";
import { seed } from "@/lib/store";
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "@/lib/localstorage";
import { useRouter } from "next/navigation";

export function Account() {
  const router = useRouter();
  const setSeed = useSetAtom(seed);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    const savedSeed = getItemFromLocalStorage("seed");
    if (savedSeed) {
      setSeed(savedSeed);
      router.push("/wallets");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-auto">
      <span className="p-2 mb-10 text-sm rounded-full border-1 border-zinc-500 text-white">
        <span className="px-2 py-1  font-bold rounded-full bg-[#3ABEFF] text-white">
          Created
        </span>
        &nbsp;by Priyanshu
      </span>

      <h5 className="text-4xl text-white md:text-6xl text-center">
        Minimal and efficient wallet generator for Solana
      </h5>
      <div className="flex flex-col md:flex-row justify-center items-center mt-10 gap-4">
        <Input
          type="password"
          className="w-[300px] md:w-[400px]"
          placeholder="Enter passphrase or leave empty..."
          ref={passwordRef}
        />
        <MnemonicDialog password={passwordRef.current?.value} />
      </div>
    </div>
  );
}

// dialog
function MnemonicDialog({ password }: { password?: string }) {
  //states
  const [mnemonic, setMnemonic] = useState<string>();
  const setSeed = useSetAtom(seed);
  const router = useRouter();

  // actions
  function onCreateAccount() {
    const mnemonicVal = getMnemonic();
    setMnemonic(mnemonicVal);
  }

  async function onSaveSeed() {
    if (!mnemonic) {
      toast.error("Please generate a mnemonic first");
      return;
    }
    const seed = await getSeed(mnemonic, password);
    setSeed(seed);
    setItemInLocalStorage<string>("seed", seed);
    router.push("/wallets");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={onCreateAccount}>Create Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md text-white bg-zinc-900 border-1 border-zinc-500">
        <DialogHeader>
          <DialogTitle>Your Seed Phrase</DialogTitle>
          <DialogDescription>
            Store this securely. Anyone with this phrase can access your wallet.
          </DialogDescription>
        </DialogHeader>
        {mnemonic && (
          <div className="grid grid-cols-3 gap-2 text-lg  bg-zinc-90 rounded-md">
            {mnemonic.split(" ").map((word, i) => (
              <div key={i} className="bg-zinc-800 text-center p-3 rounded-lg">
                <span>{word}</span>
              </div>
            ))}
          </div>
        )}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button onClick={onSaveSeed}>I haved saved these phrases</Button>
          </DialogClose>
          <Button
            className="flex items-center justify-center"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(mnemonic));
              toast.success("Seed phrase copied to clipboard");
            }}
          >
            <CopyIcon size={"1rem"} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
