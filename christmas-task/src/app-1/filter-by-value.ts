import { LocalStorageItems, Filters } from './app-const';
import { LocalStorage } from './localStorage';
import { ICard, IFiltersByValue } from './interfaces';

export class FilterByValue {
  private localStorage: LocalStorage = new LocalStorage();

  private filters: Filters[] = [Filters.COLOR, Filters.SHAPE, Filters.FAVORITE, Filters.SIZE];

  constructor(private data: ICard[]) {}

  public filter(): void {
    const filtersSettings: IFiltersByValue = JSON.parse(
      this.localStorage.getItem(LocalStorageItems.FILTERS_BY_VALUE)
    );
    this.data.forEach((card: ICard) => {
      card.isShow = this.filters.every((filter: Filters) => this.filterByField(filter, filtersSettings, card));
    });
  }

  private filterByField(
    filter: Filters,
    filtersSettings: IFiltersByValue,
    card: ICard
  ): boolean {
    switch (filter) {
      case Filters.SHAPE:
        return filtersSettings[filter].length
          ? filtersSettings[filter].includes(card.shape)
          : true;
      case Filters.COLOR:
        return filtersSettings[filter].length
          ? filtersSettings[filter].includes(card.color)
          : true;
      case Filters.SIZE:
        return filtersSettings[filter].length
          ? filtersSettings[filter].includes(card.size)
          : true;
      case Filters.FAVORITE:
        return filtersSettings[filter]
          ? filtersSettings[filter] === card.favorite
          : true;
      default:
        return true;
    }
  }
}
