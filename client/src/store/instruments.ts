import { action, makeAutoObservable } from 'mobx';

export class Instrument {
  num = 1;
  comparedInstruments: string[] =
    localStorage
      .getItem('comparedInstruments')
      ?.split(',')
      .filter((item) => item !== '2') || [];

  constructor() {
    makeAutoObservable(this);
  }

  addComparedInstrumet = action((ticker: string) => {
    if (!this.isAlreadyAdded(ticker)) {
      this.comparedInstruments.push(ticker);
      localStorage.setItem(
        'comparedInstruments',
        this.comparedInstruments + ''
      );
    }
    this.num++;
  });

  removeComparedInstrumet = action((ticker: string) => {
    this.comparedInstruments = this.comparedInstruments.filter(
      (instrument) => instrument !== ticker
    );

    localStorage.setItem('comparedInstruments', this.comparedInstruments + '');
  });
  isAlreadyAdded = (symbol: string) => {
    return this.comparedInstruments.includes(symbol);
  };
}
