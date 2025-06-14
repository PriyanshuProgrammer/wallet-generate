export type wallet = {
  publickey: string;
  privatekey: string;
};
export type wallets = Array<wallet>;
type keys = "wallets" | "seed";

export function setItemInLocalStorage<T extends string | wallets>(
  key: keys,
  item: T,
) {
  localStorage.setItem(key, JSON.stringify(item));
}

export function getItemFromLocalStorage(key: keys) {
  return localStorage.getItem(key);
}
