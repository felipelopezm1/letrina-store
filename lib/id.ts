import { customAlphabet } from "nanoid";

const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 10);

export function createPurchaseId() {
  return `ltrn_${nanoid()}`;
}
