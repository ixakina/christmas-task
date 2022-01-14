import { ICard } from './interfaces';

export class FilterBySearch {
  constructor(private data: ICard[]) {}

  public filter(value: string): void {
    this.data
      .filter((card: ICard) => card.isShow)
      .forEach((card: ICard) => {
        card.isShow = card.name.toLowerCase().includes(value.toLowerCase());
      });
  }
}
