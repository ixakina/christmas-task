/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ICard } from './interfaces';
import { Modal } from './modal';
import { LocalStorage } from './localStorage';
import { LocalStorageItems, CARD_LIMIT } from './app-const';

export class ToyCard {
  card: HTMLElement;

  private localStorage: LocalStorage = new LocalStorage();

  constructor(private toy: ICard, private data: ICard[]) {
    this.toy.isChosen = false;
  }

  public createCard(): HTMLElement {
    this.card = <HTMLElement>document.createElement('div');
    this.card.className = 'card';
    this.card.setAttribute('data-num', this.toy.num);
    this.card.innerHTML = `
    <h3 class="card__name">${this.toy.name}</h3>
    <img src="https://raw.githubusercontent.com/ixakina/christmas-task-assets/master/assets/toys/${
  this.toy.num
}.png" alt="toy" class="card__image">
    <div class="card__info">
      <span class="card__num">Количество: ${this.toy.count}</span>
      <span class="card__year">Год покупки:  ${this.toy.year}</span>
      <span class="card__shape">Форма:  ${this.toy.shape}</span>
      <span class="card__color">Цвет:  ${this.toy.color}</span>
      <span class="card__size">Размер:  ${this.toy.size}</span>
      <span class="card__like">Любимая:  ${
  this.toy.favorite ? 'да' : 'нет'
}</span>
    </div>
    `;

    const storageChosen = JSON.parse(this.localStorage.getItem(LocalStorageItems.CHOSEN));
    storageChosen.forEach((item: ICard) => {
      if (this.toy.num === item.num) {
        this.card.classList.add('chosen');
        this.toy.isChosen = true;
      }
    });

    this.card.addEventListener('click', this.cardListener.bind(this));

    return this.card;
  }

  public destroy(): void {
    removeEventListener('click', this.cardListener);
  }

  private cardListener(): void {
    this.toy.isChosen = !this.toy.isChosen;

    if (this.data.filter((card: ICard) => card.isChosen).length <= CARD_LIMIT) {
      this.toy.isChosen
        ? this.card.classList.add('chosen')
        : this.card.classList.remove('chosen');
    } else {
      new Modal('Извините, все слоты заполнены', 'Понятно').createModal();
      this.toy.isChosen = false;
    }

    this.localStorage.setItem(LocalStorageItems.CHOSEN, JSON.stringify(this.data.filter((card: ICard) => card.isChosen)));

    this.showIsFavorite();
  }

  private showIsFavorite(): void {
    document.querySelector('.info__chosen span').textContent = JSON.parse(this.localStorage.getItem(LocalStorageItems.CHOSEN)).length;
  }
}
