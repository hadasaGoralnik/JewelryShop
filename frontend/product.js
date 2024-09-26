const listProductHTML = document.querySelector('.listProduct');
let productSelect = JSON.parse(localStorage.getItem('productSelect')) || [];

// מחכה לטעינת ה-DOM
document.addEventListener('DOMContentLoaded', function () {
    // שליפת פרמטרים מה-URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const productName = params.get('name');
    const productPrice = params.get('price');
    const productImage = params.get('image');
    const productTitle = params.get('title');

    console.log(productImage);

    // קבלת ה-div שבו יופיע המוצר
    const selectItem = document.getElementById('product-info');
    // הוספת תוכן ל-div
    selectItem.innerHTML = `
    <div class="d-flex justify-content-center align-items-center">
        <div class="card mt-4 mb-3" id="productCard">
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
                  <button class="col-12 bg-golden my-button" onclick="addToCart('${productId}', '${productName}', ${productPrice}, '${productImage}', 1)">
    הוסף לסל
</button>

                </div>
            </div>
        </div>
    </div>
    `;

    
});

