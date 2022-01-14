import { LocalStorage } from './localStorage';
import { LocalStorageItems, SortTypes } from './app-const';

export class ApplySettings {
  localstorage: LocalStorage = new LocalStorage();

  public applySettings(): void {
    const valueFilters = JSON.parse(localStorage.getItem(LocalStorageItems.FILTERS_BY_VALUE));
    const sortType = this.localstorage.getItem(LocalStorageItems.SORT_TYPE);
    const sortAlphabet = this.localstorage.getItem(LocalStorageItems.SORT_BY_ALPHABET);
    const sortYear = this.localstorage.getItem(LocalStorageItems.SORT_BY_YEAR);

    if (sortType === 'asc' && sortAlphabet === 'true') {
      document.querySelector(`option[value=${SortTypes.NAME_UP}]`).setAttribute('selected', 'true');
    } else if (sortType === 'desc' && sortAlphabet === 'true') {
      document.querySelector(`option[value=${SortTypes.NAME_DOWN}]`).setAttribute('selected', 'true');
    } else if (sortType === 'asc' && sortYear === 'true') {
      document.querySelector(`option[value=${SortTypes.YEAR_UP}]`).setAttribute('selected', 'true');
    } else if (sortType === 'desc' && sortYear === 'true') {
      document.querySelector(`option[value=${SortTypes.YEAR_DOWN}]`).setAttribute('selected', 'true');
    } else {
      document.querySelectorAll('option').forEach((option) => {
        option.selected = false;
      });
    }

    const shapeControls: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.settings__shape button');
    const sizeControls: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.settings__size button');
    const colorControls: NodeListOf<HTMLInputElement> = document.querySelectorAll('.settings__color input');
    const favoriteControl: HTMLInputElement = document.querySelector(
      '.settings__favorite input'
    );

    shapeControls.forEach((btn): void => {
      const value = btn.getAttribute('data-filter');
      if (valueFilters.shape.includes(value)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    sizeControls.forEach((btn): void => {
      const value = btn.getAttribute('data-filter');
      if (valueFilters.size.includes(value)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    colorControls.forEach((input): void => {
      const value = input.getAttribute('data-filter');
      if (valueFilters.color.includes(value)) {
        input.setAttribute('checked', 'true');
      } else {
        input.checked = false;
      }
    });

    if (valueFilters.favorite) {
      favoriteControl.setAttribute('checked', 'true');
    } else {
      favoriteControl.checked = false;
    }
  }
}
