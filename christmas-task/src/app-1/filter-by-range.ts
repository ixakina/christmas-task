import { LocalStorageItems } from './app-const';
import { LocalStorage } from './localStorage';
import { ICard, IFiltersByRange } from './interfaces';

export class FilterByRange {
  private localStorage: LocalStorage = new LocalStorage();

  private filters: [string, string] = ['count', 'year'];

  constructor(private data: ICard[]) {}

  public filter(): void {
    const filtersSettings: IFiltersByRange = JSON.parse(
      this.localStorage.getItem(LocalStorageItems.FILTERS_BY_RANGE)
    );

    this.data
      .filter((card: ICard) => card.isShow)
      .forEach((card: ICard) => {
        card.isShow = this.filters.every((filter: string) => this.filterByField(filter, filtersSettings, card));
      });
  }

  private filterByField(
    filter: string,
    filtersSettings: IFiltersByRange,
    card: ICard
  ): boolean {
    switch (filter) {
      case 'count':
        return (
          +card.count >= filtersSettings[filter].min
          && +card.count <= filtersSettings[filter].max
        );
      case 'year':
        return (
          +card.year >= filtersSettings[filter].min
          && +card.year <= filtersSettings[filter].max
        );
      default:
        return true;
    }
  }
}
