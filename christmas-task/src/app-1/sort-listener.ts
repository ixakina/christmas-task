import { LocalStorage } from './localStorage';
import { SortTypes, LocalStorageItems } from './app-const';
import { Renderer } from './renderer';

export class SortListener {
  private localStorage: LocalStorage = new LocalStorage();

  constructor(private renderer: Renderer) {}

  public createSortSelectListener(): void {
    const select: HTMLSelectElement = document.querySelector('#select');

    select.addEventListener('change', () => {
      switch (select.value) {
        case SortTypes.NAME_UP:
          this.localStorage.setItem(
            LocalStorageItems.SORT_TYPE,
            LocalStorageItems.ASC
          );
          this.localStorage.setItem(LocalStorageItems.SORT_BY_ALPHABET, 'true');
          this.localStorage.setItem(LocalStorageItems.SORT_BY_YEAR, 'false');
          break;

        case SortTypes.NAME_DOWN:
          this.localStorage.setItem(
            LocalStorageItems.SORT_TYPE,
            LocalStorageItems.DESC
          );
          this.localStorage.setItem(LocalStorageItems.SORT_BY_ALPHABET, 'true');
          this.localStorage.setItem(LocalStorageItems.SORT_BY_YEAR, 'false');
          break;

        case SortTypes.YEAR_UP:
          this.localStorage.setItem(
            LocalStorageItems.SORT_TYPE,
            LocalStorageItems.ASC
          );
          this.localStorage.setItem(LocalStorageItems.SORT_BY_YEAR, 'true');
          this.localStorage.setItem(
            LocalStorageItems.SORT_BY_ALPHABET,
            'false'
          );
          break;

        case SortTypes.YEAR_DOWN:
          this.localStorage.setItem(
            LocalStorageItems.SORT_TYPE,
            LocalStorageItems.DESC
          );
          this.localStorage.setItem(LocalStorageItems.SORT_BY_YEAR, 'true');
          this.localStorage.setItem(
            LocalStorageItems.SORT_BY_ALPHABET,
            'false'
          );
          break;
        default:
          return;
      }

      this.renderer.renderCardsToDom();
    });
  }
}
