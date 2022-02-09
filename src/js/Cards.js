/* eslint-disable linebreak-style */
export default class Cards {
  constructor() {
    this.btnsCreatCard = document.querySelectorAll('.task-box__btn');
    this.boxNewCard = null;
    this.cards = [...document.querySelectorAll('.task-box__card')];
  }

  init() {
    this.btnsCreatCard.forEach((item) => item.addEventListener('click', this.createCard.bind(this)));
    this.deletCard();
    this.dragAndDrops();
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
    this.showBtnAdd();
    if (this.boxNewCard === null) {
      e.target.classList.add('task-box__btn--none');
      this.showTextarea(e);
      this.boxNewCard = '.new-card';
      this.onClickBtn();
    } else if (this.boxNewCard !== null) {
      e.target.classList.add('task-box__btn--none');
      this.hidingTextarea();
      this.showTextarea(e);
      this.onClickBtn();
    }
  }

  deletCard() {
    this.cards.forEach((item) => {
      item.addEventListener('mouseenter', (e) => {
        const btnClose = e.currentTarget.querySelector('.task-box__card-btn');
        btnClose.classList.add('task-box__card-btn--active');
        btnClose.addEventListener('click', (e) => {
          const cardDelet = e.target.closest('div.task-box__card');
          const boxItems = e.target.closest('.task-box__content');
          boxItems.removeChild(cardDelet);
        });
      });
      item.addEventListener('mouseleave', (e) => {
        const btnClose = e.target.querySelector('.task-box__card-btn');
        btnClose.classList.remove('task-box__card-btn--active');
      });
    });
  }

  showBtnAdd() {
    this.btnsCreatCard.forEach((item) => {
      if (item.classList.contains('task-box__btn--none')) {
        item.classList.remove('task-box__btn--none');
      }
    });
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

  onClickBtn() {
    const newCard = document.querySelector(this.boxNewCard);
    newCard.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('new-card__btn-delet')) {
        this.hidingTextarea();
        this.showBtnAdd();
        this.boxNewCard = null;
      }
      if (e.target.classList.contains('new-card__btn-add')) {
        const parent = e.currentTarget.closest(this.boxNewCard);
        const boxContent = e.currentTarget.closest('.task-box').querySelector('.task-box__content');
        const text = parent.querySelector('.new-card__text');
        const element = `
        <div class="task-box__card">
          <div class="task-box__card-text"><span class="task-box__card-btn">close</span>
          ${text.value}
          </div>
        </div> `;
        boxContent.insertAdjacentHTML('beforeend', element);
        this.hidingTextarea();
        this.showBtnAdd();
        this.boxNewCard = null;
        this.cards = [...document.querySelectorAll('.task-box__card')];
        this.deletCard();
        this.dragAndDrops();
      }
    });
  }

  dragAndDrops() {
    let draggedEl = null;
    let ghostEl = null;
    const itemsEl = document.querySelector('.body__container');
    itemsEl.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (!e.target.classList.contains('task-box__card')) {
        return;
      }
      draggedEl = e.target;
      ghostEl = e.target.cloneNode(true);
      ghostEl.classList.add('task-box__card--dragged');
      document.body.appendChild(ghostEl);
      ghostEl.style.left = `${e.pageX - ghostEl.offsetWidth / 2}px`;
      ghostEl.style.top = `${e.pageX - ghostEl.offsetHeight / 2}px`;
    });
    itemsEl.addEventListener('mousemove', (e) => {
      if (!draggedEl) {
        return;
      }
      ghostEl.style.left = `${e.pageX - ghostEl.offsetWidth / 2}px`;
      ghostEl.style.top = `${e.pageX - ghostEl.offsetHeight / 2}px`;
    });
  }
}
