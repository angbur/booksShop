import { fetchData } from "./fetchData.js";
import { descriptionPopup } from "./descriptionPopup.js";

export const showCatalog = () => {
    
    const buttonFixedIcon = document.createElement("button");
    buttonFixedIcon.setAttribute("class", "icon-fixed");
    buttonFixedIcon.setAttribute("type", "button");

    const bagIcon = document.createElement("img");
    bagIcon.setAttribute("src", "assets/icon/bag-shopping.svg");
    bagIcon.setAttribute("alt", "");
    buttonFixedIcon.appendChild(bagIcon);
    document.querySelector('#app').appendChild(buttonFixedIcon);

    let title = document.createElement("h2");
    title.innerHTML = `Latest`;
    document.querySelector('#app').appendChild(title);
    
    let cardWrapper = document.createElement("div");
    cardWrapper.setAttribute("class", "card-wrapper");
    document.querySelector('#app').appendChild(cardWrapper);

    const showCard = (data) => {
        return(
            data.map((el,id)=>{
                const card = document.createElement("div");
                card.setAttribute("class", "card");
                card.setAttribute("id", id);

                const cardHeader = document.createElement("div");
                cardHeader.setAttribute("class", "card-header");

                const buttonIcon = document.createElement("button");
                buttonIcon.setAttribute("type", "button");
                const iconCart = document.createElement("img");
                iconCart.setAttribute("src", "assets/icon/cart.svg");
                iconCart.setAttribute("class", "icon-round");
                iconCart.setAttribute("alt", "");
                buttonIcon.appendChild(iconCart);

                cardHeader.appendChild(buttonIcon);
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
            })
        )
    };       

    fetchData()
    .then(data => showCard(data))
    .catch(reason => console.log(reason.message))
   
};