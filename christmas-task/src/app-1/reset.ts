import { LocalStorageItems } from './app-const';
import { LocalStorage } from './localStorage';
import { Renderer } from './renderer';
import { ApplySettings } from './apply-settings';

export class Reset {
  private localstorage: LocalStorage = new LocalStorage();

  private applySettings: ApplySettings = new ApplySettings();

  private filtersByValue = JSON.parse(this.localstorage.getItem(LocalStorageItems.FILTERS_BY_VALUE));

  private filtersByRange = JSON.parse(this.localstorage.getItem(LocalStorageItems.FILTERS_BY_RANGE));

  private resetFiltersBtn = document.querySelector('.reset-filters');

  private resetSettingsBtn = document.querySelector('.reset-settings');

  private sliderCount = document.querySelector('.number__wrapper .slider');

  private sliderYear = document.querySelector('.year__wrapper .slider');

  constructor(private renderer: Renderer) {}

  public createResetListeners():void {
    this.resetFiltersBtn.addEventListener('click', this.resetFilters.bind(this));
    this.resetSettingsBtn.addEventListener('click', this.resetSettings.bind(this));
  }

  private resetFilters() {
    this.filtersByValue = {
      shape: [],
      color: [],
      size: [],
      favorite: false,
    };

    this.filtersByRange = {
      count: {
        min: 1,
        max: 12,
      },
      year: {
        min: 1940,
        max: 2020,
      },
    };

    (this.sliderCount as any).noUiSlider.set([1, 12]);
    (this.sliderYear as any).noUiSlider.set([1940, 2020]);

    this.localstorage.setItem(LocalStorageItems.FILTERS_BY_VALUE, JSON.stringify(this.filtersByValue));
    this.localstorage.setItem(LocalStorageItems.FILTERS_BY_RANGE, JSON.stringify(this.filtersByRange));

    this.applySettings.applySettings();

    this.renderer.renderCardsToDom();
  }

  private resetSettings() {
    this.resetFilters();

    this.localstorage.setItem(LocalStorageItems.SORT_TYPE, null);
    this.localstorage.setItem(LocalStorageItems.SORT_BY_ALPHABET, 'false');
    this.localstorage.setItem(LocalStorageItems.SORT_BY_YEAR, 'false');
    this.localstorage.setItem(LocalStorageItems.CHOSEN, '[]');

    document.querySelector('.info__chosen span').textContent = JSON.parse(this.localstorage.getItem(LocalStorageItems.CHOSEN)).length;

    this.applySettings.applySettings();

    this.renderer.renderCardsToDom();
  }
}
