import { fetchData } from "./fetchData.js";
import { descriptionPopup } from "./descriptionPopup.js";
import { bagSidebar } from "./bagSidebar.js";

export const showCatalog = () => {
    let order = [];
    if ( window.sessionStorage.getItem("userOrder") && window.sessionStorage.getItem("userOrder").length > 0) {
        order = JSON.parse(window.sessionStorage.getItem("userOrder")) || [];
    }
    
    const buttonFixedIcon = document.createElement("button");
    buttonFixedIcon.setAttribute("class", "pulsing-button icon-fixed");
    buttonFixedIcon.setAttribute("type", "button");

    const bagIcon = document.createElement("img");
    bagIcon.setAttribute("src", "assets/icon/bag-shopping.svg");
    bagIcon.setAttribute("alt", "");
    buttonFixedIcon.appendChild(bagIcon);
    document.querySelector('#app').appendChild(buttonFixedIcon);

    buttonFixedIcon.addEventListener('click', function(e) {
        e.preventDefault();

        const sidebar = bagSidebar();
        sidebar.classList.add("is-visible");
    });

    let title = document.createElement("h2");
    title.innerHTML = `Latest`;
    document.querySelector('#app').appendChild(title);
    
    let cardWrapper = document.createElement("div");
    cardWrapper.setAttribute("class", "card-wrapper");
    document.querySelector('#app').appendChild(cardWrapper);
    
    fetchData()
    .then(data => showCard(data))
    .catch(reason => console.log(reason.message))

    const showCard = (data) => {
        return(
            data ? data.map((el,id)=>{
                const card = document.createElement("div");
                card.setAttribute("class", "card");
                card.setAttribute("id", id);

                const cardHeader = document.createElement("div");
                cardHeader.setAttribute("class", "card-header");

                const price = document.createElement('h3');
                price.innerHTML = `${el.price} $`;
                cardHeader.appendChild(price);

                const tooltip = document.createElement('div');
                tooltip.setAttribute("class", "tooltip");
                const tooltipText = document.createElement('span');
                tooltipText.setAttribute("class", "tooltiptext");
                tooltipText.innerHTML = "Add to bag";
                tooltip.appendChild(tooltipText);

                const buttonIcon = document.createElement("button");
                buttonIcon.setAttribute("type", "button");
                const iconCart = document.createElement("img");
                iconCart.setAttribute("src", "assets/icon/cart.svg");
                iconCart.setAttribute("class", "icon-round");
                iconCart.setAttribute("alt", "");
                buttonIcon.appendChild(iconCart);

                buttonIcon.addEventListener('click', function () {
                    if (order.find((e,inde)=>e.title === el.title)){
                        order[id].quantity +=1;
                    } else {
                        order = [...order,{id: id, title: el.title, price: el.price, imageLink: el.imageLink, quantity: 1}];
                    }
                    sessionStorage.setItem("userOrder", JSON.stringify(order));
                    alert(`Added to cart (:`)
                    location.reload();
                })

                tooltip.appendChild(buttonIcon);

                cardHeader.appendChild(tooltip);
                card.appendChild(cardHeader);

                const cardBody = document.createElement("div");

                const img = document.createElement("img");
                img.setAttribute("class", "card-media");
                img.setAttribute("src", el.imageLink);
                img.setAttribute("alt", `cover of ${el.title}`);

                cardBody.appendChild(img);
                card.appendChild(cardBody);

                const cardFooter = document.createElement("div");
                cardFooter.setAttribute("class", "card-footer");

                cardFooter.setAttribute("class", "card-body");

                const title =  document.createElement("h4");
                title.innerHTML = el.author;

                const subTitle =  document.createElement("h3");
                subTitle.innerHTML = el.title;

                cardFooter.appendChild(title);
                cardFooter.appendChild(subTitle);

                const buttonMore = document.createElement("button");
                buttonMore.setAttribute("type", "button");
                buttonMore.setAttribute("class", "button-primary");
                buttonMore.innerHTML=`Show more...`;
                buttonMore.dataset.open = `modal-${id}`;
                cardFooter.appendChild(buttonMore);

                const modal = descriptionPopup(el,id);
                
                buttonMore.addEventListener("click", function() {
                    const modalId = this.dataset.open;
                    modal.classList.add("is-visible");
                  });
                cardWrapper.appendChild(modal);

                card.appendChild(cardFooter);
                
                cardWrapper.appendChild(card);
            }) : `Check your network`
        )
    };          
};