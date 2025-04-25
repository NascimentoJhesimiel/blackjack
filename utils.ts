import { ICard } from "./types";
import promptSync from "prompt-sync";
const prompt = promptSync();

export function getDecision(): "hit" | "stay" {
  while(true){
    const decision = prompt("Sua jogada: (Hit/Stay): ").toLowerCase();

    if (decision === "hit" || decision === "stay") 
      return decision
      console.log(" ")
  }
}

export function getHandValue(cards: ICard[]): number {
  // returns the numeric value of a hand
  let value = 0;
  let aces = 0;

  for(const card of cards) {
    if (card.value === 1) {
      aces++
      continue
    }

    value += Math.min(card.value, 10)
  }

  if (aces === 0) return value
  if (value >= 11) return value + aces
  return value + 11 + (aces - 1)
}

export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function getBet(balance: number): number {
  // returns the bet the player is making
  while (true) {
    
    const bet = prompt("Aposte algum valor: ");
    try {
      const numBet = Number(bet);

      if (numBet > 0 && numBet <= balance) {
        return numBet;
      }
      console.log("Aposta inválida.")
    } catch {
      console.log("Insira um número inválido");
    }
    console.log("   ");
  }
}

export function getStrHand(hand: ICard[], hideSecondCard: boolean = false): string {
  let str = "";

  for (const [idx, card] of hand.entries()) {
    if (idx !== 0) str += ", "
    if (idx === 1 && hideSecondCard) {
      str += "[hidden]"
      break
    }
    str += `${card.getName()}${card.suit}`
  }
  
  return str
}
