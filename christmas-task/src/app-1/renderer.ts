import { FilterBySearch } from './search-filter';
import { FilterByRange } from './filter-by-range';
import { FilterByValue } from './filter-by-value';
import { Sort } from './sort';
import { ToyCard } from './toy-card';
import { ICard } from './interfaces';

export class Renderer {
  private view: ToyCard[] = [];

  private sort: Sort = new Sort();

  private filterByValue: FilterByValue;

  private filterByRange: FilterByRange;

  private filterBySearch: FilterBySearch;

  constructor(private data: ICard[]) {
    this.filterByValue = new FilterByValue(this.data);
    this.filterByRange = new FilterByRange(this.data);
    this.filterBySearch = new FilterBySearch(this.data);
  }

  public renderCardsToDom(): void {
    if (this.view.length) {
      this.view.forEach((card: ToyCard) => card.destroy());
      this.view.length = 0;
    }

    const cardsContainer: HTMLElement = <HTMLElement>(
      document.querySelector('.toys-page__toy-cards')
    );
    cardsContainer.innerHTML = '';

    const search: HTMLInputElement = document.querySelector('.info__search');

    this.filterByValue.filter();
    this.filterByRange.filter();
    this.filterBySearch.filter(search.value);

    this.sort
      .sortCards(this.data.filter((card: ICard) => card.isShow))
      .forEach((toy: ICard) => {
        const toyCard: ToyCard = new ToyCard(toy, this.data);
        this.view.push(toyCard);

        const card: HTMLElement = toyCard.createCard();
        cardsContainer.append(card);
      });
  }
}
