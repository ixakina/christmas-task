import { Modal } from './modal';
import { LocalStorageItems } from './app-const';
import { LocalStorage } from './localStorage';
import { Renderer } from './renderer';

export class FilterListener {
  private localStorage: LocalStorage;

  constructor(private renderer: Renderer) {
    this.localStorage = new LocalStorage();
  }

  public createFiltersListener(): void {
    const shapeControls: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.settings__shape button');
    const sizeControls: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.settings__size button');
    const colorControls: NodeListOf<HTMLInputElement> = document.querySelectorAll('.settings__color input');
    const favoriteControl: HTMLInputElement = document.querySelector(
      '.settings__favorite input'
    );

    shapeControls.forEach((item): void => {
      item.addEventListener('click', (): void => {
        const filters = JSON.parse(
          this.localStorage.getItem(LocalStorageItems.FILTERS_BY_VALUE)
        );
        const filterValue = item.getAttribute('data-filter');

        item.classList.toggle('active');
        if (filters.shape.includes(filterValue)) {
          filters.shape.splice(filters.shape.indexOf(filterValue), 1);
        } else {
          filters.shape.push(filterValue);
        }

        this.localStorage.setItem(
          LocalStorageItems.FILTERS_BY_VALUE,
          JSON.stringify(filters)
        );

        this.renderer.renderCardsToDom();
        if (!document.querySelector('.toys-page__toy-cards').children.length) {
          new Modal('Извините, совпадений не обнаружено', 'Понятно').createModal();
        }
      });
    });

    sizeControls.forEach((item): void => {
      item.addEventListener('click', (): void => {
        const filters = JSON.parse(
          this.localStorage.getItem(LocalStorageItems.FILTERS_BY_VALUE)
        );
        const filterValue = item.getAttribute('data-filter');
        item.classList.toggle('active');
        if (filters.size.includes(filterValue)) {
          filters.size.splice(filters.size.indexOf(filterValue), 1);
        } else {
          filters.size.push(filterValue);
        }

        this.localStorage.setItem(
          LocalStorageItems.FILTERS_BY_VALUE,
          JSON.stringify(filters)
        );
        this.renderer.renderCardsToDom();
        if (!document.querySelector('.toys-page__toy-cards').children.length) {
          new Modal('Извините, совпадений не обнаружено', 'Понятно').createModal();
        }
      });
    });

    colorControls.forEach((item): void => {
      item.addEventListener('input', (): void => {
        const filters = JSON.parse(
          this.localStorage.getItem(LocalStorageItems.FILTERS_BY_VALUE)
        );
        const filterValue = item.getAttribute('data-filter');
        if (item.checked) {
          filters.color.push(filterValue);
        } else {
          filters.color.splice(filters.color.indexOf(filterValue), 1);
        }

        this.localStorage.setItem(
          LocalStorageItems.FILTERS_BY_VALUE,
          JSON.stringify(filters)
        );
        this.renderer.renderCardsToDom();
        if (!document.querySelector('.toys-page__toy-cards').children.length) {
          new Modal('Извините, совпадений не обнаружено', 'Понятно').createModal();
        }
      });
    });

    favoriteControl.addEventListener('input', (): void => {
      const filters = JSON.parse(
        this.localStorage.getItem(LocalStorageItems.FILTERS_BY_VALUE)
      );
      if (favoriteControl.checked) {
        (filters.favorite = true);
      } else {
        (filters.favorite = false);
      }

      this.localStorage.setItem(
        LocalStorageItems.FILTERS_BY_VALUE,
        JSON.stringify(filters)
      );
      this.renderer.renderCardsToDom();
      if (!document.querySelector('.toys-page__toy-cards').children.length) {
        new Modal('Извините, совпадений не обнаружено', 'Понятно').createModal();
      }
    });
  }
}
