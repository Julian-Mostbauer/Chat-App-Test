import { ChatData } from "./ChatData";
export function DummyHistory() {
  return new ChatData("0", "ERROR - LOADING CHAT NOT POSSIBLE", [], []);
}
