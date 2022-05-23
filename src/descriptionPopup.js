export const descriptionPopup = (book,id) => {
    
    const modal = document.createElement('div');
    modal.setAttribute("class", "modal");
    modal.setAttribute("id", `modal-${id}`);

    const modalContent = document.createElement('div');
    modalContent.setAttribute("class", "modal-content");
    modal.appendChild(modalContent);

    const closeButton = document.createElement('button');
    closeButton.setAttribute("class", "close-button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("aria-label", "close modal");
    closeButton.dataset.close = "";
    closeButton.innerHTML = `&times;`;

    closeButton.addEventListener("click", e => {
        if (e.target.parentElement.parentElement.parentElement == document.querySelector(".modal.is-visible")) {
          document.querySelector(".modal.is-visible").classList.remove("is-visible");
        }
    });

    const modalHeader = document.createElement('div');
    modalHeader.setAttribute("class", "modal-header");
    modalHeader.appendChild(closeButton);

    document.addEventListener("click", e => {
        if (e.target == document.querySelector(".modal.is-visible")) {
          document.querySelector(".modal.is-visible").classList.remove("is-visible");
        }
      });

    modalContent.appendChild(modalHeader);

    const bookTitle = document.createElement('h2');
    bookTitle.innerHTML = book.title;

    modalContent.appendChild(bookTitle);

    const divider = document.createElement('hr');
    modalContent.appendChild(divider);

    const description = document.createElement('p');
    description.innerHTML = book.description;
    modalContent.appendChild(description);

    //window.addEventListener("click", windowOnClick);
    
    return modal;
};