import { orderForm } from "./orderForm.js";

export const bagSidebar = () => {

    let userOrderId = [];
    if(window.sessionStorage.getItem("userOrder").length > 0) {
        userOrderId = JSON.parse(window.sessionStorage.getItem("userOrder")) || [];
    }
    
    const modal = document.createElement('div');
    modal.setAttribute("class", "sidebar");
    modal.setAttribute("id", `bag-sidebar`);

    document.querySelector('#app').appendChild(modal);

    const closeButton = document.createElement('button');
    closeButton.setAttribute("class", "close-button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("aria-label", "close modal");
    closeButton.dataset.close = "";
    closeButton.innerHTML = `&times;`;

    closeButton.addEventListener("click", e => {
        if (e.target.parentElement.parentElement == document.querySelector(".sidebar.is-visible")) {
          document.querySelector(".sidebar.is-visible").classList.remove("is-visible");
          location.reload();
        }
    });

    const modalHeader = document.createElement('div');
    modalHeader.setAttribute("class", "modal-header");
    modalHeader.appendChild(closeButton);

    modal.appendChild(modalHeader);

    const modalContent = document.createElement('div');
    modalContent.setAttribute("class", "sidebar-content");
    modal.appendChild(modalContent);

    const sidebarTitle = document.createElement('h3');
    sidebarTitle.innerHTML = `My order:`;
    modalContent.appendChild(sidebarTitle);

    const getTotal = (arr) => {
        let result = 0;
        arr.map(el => result += parseInt(el.price));
        return result;
    };

    const summary = document.createElement('div');
    summary.setAttribute("class", "summary-box");

    const total = document.createElement('h4');
    total.innerHTML = `TOTAL: ${getTotal(userOrderId)} $`;

    const payButton = document.createElement('button');
    payButton.setAttribute("type", "button");
    payButton.setAttribute("class", "pulsing-button");
    payButton.innerHTML = `CONFIRM`;

    payButton.addEventListener('click', function(){
        document.querySelector('#app').innerHTML=``;
        document.querySelector('#app').append(orderForm());
    });

    summary.appendChild(total);
    summary.appendChild(payButton);

    modalContent.appendChild(sidebarTitle);
    modalContent.appendChild(summary);

    const setOrderList = (arr)=> {
        let orderList = document.createElement('list');
        let liEmptyItem = document.createElement('li');

        const emptyParagraph = document.createElement('p');
        emptyParagraph.innerHTML=`Your bag is empty.`;

        liEmptyItem.appendChild(emptyParagraph);

        console.log(arr);

        if (arr.length !== 0){
            arr.map((el,id)=>{
            const liItem = document.createElement('li');
            liItem.setAttribute("class", "list-item");
            
            const itemHeader = document.createElement('div');
            const quantity= document.createElement('p');
            quantity.innerHTML = `x ${id+1}`;
            const tooltip = document.createElement('div');
            tooltip.setAttribute("class", "tooltip");
            const tooltipText = document.createElement('span');
            tooltipText.setAttribute("class", "tooltiptext");
            tooltipText.innerHTML = "Delete ?";
            tooltip.appendChild(tooltipText);

            const removeButton = document.createElement('button');
            const removeIcon = document.createElement('img');
            removeIcon.setAttribute("src", "assets/icon/trash.svg");
            removeIcon.setAttribute("alt", "");
            removeButton.appendChild(removeIcon);

            removeButton.addEventListener('click', function (){
                arr = arr.filter((element,ind)=>(element.title !== el.title));
                sessionStorage.setItem("userOrder", JSON.stringify(arr));
                location.reload();
            });

            itemHeader.setAttribute("class", "item-header");
            liItem.appendChild(itemHeader);

            itemHeader.appendChild(quantity);

            tooltip.appendChild(removeButton);
            itemHeader.appendChild(tooltip);

            const itemContent = document.createElement('div');
            itemContent.setAttribute("class", "item-content");

            const img = document.createElement("img");
            img.setAttribute("class", "card-media");
            img.setAttribute("src", el.imageLink);
            img.style.height = '80px';
            img.setAttribute("alt", `cover of ${el.title}`);

            

            const title = document.createElement('p');
            title.innerHTML = el.title.slice(0,30).concat("...");

            itemContent.appendChild(img);
            itemContent.appendChild(title);
            liItem.appendChild(itemContent);

            const itemFooter = document.createElement('div');
            itemFooter.setAttribute("class", "item-footer");
            const price = document.createElement('p');
            price.innerHTML =`${el.price} $`;
            itemFooter.appendChild(price);
            liItem.appendChild(itemFooter);

            return orderList.appendChild(liItem);
        });
        } else {
            orderList.appendChild(liEmptyItem);
        };
        return document.querySelector('.sidebar-content').appendChild(orderList);
    };

    setOrderList(userOrderId);
    return modal;
};