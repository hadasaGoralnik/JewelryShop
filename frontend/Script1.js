
let myArray = JSON.parse(localStorage.getItem('myArray')) || [];


document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const productName = params.get('name');
    const productPrice = params.get('price');
    const productImage = params.get('image');
    const productQuantity = params.get('quantity');

    console.log(productQuantity)
   
    addToCart(productName, parseFloat(productPrice), productImage, productQuantity);
})


function addToCart(item, price, image, quantity) {
    if (item!== null) { // בדיקה האם שם המוצר אינו ריק
        let retrievedArray = JSON.parse(localStorage.getItem('myArray')) || [];
        var itemIndex = myArray.findIndex(cartItem => cartItem.name === item);
        if (itemIndex !== -1) {
            retrievedArray[itemIndex].quantity++;
        } else {
            myArray.push({ name: item, price: price, quantity: quantity, image: image });
            localStorage.setItem('myArray', JSON.stringify(myArray));
        }
       
    }
    renderCart();
}


function removeFromCart(index) {
    myArray.splice(index, 1);
    localStorage.setItem('myArray', JSON.stringify(myArray));
    renderCart();
}

function changeQuantity(index, newQuantity) {
    myArray[index].quantity = newQuantity;
    renderCart();
}

function calculateTotal() {
    var total = 0;
    myArray.forEach(function (item) {
        total += item.price * item.quantity;
        console.log("item.quantity", item)
    });
    return total;
}




function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function submitDetails() {
    var name = document.getElementById("name").value;
    var creditCard = document.getElementById("creditCard").value;
    var tokef = document.getElementById("tokef").value;
    var tokef2 = document.getElementById("tokef2").value;
    var idown = document.getElementById("idown").value;

    if (name !== "" && creditCard !== "" && tokef !== "" && tokef2 !== "" && idown !== "") {
        alert(" התשלום בוצע בהצלחה ");
        closeModal();
        document.getElementById("name").value = "";
        document.getElementById("creditCard").value = "";
        document.getElementById("tokef").value = "";
        document.getElementById("tokef2").value = "";
        document.getElementById("idown").value = "";

    } else {
        alert("pleas full all the details.");
    }
}



function renderCart() {
    document.getElementById("rend").style.display = "none";
    document.getElementById("topay").style.display = "inline";
    var cartDiv = document.getElementById('cart');
    var totalDiv = document.getElementById('total');
    cartDiv.innerHTML = '';
    totalDiv.textContent = '';
    if (myArray.length === 0) {
        cartDiv.innerHTML = 'אין מוצרים להצגה ';
    } else {
        myArray.forEach(function (item, index) {
            var itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            var itemImg = document.createElement('img');
            // itemImg.src = item.image;
            itemImg.src = `${item.image}`
            console.log("item.image", item.image)
            itemDiv.appendChild(itemImg);
            var itemName = document.createElement('span');
            itemName.textContent = item.name;
            itemDiv.appendChild(itemName);
            var itemPrice = document.createElement('span');
            itemPrice.textContent = 'price: ' + item.price + '$';
            itemDiv.appendChild(itemPrice);
            var quantityDiv = document.createElement('div');
            quantityDiv.classList.add('quantity');
            var quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = item.quantity;
            quantityInput.min = '1';
            quantityInput.addEventListener('input', function () {
                changeQuantity(index, parseInt(this.value));
            });
            quantityDiv.appendChild(quantityInput);
            var removeButton = document.createElement('button');
            removeButton.innerHTML = '<i class="bi bi-trash"></i>';
            removeButton.addEventListener('click', function () {
                removeFromCart(index);
            });
            quantityDiv.appendChild(removeButton);
            itemDiv.appendChild(quantityDiv);
            cartDiv.appendChild(itemDiv);
        });
        var totalAmount = calculateTotal();
        totalDiv.textContent = 'sum: ' + totalAmount + '$';
    }
}

function validateName() {
    var name = document.getElementById("name").value;
    var nameError = document.getElementById("nameError");
    if (!isNaN(parseInt(name))) {
        nameError.innerText = "שדה זה מקבל רק מספרים ";
    } else {
        nameError.innerText = "";
    }
}
function validatecreditCard() {
    var creditCard = document.getElementById("creditCard").value;
    var creditCardError = document.getElementById("creditCardError");
    if (isNaN(parseInt(creditCard))) {
        creditCardError.innerText = "שדה זה מקבל רק מספרים ";
    } else {
        creditCardError.innerText = "";
    }
}
function validatetokef() {
    var tokef = document.getElementById("tokef").value;
    var tokefError = document.getElementById("tokefError");
    if (isNaN(parseInt(tokef))) {
        tokefError.innerText = "שדה זה מקבל רק מספרים ";
    } else {
        tokefError.innerText = "";
    }
}
function validatetokef2() {
    var tokef2 = document.getElementById("tokef2").value;
    var tokef2Error = document.getElementById("tokef2Error");
    if (isNaN(parseInt(tokef2))) {
        tokef2Error.innerText = "שדה זה מקבל רק מספרים ";
    } else {
        tokef2Error.innerText = "";
    }
}
function validateidown() {
    var idown = document.getElementById("idown").value;
    var idownError = document.getElementById("idownError");
    if (isNaN(parseInt(idown))) {
        idownError.innerText = "שדה זה מקבל רק מספרים ";
    } else {
        idownError.innerText = "";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var username = localStorage.getItem("username");
    if (username) {
        $("#user-nav-item").text("שלום, " + username).show();
    }
})