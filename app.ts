import Deck from "./deck";
import { ICard } from "./types";
import { getBet, getDecision, getHandValue, getStrHand } from "./utils";

function playerTurn(playerHand: ICard[], deck: Deck): number {
  let handValue = getHandValue(playerHand);

  while (true) {
    const action = getDecision();
    if (action !== "hit") 
      return handValue;

    playerHand.push(deck.deal(1)[0]);
    handValue = getHandValue(playerHand);
    console.log(`Sua mão: ${getStrHand(playerHand)} (Total: ${handValue})`);

    if (handValue > 21)
      return handValue;
  }
}

function dealerTurn(dealerHand: ICard[], deck: Deck): number {
  let handValue = getHandValue(dealerHand);

  while(true){
    console.log(
      `Dealer: ${getStrHand(dealerHand)} (Total: ${handValue})`
    );
    if (handValue >= 17)
      return handValue

    dealerHand.push(deck.deal(1)[0]);
    handValue = getHandValue(dealerHand);
  }
}

let dealerHand: ICard[] = [];
let playerHand: ICard[] = [];
const deck: Deck = new Deck();
let balance = 100; 

while (balance > 0) {
  console.log(`\nBalanço: $${balance}`);
  const bet = getBet(balance);
  balance -= bet;

  // Deal the cards
  deck.reset();
  playerHand = deck.deal(2);
  dealerHand = deck.deal(2);

  const playerValue = getHandValue(playerHand);
  const dealerValue = getHandValue(dealerHand);

  console.log(" ")
  console.log(`Sua mão: ${getStrHand(playerHand)} (Total: ${playerValue})`);
  console.log(`Dealer: ${getStrHand(dealerHand, true)}`);
  console.log(" ")

  if (playerValue === 21) {
    balance += bet * 2.5;
    console.log(`Blackjack! Você venceu! $${bet * 2.5}`);
    continue;
  } else if (dealerValue === 21) {
    console.log(`Banca: ${getStrHand(dealerHand)}, (Total: 21)`);
    console.log("O Dealer tem 21, você perdeu...");
    continue;
  }

  const finalPlayerValue = playerTurn(playerHand, deck);
  if (finalPlayerValue > 21) {
    console.log("Você ultrapassou 21, você perdeu...");
    continue;
  }
  const finalDealerValue = dealerTurn(dealerHand, deck);
  if (finalDealerValue > 21 || finalPlayerValue > finalDealerValue) {
    balance += bet * 2;
    console.log(`Você ganhou: $${bet * 2}`);
  }
  else if (finalDealerValue === finalPlayerValue) {
    balance += bet
    console.log("Empate.")
  } else {
    console.log("Você perdeu...")
  }
  console.log(" ")
 
}

console.log("Dinheiro Esgotado!");
