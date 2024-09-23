// //htmlמציגה את  כל המוצרים מהמערך ל
// document.addEventListener('DOMContentLoaded', function () {
//     const listProductHTML = document.querySelector('.listProduct');

//     fetch('products.json')
//         .then(response => response.json())
//         .then(data => {
//             data.forEach(product => {
//                 const newProduct = document.createElement('div');
//                 const classes = ['product', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4'];
//                 classes.push(...product.type.split(' '));
//                 newProduct.classList.add(...classes)
//                 newProduct.innerHTML = `
//                 <div class="d-flex justify-content-center align-items-center">
//                     <div class="card" id="productCard">
//                         <a href="product.html?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${product.image}&title=${product.title}" class="text-dark my-button">
//                             <img src="${product.image}" class="card-img-top" alt="${product.name}">
//                         </a>
//                         <div class="card-footer bg-light">
//                         <div class="card-body text-center">
//                             <h10 class="card-title">
//                                 <a href="product.html?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${product.image}&title=${product.title}" class="text-dark my-button">${product.name}</a>
//                             </h10>
//                             <p class="card-text">$${product.price}</p>
//                         </div>  
//                     </div>
//                     </div>
//                     </div>
//                 `;


//                 listProductHTML.appendChild(newProduct);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
// });

// סינון מוצרים לפי סוג בתפריט הניווט
$(document).ready(function () {
    $('.nav-link').click(function () {
        var filter = $(this).data('filter');
        if (filter == 'all') {
            $('.product').show();
        } else {
            $('.product').hide();
            $('.product.' + filter).show();
        }
        $('#navbarOffcanvasLg').removeClass('show');
    });
});


//tooltip
$(document).ready(function () {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});


// התחברות ל-MongoDB
mongoose.connect('mongodb://localhost:27017/shopDB', {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => {
   console.log('Connected to MongoDB');
}).catch((err) => {
   console.error('Failed to connect to MongoDB', err);
});


