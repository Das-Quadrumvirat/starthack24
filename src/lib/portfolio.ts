import type { Portfolio, PortfolioEntry } from "../ambient";

import { writable, get, derived } from 'svelte/store';
import { browser } from '$app/environment';

function createPortfolioStore() {
  const { subscribe, set, update } = writable(getInitialPortfolio());

  function getInitialPortfolio() {
    if (!browser) return [];
    const portfolio = localStorage.getItem('portfolio');
    return portfolio ? JSON.parse(portfolio) : [];
  }

  function savePortfolio(portfolio:Portfolio) {
    if (!browser) return;
    portfolio = portfolio.filter((entry) => entry.amount > 0);
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }

  return {
    subscribe,
    set: (portfolio: Portfolio) => {
      savePortfolio(portfolio);
      set(portfolio);
    },
    update: (callback) => {
      update((currentPortfolio) => {
        const newPortfolio = callback(currentPortfolio);
        savePortfolio(newPortfolio);
        return newPortfolio;
      });
    },
  };
}

export const portfolio = createPortfolioStore();

export function getPortfolioEntry(isin: string) {
  return derived(portfolio, pf => pf.find((entry: PortfolioEntry) => entry.id === isin) || { id: isin, amount: 0 });
}

export function tradeAssets(id: string, deltaAmount: number) {
  if (isNaN(deltaAmount) || deltaAmount === 0) return;
  let pf = get(portfolio);
	let entry = pf.find((entry: PortfolioEntry) => entry.id === id);
	if (entry) {
		entry.amount += deltaAmount;
	} else {
		entry = { id, amount: deltaAmount };
		pf.push(entry);
	}

	portfolio.set(pf);
}
