import { confirmForm } from "./confirmForm.js";
export const orderForm = () => {

    const data = {
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
       data.paymentType.length > 0 &&
       data.gifts.length > 0) ? false : true
    );

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
    firstNameInput.setAttribute("value", data.firstName);

    const lastNameInput = document.createElement('input');
    lastNameInput.setAttribute("type", "text");
    lastNameInput.setAttribute("id", "lname");
    lastNameInput.setAttribute("minlength", "5");
    lastNameInput.setAttribute("required", "");

    const deliveryDateInput = document.createElement('input');
    deliveryDateInput.setAttribute("type", "date");
    deliveryDateInput.setAttribute("id", "delivery");
    deliveryDateInput.setAttribute("max", Date.now());
    deliveryDateInput.setAttribute("required", "");

    const streetInput = document.createElement('input');
    streetInput.setAttribute("type", "text");
    streetInput.setAttribute("id", "street");
    streetInput.setAttribute("required", "");

    const houseNumberInput = document.createElement('input');
    houseNumberInput.setAttribute("type", "text");
    houseNumberInput.setAttribute("id", "house");

    const flatNumberInput = document.createElement('input');
    flatNumberInput.setAttribute("type", "text");
    flatNumberInput.setAttribute("id", "flat");
    flatNumberInput.setAttribute("required", "");

    const fieldset = document.createElement('fieldset');
    fieldset.setAttribute("id", "radio-group");

    const paymentTypeInput1 = document.createElement('input');
    paymentTypeInput1.setAttribute("type", "radio");
    paymentTypeInput1.setAttribute("id", "payment-cash");
    paymentTypeInput1.setAttribute("value", "Cash");
    paymentTypeInput1.setAttribute("required", "");
    paymentTypeInput1.setAttribute("name", "radio-group");
    const payLabel1 = document.createElement('label');
    payLabel1.setAttribute("for", "payment-cash");
    payLabel1.innerHTML = `Cash`;

    fieldset.appendChild(paymentTypeInput1);
    fieldset.appendChild(payLabel1);

    const paymentTypeInput2 = document.createElement('input');
    paymentTypeInput2.setAttribute("type", "radio");
    paymentTypeInput2.setAttribute("id", "payment-card");
    paymentTypeInput2.setAttribute("value", "Card");
    paymentTypeInput2.setAttribute("required", "");
    paymentTypeInput2.setAttribute("name", "radio-group");
    const payLabel2 = document.createElement('label');
    payLabel2.setAttribute("for", "payment-card");
    payLabel2.innerHTML = `Card`;

    fieldset.appendChild(paymentTypeInput2);
    fieldset.appendChild(payLabel2);

    const fieldset2 = document.createElement('fieldset');
    fieldset2.setAttribute("id", "checkbox-group");

    const giftsArray = [`Pack as a gift`, `Postcard`, `Provide 2% discount to the next time`, `Branded pen or pencil`];

    giftsArray.map((el,id)=> {
        let giftsCheckboxInput = document.createElement('input');
        giftsCheckboxInput.setAttribute("type", "checkbox");
        giftsCheckboxInput.setAttribute("id", `gifts${id}`);

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

    form.appendChild(firstNameLabel);
    form.appendChild(firstNameInput);

    form.appendChild(lastNameLabel);
    form.appendChild(lastNameInput);

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
    submitButton.setAttribute("class", "button-submit");
    submitButton.innerHTML = `Confirm order`;

    form.appendChild(submitButton);

    const handleSubmit = (e) => {
        const app = document.querySelector('#app');
        app.innerHTML =``;
        app.append(confirmForm());
    };

    form.addEventListener('submit', handleSubmit())

    return boxForm;
}