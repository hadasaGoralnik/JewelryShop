

// פונקציה לחישוב סך הכל
function calculateTotal(cartItems) {
    return cartItems.reduce((total, item) => {
        return total + (item.productPrice * item.quantity);
    }, 0);
}

// פונקציה לשמירת העגלה ב-LocalStorage
function saveCartToLocalStorage(cartItems) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// פונקציה לטעינת עגלה מ-LocalStorage
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
}

// פונקציה לשליפת העגלה מהשרת
async function fetchCart(userName) {
    if (!userName) {
        console.error('User name is not defined!');
        return [];
    }

    const encodedUserName = encodeURIComponent(userName); // קידוד השם
    const url = `http://localhost:3001/api/cart/${encodedUserName}`;

    console.log("Fetching cart from:", url); // דיבוג
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch cart');
        }

        const data = await response.json();
        const cartItems = data.cart.items;

        // שמירת העגלה ב-LocalStorage
        saveCartToLocalStorage(cartItems);

        return cartItems;
    } catch (error) {
        console.error('Error fetching cart:', error);
        return [];
    }
}

// פונקציה להצגת עגלה
async function renderCart() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user ? user.name : null;  // קבלת שם המשתמש מהלוקל סטורג'

    console.log("User Name:", userName);  // הדפסה של שם המשתמש

    // ננסה קודם כל לטעון את העגלה מה-LocalStorage
    let cartItems = loadCartFromLocalStorage();

    // אם אין פריטים ב-LocalStorage, נשלוף מהשרת
    if (cartItems.length === 0) {
        cartItems = await fetchCart(userName);
    }

    // ניהול ההצגה של העגלה
    document.getElementById("rend").style.display = "none";
    document.getElementById("topay").style.display = "inline";
    var cartDiv = document.getElementById('cart');
    var totalDiv = document.getElementById('total');
    cartDiv.innerHTML = '';
    totalDiv.textContent = '';

    if (cartItems.length === 0) {
        cartDiv.innerHTML = 'אין מוצרים להצגה';
    } else {
        cartItems.forEach(function (item, index) {
            var itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            var itemImg = document.createElement('img');
            itemImg.src = item.productImage;
            itemDiv.appendChild(itemImg);

            var itemName = document.createElement('span');
            itemName.textContent = item.productName;
            itemDiv.appendChild(itemName);

            var itemPrice = document.createElement('span');
            itemPrice.textContent = 'price: ' + item.productPrice + '$';
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

        // חישוב הסכום הכולל
        var totalAmount = calculateTotal(cartItems);
        totalDiv.textContent = 'sum: ' + totalAmount + '$';
    }
}

function changeQuantity(index, newQuantity) {
    let cartItems = loadCartFromLocalStorage();  // טוען את עגלת הקניות מה-LocalStorage
    const item = cartItems[index];
    const user = JSON.parse(localStorage.getItem('user'));  // קבלת פרטי המשתמש מה-LocalStorage
    const userName = user ? user.name : null;  // קבלת שם המשתמש

    if (!userName) {
        console.error('User name is not defined!');
        return;
    }

    // עדכון הכמות בשרת
    fetch('http://localhost:3001/api/updateCartQuantity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: userName,  // שם המשתמש
            productId: item.productId,  // מזהה המוצר
            quantity: newQuantity  // הכמות החדשה
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'העגלה עודכנה בהצלחה') {
            // עדכון ב-LocalStorage לאחר שהשרת אישר את העדכון
            cartItems[index].quantity = newQuantity;
            saveCartToLocalStorage(cartItems);
            renderCart();  // רענון התצוגה של העגלה
        } else {
            console.error('Error updating cart:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// פונקציה לשליחת בקשת POST לשרת להוספת פריט לעגלה
function addToCart(productId, productName, productPrice, productImage, quantity) {
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user ? user.name : null;  // קבלת שם המשתמש מהלוקל סטורג'

    console.log("User Name:", userName);  // הדפסה של שם המשתמש

    fetch('http://localhost:3001/api/addToCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName,        // הוספנו את שם המשתמש
            productId,      // מוודאים שה-id נשלח בפורמט הנכון
            productName,    // הוספנו את שם המוצר
            productPrice,   // הוספנו את מחיר המוצר
            productImage,   // הוספנו את תמונת המוצר
            quantity,       // הכמות
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error adding to cart:', data.error);
        } else {
            console.log('Added to cart:', data);
        }
    })
    .catch(error => {
        console.error('Error adding to cart:', error);
    });
}

async function removeFromCart(index) {
    let cartItems = loadCartFromLocalStorage();  // טוען את עגלת הקניות מה-LocalStorage
    const item = cartItems[index];
    const user = JSON.parse(localStorage.getItem('user'));  // קבלת פרטי המשתמש מה-LocalStorage
    const userName = user ? user.name : null;  // קבלת שם המשתמש

    if (!userName) {
        console.error('User name is not defined!');
        return;
    }

    // עדכון מחיקת הפריט בשרת
    fetch('http://localhost:3001/api/removeFromCart', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: userName,  // שם המשתמש
            productId: item.productId  // מזהה המוצר
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Server response:', data);  // לוג לתגובה מהשרת
        if (data.message === 'הפריט הוסר בהצלחה') {
            // עדכון ה-LocalStorage לאחר שהשרת אישר את המחיקה
            cartItems.splice(index, 1);  // הסרת הפריט מהמערך
            saveCartToLocalStorage(cartItems);  // שמירת העדכון ב-LocalStorage
            renderCart();  // רענון התצוגה של העגלה
        } else {
            console.error('Unexpected message from server:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

