let $cardsWrapper = document.querySelector(".cards");
let $cards = document.querySelectorAll(".cards__item");

let $addBtn = document.querySelector(".page__btn-group-add");
let $removeBtn = document.querySelector(".page__btn-group-remove");
let $removeDoneBtn = document.querySelector(".page__btn-group-remove-done");

$cards.forEach(card => {
    card.draggable = true;
});

$cardsWrapper.addEventListener("dragstart", (e) => {
    e.target.classList.add("selected");
});

$cardsWrapper.addEventListener("dragend", (e) => {
    e.target.classList.remove("selected");
});

$cardsWrapper.addEventListener("dragover", (e) => {
  e.preventDefault();

  let activeItem = $cardsWrapper.querySelector(".selected");

  let currentItem = e.target;

 let isMoveable = activeItem !== currentItem &&
    currentItem.classList.contains("cards__item");

  if (!isMoveable) {
    return;
  }

  const nextItem = (currentItem === activeItem.nextElementSibling) ?
    currentItem.nextElementSibling :
    currentItem;

    $cardsWrapper.insertBefore(activeItem, nextItem);
});

AddResize();

AddComplete();

$addBtn.addEventListener("click", AddNewCard);
$removeBtn.addEventListener("click", RemoveCards);
$removeDoneBtn.addEventListener("click", RemoveDone);

function AddResize() {
    let $itemsText = document.querySelectorAll(".cards__item-text");

    $itemsText.forEach(item => {
        item.style.height = `${item.scrollHeight}px`;
        item.style.overflowY = "hidden";

        item.addEventListener("input", TextInput);

    });
}

function AddComplete() {
    let $itemsBtn = document.querySelectorAll(".cards__item-btn");

    $itemsBtn.forEach(btn => {
        btn.removeEventListener("click", Remove);
        btn.addEventListener("click", Complete);
    });
}

function AddRemove() {
    let $itemsBtn = document.querySelectorAll(".cards__item-btn");

    $itemsBtn.forEach(btn => {
        btn.removeEventListener("click", Complete);
        btn.addEventListener("click", Remove);
    });
}

function TextInput() {
    this.style.height = "auto";
    this.style.height = `${this.scrollHeight}px`;
}

function Complete() {
    this.classList.toggle("complete-btn");

    let $text = this.parentNode.querySelector(".cards__item-text");

    $text.classList.toggle("complete-text");
}

function Remove() {
    this.classList.toggle("remove-btn");

    let $text = this.parentNode.querySelector(".cards__item-text");

    $text.classList.toggle("remove-text");
}

function AddNewCard() {
    let newCardItem = $cardsWrapper.querySelector(".cards__item").cloneNode(true);

    newCardItem.querySelector(".cards__item-text").style.height = "auto";
    newCardItem.querySelector(".cards__item-text").value = "";
    newCardItem.querySelector(".cards__item-text").classList.remove("complete-text");
    newCardItem.querySelector(".cards__item-btn").classList.remove("complete-btn");
    $cardsWrapper.append(newCardItem);

    AddResize();
    AddComplete();
}

function RemoveCards() {
    $removeDoneBtn.style.display = "block";
    $addBtn.removeEventListener("click", AddNewCard);

    $addBtn.classList.add("removing");
    $removeBtn.classList.add("removing");

    let $Carditems = document.querySelectorAll(".cards__item");

    $Carditems.forEach(item => {
        item.classList.add("selected");
    });

    AddRemove();
}

function RemoveDone() {
    let $removed = document.querySelectorAll(".remove-btn");
    let $Carditems = document.querySelectorAll(".cards__item");

    if ($removed.length === $Carditems.length) {
        alert("Вы не можете удалть все пункты!");
        return;
    }

    $removed.forEach(item => {
        item.parentNode.remove();
    });

    $removeDoneBtn.style.display = "none";
    $addBtn.addEventListener("click", AddNewCard);

    $addBtn.classList.remove("removing");
    $removeBtn.classList.remove("removing");

    $Carditems.forEach(item => {
        item.classList.remove("selected");
    });

    AddComplete();
}