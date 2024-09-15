const listProductHTML = document.querySelector('.listProduct');
let productSelect = JSON.parse(localStorage.getItem('productSelect')) || [];

document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const productName = params.get('name');
    const productPrice = params.get('price');
    const productImage = params.get('image');
    const productTitle = params.get('title');

    console.log(productImage)

    const selectItem = document.getElementById('product-info');
    selectItem.innerHTML = `
    <div class="d-flex justify-content-center align-items-center">
    <div class="card mt-4 mb-3" id="productCard" >
        <div class="row g-0">
            <div class="col-sm-6">
                <img src="${productImage}" class="card-img-top" alt="${productName}">
            </div>
            <div class="col-sm-6">
                <div class="card-body text-center">
                    <h4 class="card-title">
                        <a class="text-dark">${productName}</a>
                    </h4>
                    <p class="card-text mt-3">${productTitle}</p>
                    <p class="card-text mt-3">$${productPrice}</p>
                    <select id="productColor">
                        <option value="בחר\\י ד גוון">בחר\\י גוון</option>
                        <option value="זהב לבן">זהב לבן</option>
                        <option value="זהב צהוב">זהב צהוב</option>
                        <option value="זהב אדום">זהב אדום</option>
                    </select>
                    <label for="productColor">:גוון זהב</label>
                </div>
                <button class="col-12  bg-golden my-button"><a href="./cart.html?id=${productId}&name=${encodeURIComponent(productName)}&price=${productPrice}&image=${productImage}&quantity=${1}" class="text-black">הוסף לסל</a></button>
            </div>
        </div>
    </div>
</div>


`;

    document.body.appendChild(selectItem)
    const purchaseButton = document.getElementById('purchaseButton');


});


// הצגת השם משתמש 
document.addEventListener('DOMContentLoaded', function () {
    var username = localStorage.getItem("username");
    if (username) {
        $("#user-nav-item").text(username + ", שלום").show();
        document.getElementById("user-nav-item").innerText =  username + "    ,שלום" ;
    }
});

