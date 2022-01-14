import { LocalStorageItems } from '../app-1/app-const';
import { LocalStorage } from '../app-1/localStorage';
import { TreeToys } from './tree-toys';
import { TreePageListeners } from './tree-page-listeners';

export class NavigationButtonListeners {
  private localStorage:LocalStorage = new LocalStorage();

  private treePageListeners: TreePageListeners = new TreePageListeners();

  private treeToys: TreeToys = new TreeToys();

  private logoBtn: HTMLElement = document.querySelector('.nav__logo');

  private toysPageBtn: HTMLElement = document.querySelector('.toys-page-link');

  private treePageBtn: HTMLElement = document.querySelector('.tree-page-link');

  private startBtn: HTMLElement = document.querySelector('.first-page__button');

  private pages: NodeListOf<HTMLElement> =
  document.querySelectorAll('.section');

  private firstPage: HTMLElement = document.querySelector('.first-page');

  private toysPage: HTMLElement = document.querySelector('.toys-page');

  private treePage: HTMLElement = document.querySelector('.tree-page');

  public createNavigateListeners(): void {
    this.treePageListeners.createTreePageListeners();

    this.logoBtn.addEventListener('click', this.handleLogoClick.bind(this));

    this.toysPageBtn.addEventListener(
      'click',
      this.handleToysBtnClick.bind(this)
    );

    this.treePageBtn.addEventListener(
      'click', this.handleTreeBtnClick.bind(this)
    );

    this.startBtn.addEventListener(
      'click',
      this.handleStartBtnClick.bind(this)
    );
  }

  private handleLogoClick() {
    this.pages.forEach((page) => {
      page.classList.add('hide');
    });

    this.firstPage.classList.remove('hide');
  }

  private handleToysBtnClick() {
    this.pages.forEach((page) => {
      page.classList.add('hide');
    });

    this.toysPage.classList.remove('hide');
    this.deleteAbsolutePositionedToys();
  }

  private handleStartBtnClick() {
    this.pages.forEach((page) => {
      page.classList.add('hide');
    });

    this.toysPage.classList.remove('hide');
  }

  private handleTreeBtnClick() {
    this.pages.forEach((page) => {
      page.classList.add('hide');
    });

    this.treePage.classList.remove('hide');

    this.treePageListeners.mainTree.src = this.localStorage.getItem(LocalStorageItems.TREE);

    this.treePageListeners.mainTreeBg.style.backgroundImage = this.localStorage.getItem(LocalStorageItems.TREE_BG);

    const isSnow = JSON.parse(this.localStorage.getItem(LocalStorageItems.SNOW));

    const isMusic = JSON.parse(this.localStorage.getItem(LocalStorageItems.MUSIC));

    if (isSnow) {
      this.treePageListeners.interval = setInterval(this.treePageListeners.createSnowFlake.bind(this.treePageListeners), 50);
      this.treePageListeners.snowBtn.classList.add('active');
    }

    if (isMusic) {
      this.treePageListeners.audio.src = 'https://raw.githubusercontent.com/ixakina/christmas-task-assets/master/assets/audio/audio.mp3';
      this.treePageListeners.audio.play();
      this.treePageListeners.volumeBtn.classList.add('active');
    }

    this.treeToys.fillInTreeToysSlots();
  }

  private deleteAbsolutePositionedToys() {
    Array.from(document.body.children).forEach((child) => {
      if (child.tagName === 'IMG') {
        child.remove();
      }
    });
  }
}
