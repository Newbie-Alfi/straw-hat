import { makeAutoObservable } from 'mobx';

export class Instrument {
  comparedInstruments: string[] =
    localStorage.getItem('comparedInstruments')?.split(',') || [];

  constructor() {
    makeAutoObservable(this);
  }

  addComparedInstrumet = (ticker: string) => {
    this.comparedInstruments?.push(ticker);
    localStorage.setItem('comparedInstruments', this.comparedInstruments + '');
  };

  removeComparedInstrumet = (ticker: string) => {
    this.comparedInstruments.filter((instrument) => instrument !== ticker);
    localStorage.setItem('comparedInstruments', this.comparedInstruments + '');
  };
}
