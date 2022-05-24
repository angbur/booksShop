import { confirmForm } from "./confirmForm.js";
export const orderForm = () => {

   let data = {
        firstName: '',
        lastName: '',
        deliveryDate: '',
        street: '',
        house: '',
        flat: '',
        paymentType: '',
        gifts: []
    }

    const checkForm = () => (
      ( data.firstName.length > 0 &&
       data.lastName.length > 0 &&
       data.deliveryDate.length > 0 &&
       data.street.length > 0 &&
       data.house.length > 0 &&
       data.flat.length > 0 &&
       (data.paymentType === 'Cash' || data.paymentType === 'Card')
    ));

    const handleChange = (e) => {
        e.preventDefault();
        let value = '';
        if (e.target.min && e.target.min>Date.parse(e.target.value)) {
            alert('You can`t choose this date!')
            e.target.value = '';
        } else {
            value = e.target.value.trim('');
        }
        data = {
            ...data,
            [e.target.name.trim()]: value
          };
        if (checkForm()) {
            document.querySelector('#confirm-button').classList.remove('button-disabled') ;
            document.querySelector('#confirm-button').disabled = false;
        } else {
            document.querySelector('#confirm-button').classList.add('button-disabled');
            document.querySelector('#confirm-button').disabled = true;
        }
    };

    const validateCheckboxes = () => {
        let numberOfCheckedItems = 0;  
        const checkboxes = document.getElementsByName("gifts"); 
        for(let i = 0; i < checkboxes.length; i++)  
        {  
            if(checkboxes[i].checked)  
                numberOfCheckedItems++;  
        }  
        if(numberOfCheckedItems > 2)  
        {  
            alert("You can't select more than two gifts!");  
            return false;  
        }  
    }

    const handleChangeGifts = (e) => {
        e.preventDefault();
        validateCheckboxes();
        const value = e.target.value;
        if (data.gifts.includes(value)){
            data.gifts.splice(data.gifts.indexOf(value.toString(),1))
        } else {
            data.gifts.push(value);
        }
    };

    const boxForm = document.createElement('div');
    boxForm.setAttribute("class", "box");

    const title = document.createElement('h2');
    title.innerHTML = `Order form`;
    boxForm.appendChild(title);

    const form = document.createElement('form');
    boxForm.appendChild(form);

    const firstNameInput = document.createElement('input');
    firstNameInput.setAttribute("type", "text");
    firstNameInput.setAttribute("id", "fname");
    firstNameInput.setAttribute("minlength", "4");
    firstNameInput.setAttribute("required", "");
    firstNameInput.setAttribute("autofocus", true);
    firstNameInput.setAttribute("name", "firstName");
    firstNameInput.setAttribute("value", data.firstName);
    firstNameInput.setAttribute("pattern", "[a-zA-Z]+");
    firstNameInput.addEventListener('change', handleChange);

    const lastNameInput = document.createElement('input');
    lastNameInput.setAttribute("type", "text");
    lastNameInput.setAttribute("id", "lname");
    lastNameInput.setAttribute("minlength", "5");
    lastNameInput.setAttribute("required", "");
    lastNameInput.setAttribute("name", "lastName");
    lastNameInput.setAttribute("value", data.lastName);
    lastNameInput.setAttribute("pattern", "[a-zA-Z]+");
    lastNameInput.addEventListener('change', handleChange);

    const deliveryDateInput = document.createElement('input');
    deliveryDateInput.setAttribute("type", "date");
    deliveryDateInput.setAttribute("id", "delivery");
    deliveryDateInput.setAttribute("min", Date.now());
    deliveryDateInput.setAttribute("required", "");
    deliveryDateInput.setAttribute("value", data.deliveryDate);
    deliveryDateInput.setAttribute("name", "deliveryDate");
    deliveryDateInput.addEventListener('change', handleChange);

    const streetInput = document.createElement('input');
    streetInput.setAttribute("type", "text");
    streetInput.setAttribute("id", "street");
    streetInput.setAttribute("required", "");
    streetInput.setAttribute("value", data.street);
    streetInput.setAttribute("name", "street");
    streetInput.setAttribute("min", "5");
    streetInput.addEventListener('change', handleChange);

    const houseNumberInput = document.createElement('input');
    houseNumberInput.setAttribute("type", "text");
    houseNumberInput.setAttribute("id", "house");
    houseNumberInput.setAttribute("value", data.house);
    houseNumberInput.setAttribute("name", "house");
    houseNumberInput.setAttribute("pattern", "[0-9]+");
    houseNumberInput.addEventListener('change', handleChange);

    const flatNumberInput = document.createElement('input');
    flatNumberInput.setAttribute("type", "text");
    flatNumberInput.setAttribute("id", "flat");
    flatNumberInput.setAttribute("required", "");
    flatNumberInput.setAttribute("value", data.flat);
    flatNumberInput.setAttribute("name", "flat");
    flatNumberInput.setAttribute("pattern", "[0-9]+");
    flatNumberInput.addEventListener('change', handleChange);

    const fieldset = document.createElement('fieldset');
    fieldset.setAttribute("id", "radio-group");

    const paymentTypeInput1 = document.createElement('input');
    paymentTypeInput1.setAttribute("type", "radio");
    paymentTypeInput1.setAttribute("id", "payment-cash1");
    paymentTypeInput1.setAttribute("value", "Cash");
    paymentTypeInput1.setAttribute("class", "radio-group");
    paymentTypeInput1.setAttribute("name", "paymentType");
    paymentTypeInput1.addEventListener('change', handleChange);

    const payLabel1 = document.createElement('label');
    payLabel1.setAttribute("for", "payment-cash1");
    payLabel1.innerHTML = `Cash`;

    fieldset.appendChild(paymentTypeInput1);
    fieldset.appendChild(payLabel1);

    const paymentTypeInput2 = document.createElement('input');
    paymentTypeInput2.setAttribute("type", "radio");
    paymentTypeInput2.setAttribute("id", "payment-card2");
    paymentTypeInput2.setAttribute("value", "Card");
    paymentTypeInput2.setAttribute("class", "radio-group");
    paymentTypeInput2.setAttribute("name", "paymentType");
    paymentTypeInput2.addEventListener('change', handleChange);

    const payLabel2 = document.createElement('label');
    payLabel2.setAttribute("for", "payment-card2");
    payLabel2.innerHTML = `Card`;

    fieldset.appendChild(paymentTypeInput2);
    fieldset.appendChild(payLabel2);

    const fieldset2 = document.createElement('fieldset');
    fieldset2.setAttribute("id", "checkbox-group");

    const giftsArray = [`Pack as a gift`, `Postcard`, `2% discount to the next time`, `Branded pen or pencil`];

    giftsArray.map((el,id)=> {
        let giftsCheckboxInput = document.createElement('input');
        giftsCheckboxInput.setAttribute("type", "checkbox");
        giftsCheckboxInput.setAttribute("id", `gifts${id}`);
        giftsCheckboxInput.setAttribute("name", "gifts");
        giftsCheckboxInput.setAttribute("value", (Array.from(el).join("")).replace(",",));
        giftsCheckboxInput.addEventListener('change', handleChangeGifts);

        const checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute("for", "gifts${id}");
        checkboxLabel.innerHTML = el;

        const checkboxItem = document.createElement('div');
        checkboxItem.appendChild(giftsCheckboxInput);
        checkboxItem.appendChild(checkboxLabel);

        fieldset2.appendChild( checkboxItem);

        return fieldset2;
    });

    const firstNameLabel= document.createElement('label');
    firstNameLabel.setAttribute("for", "fname");
    firstNameLabel.innerHTML = `Name:`;

    const lastNameLabel= document.createElement('label');
    lastNameLabel.setAttribute("for", "lname");
    lastNameLabel.innerHTML = `Surname:`;

    const deliveryDateLabel = document.createElement('label');
    deliveryDateLabel.setAttribute("for", "delivery");
    deliveryDateLabel.innerHTML = `Delivery date:`;

    const streetLabel = document.createElement('label');
    streetLabel.setAttribute("for", "street");
    streetLabel.innerHTML = `Street:`;

    const houseNumberLabel = document.createElement('label');
    houseNumberLabel.setAttribute("for", "house");
    houseNumberLabel.innerHTML = `House Number:`;

    const flatNumberLabel = document.createElement('label');
    flatNumberLabel.setAttribute("for", "flat");
    flatNumberLabel.innerHTML = `Flat Number:`;

    let firstNameTooltip = document.createElement('p');
    firstNameTooltip.setAttribute("class", "form-tooltip");
    firstNameTooltip.innerHTML = `First a capital letter, min 4 character`;
    form.appendChild(firstNameLabel);
    form.appendChild(firstNameInput);
    form.appendChild(firstNameTooltip);

    let lastNameTooltip = document.createElement('p');
    lastNameTooltip.setAttribute("class", "form-tooltip");
    lastNameTooltip.innerHTML = `First a capital letter, min 5 character`;

    form.appendChild(lastNameLabel);
    form.appendChild(lastNameInput);
    form.appendChild(lastNameTooltip);
    
    form.appendChild(deliveryDateLabel);
    form.appendChild(deliveryDateInput);

    form.appendChild(streetLabel);
    form.appendChild(streetInput);

    form.appendChild(houseNumberLabel);
    form.appendChild(houseNumberInput);

    form.appendChild(flatNumberLabel);
    form.appendChild(flatNumberInput);

    const paymentLabel = document.createElement('h3');
    paymentLabel.innerHTML = `Choose the payment:`;
    form.appendChild(paymentLabel);
    form.appendChild(fieldset);

    const giftsCheckboxLabel = document.createElement('h3');
    giftsCheckboxLabel.innerHTML = `Check two extra gifts:`;
    form.appendChild(giftsCheckboxLabel);
    form.appendChild(fieldset2);

    const submitButton = document.createElement('input');
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Submit");
    submitButton.setAttribute("id", "confirm-button");
    submitButton.setAttribute('disabled', true);
    submitButton.setAttribute("class", "button-submit");
    submitButton.innerHTML = `Confirm order`;

    form.appendChild(submitButton);   
    submitButton.classList.add('button-disabled');

    return boxForm;
}