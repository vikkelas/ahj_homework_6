/* eslint-disable linebreak-style */
export function closeButtonActivation() {
  const card = [...document.querySelectorAll('.task-box__card')];

  card.forEach((item) => {
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

export function createNewCard() {
  const btnsAdd = document.querySelectorAll('.task-box__btn');
  btnsAdd.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      btnsAdd.forEach((i) => {
        if (i.classList.contains('task-box__btn--none')) {
          i.classList.remove('task-box__btn--none');
        }
      });
      if (!document.querySelector('.new-card')) {
        e.currentTarget.classList.add('task-box__btn--none');
        const boxContent = e.target.closest('.task-box');
        boxContent.insertAdjacentHTML('beforeend', `
      <div class="new-card">
      <textarea class="new-card__text" rows="4" placeholder="Enter a title for this card..."></textarea>
      <div class="new-card__buttons">
         <button class="new-card__btn-add">Add Card</button>
         <button class="new-card__btn-delet">&#10006</button>
      </div>
      </div>`);
      }
      if (document.querySelector('.new-card')) {
        const itemNew = document.querySelector('.new-card');
        const parentItem = itemNew.closest('.task-box');
        parentItem.removeChild(itemNew);
        e.currentTarget.classList.add('task-box__btn--none');
        const boxContent = e.target.closest('.task-box');
        boxContent.insertAdjacentHTML('beforeend', `
      <div class="new-card">
      <textarea class="new-card__text" rows="4" placeholder="Enter a title for this card..."></textarea>
      <div class="new-card__buttons">
         <button class="new-card__btn-add">Add Card</button>
         <button class="new-card__btn-delet">&#10006</button>
      </div>
      </div>`);
      }
    });
  });
}
