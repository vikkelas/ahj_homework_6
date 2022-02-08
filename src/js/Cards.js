/* eslint-disable linebreak-style */
import addCard from './utilits';

export default class Cards {
  constructor() {
    this.boxsCards = document.querySelectorAll('.task-box');
    this.btnsCreatCard = document.querySelectorAll('.task-box__btn');
    this.addCard = addCard;
    this.boxNewCard = null;
  }

  init() {
    this.btnsCreatCard.forEach((item) => item.addEventListener('click', this.createCard.bind(this)));
  }

  createCard(e) {
    e.preventDefault();
    this.createCard = `<div class="new-card">
    <textarea class="new-card__text" rows="4" placeholder="Enter a title for this card..."></textarea>
    <div class="new-card__buttons">
       <button class="new-card__btn-add">Add Card</button>
       <button class="new-card__btn-delet">&#10006</button>
    </div>
    </div>`;
    this.btnsCreatCard.forEach((item) => {
      if (item.classList.contains('task-box__btn--none')) {
        item.classList.remove('task-box__btn--none');
      }
    });
    if (this.boxNewCard === null) {
      e.target.classList.add('task-box__btn--none');
      this.showTextarea(e);
      this.addCard();
      this.boxNewCard = '.new-card';
    } else if (this.boxNewCard !== null) {
      e.target.classList.add('task-box__btn--none');
      this.hidingTextarea();
      this.showTextarea(e);
      this.addCard();
    }
  }

  showTextarea(e) {
    const parent = e.target.closest('.task-box');
    parent.insertAdjacentHTML('beforeend', this.createCard);
  }

  hidingTextarea() {
    const deletEl = document.querySelector(this.boxNewCard);
    const parentDelEl = deletEl.closest('.task-box');
    parentDelEl.removeChild(deletEl);
  }
}
