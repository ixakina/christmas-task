/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { LocalStorageItems } from './app-const';
import { ICard } from './interfaces';

export class Sort {
  public sortCards(data: ICard[]): ICard[] {
    this.sortByAlphabet(data);
    this.sortByYear(data);
    return data;
  }

  private sortByAlphabet(data: ICard[]): void {
    const sortByAlphabet = JSON.parse(
      localStorage.getItem(LocalStorageItems.SORT_BY_ALPHABET)
    );
    const sortType = localStorage.getItem(LocalStorageItems.SORT_TYPE);

    if (!sortByAlphabet) {
      return;
    }

    data.sort((cardA: ICard, cardB: ICard) => {
      if (sortType === LocalStorageItems.ASC) {
        return cardA.name > cardB.name ? 1 : -1;
      }

      if (sortType === LocalStorageItems.DESC) {
        return cardA.name > cardB.name ? -1 : 1;
      }
    });
  }

  private sortByYear(data: ICard[]): void {
    const sortByYear = JSON.parse(
      localStorage.getItem(LocalStorageItems.SORT_BY_YEAR)
    );
    const sortType = localStorage.getItem(LocalStorageItems.SORT_TYPE);

    if (!sortByYear) {
      return;
    }

    data.sort((cardA: ICard, cardB: ICard) => {
      if (sortType === LocalStorageItems.ASC) {
        return +cardA.year - +cardB.year;
      }

      if (sortType === LocalStorageItems.DESC) {
        return +cardB.year - +cardA.year;
      }
    });
  }
}
