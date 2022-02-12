/* eslint-disable linebreak-style */
export default class Cards {
  constructor() {
    this.btnsCreatCard = document.querySelectorAll('.task-box__btn');
    this.boxNewCard = null;
    this.cards = [...document.querySelectorAll('.task-box__card')];
    this.cardsBoxs = [...document.querySelectorAll('.task-box')];
    this.moveArea = document.querySelector('.body__container');
    this.ghostEl = null;
    this.deletElement = null;
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
        this.cards = [...document.querySelectorAll('.task-box__card')];
        this.boxNewCard = null;
      }
      if (e.target.classList.contains('new-card__btn-add')) {
        const parent = e.currentTarget.closest(this.boxNewCard);
        const boxContent = e.currentTarget.closest('.task-box').querySelector('.task-box__content');
        const text = parent.querySelector('.new-card__text');
        const element = `
        <div class="task-box__card">
          <div class="task-box__card-text">
          ${text.value}
          </div>
          <div class="task-box__card-btn"></div>
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
    this.cards.forEach((item) => {
      item.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('task-box__card-btn')) {
          return;
        }
        e.preventDefault();
        this.deletElement = e.currentTarget;
        this.deletBox = e.currentTarget.closest('.task-box__content');
        this.ghostEl = e.currentTarget.cloneNode(true);
        this.ghostEl.classList.add('task-box__card--dragged');
        document.body.appendChild(this.ghostEl);
        this.ghostEl.querySelector('.task-box__card-btn').classList.remove('task-box__card-btn--active');
        this.ghostEl.style.left = `${e.pageX - this.ghostEl.offsetWidth / 2}px`;
        this.ghostEl.style.top = `${e.pageY - this.ghostEl.offsetHeight / 2}px`;
      });
    });
    this.moveArea.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if (this.ghostEl === null) {
        return;
      }
      this.ghostEl.style.left = `${e.pageX - this.ghostEl.offsetWidth / 2}px`;
      this.ghostEl.style.top = `${e.pageY - this.ghostEl.offsetHeight / 2}px`;
      this.mouseUp();
    });
    this.moveArea.addEventListener('mouseleave', () => {
      if (this.ghostEl === null) {
        return;
      }
      document.body.removeChild(this.ghostEl);
      this.ghostEl = null;
    });
  }

  mouseUp() {
    this.cardsBoxs.forEach((item) => {
      item.addEventListener('mouseup', (e) => {
        if (this.ghostEl === null) {
          return;
        }
        const element = `
        <div class="task-box__card">
          <div class="task-box__card-text">
          ${this.ghostEl.textContent}
          </div>
          <div class="task-box__card-btn"></div>
        </div> `;
        const content = e.currentTarget.querySelector('.task-box__content');
        const closest = document.elementFromPoint(e.clientX, e.clientY);
        if (content.children.length === 0) {
          content.insertAdjacentHTML('afterbegin', element);
          this.zeroingElement();
        }
        if (closest.classList.contains('task-box__card')) {
          content.insertBefore(this.ghostEl, closest);
          console.log(closest);
        }
      });
    });
  }

  zeroingElement() {
    this.cards = [...document.querySelectorAll('.task-box__card')];
    this.deletCard();
    this.dragAndDrops();
    document.body.removeChild(this.ghostEl);
    this.ghostEl = null;
    this.deletBox.removeChild(this.deletElement);
    this.deletBox = null;
    this.deletElement = null;
  }
}
