export default function addCard() {
  const boxBtns = document.querySelector('.new-card__buttons');
  const textarea = document.querySelector('.new-card__text');
  boxBtns.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('new-card__btn-add')) {
      console.log(

        textarea.value);
    }
  });
}
