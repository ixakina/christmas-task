import { target } from 'nouislider';
import { Modal } from './modal';
import { LocalStorageItems } from './app-const';
import { SortListener } from './sort-listener';
import { LocalStorage } from './localStorage';
import { ICard, IToy } from './interfaces';
import { Renderer } from './renderer';
import { FilterListener } from './filter-listener';
import { Slider } from '../scripts/slider';
import { ApplySettings } from './apply-settings';
import { Reset } from './reset';
import { NavigationButtonListeners } from '../app-2/buttons-listeners';

export default class App {
  private localStorage: LocalStorage = new LocalStorage();

  private renderer: Renderer;

  private sortListener: SortListener;

  private filterListener: FilterListener;

  private navigationButtonListeners: NavigationButtonListeners;

  private sliderValue: Slider;

  private sliderYear: Slider;

  private applySettings: ApplySettings;

  private reset: Reset;

  constructor(private data: IToy[]) {
    this.renderer = new Renderer(
      this.data.map(
        (card: IToy): ICard => ({
          ...card,
          isChosen: false,
          isShow: true,
        })
      )
    );
    this.applySettings = new ApplySettings();
    this.sortListener = new SortListener(this.renderer);
    this.filterListener = new FilterListener(this.renderer);
    this.reset = new Reset(this.renderer);
    this.navigationButtonListeners = new NavigationButtonListeners();
  }

  public init(): void {
    this.localStorage.initLocalStorage();
    this.applySettings.applySettings();
    this.renderer.renderCardsToDom();

    this.createListeners();
    this.initSliders();

    document.querySelector('.info__chosen span').textContent = JSON.parse(
      this.localStorage.getItem(LocalStorageItems.CHOSEN)
    ).length;
  }

  private createListeners(): void {
    this.navigationButtonListeners.createNavigateListeners();
    this.sortListener.createSortSelectListener();
    this.filterListener.createFiltersListener();

    document.querySelector('.info__search').addEventListener('input', () => {
      this.renderer.renderCardsToDom();
      if (!document.querySelector('.toys-page__toy-cards').children.length) {
        new Modal(
          'Извините, совпадений не обнаружено',
          'Понятно'
        ).createModal();
      }
    });

    this.reset.createResetListeners();
  }

  private initSliders(): void {
    const start = JSON.parse(
      this.localStorage.getItem(LocalStorageItems.FILTERS_BY_RANGE)
    );

    this.sliderValue = new Slider(
      document.querySelector('.number__wrapper') as target,
      {
        start: [start.count.min, start.count.max],
        connect: true,
        step: 1,
        range: {
          min: 1,
          max: 12,
        },
      },
      'count',
      this.renderer
    );
    this.sliderValue.sliderInit();

    this.sliderYear = new Slider(
      document.querySelector('.year__wrapper') as target,
      {
        start: [start.year.min, start.year.max],
        connect: true,
        step: 1,
        range: {
          min: 1940,
          max: 2020,
        },
      },
      'year',
      this.renderer
    );
    this.sliderYear.sliderInit();
  }
}
