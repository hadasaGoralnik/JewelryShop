document.addEventListener('DOMContentLoaded', () => {
    // מאזין לטופס הכניסה
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const loginData = {
            name: document.getElementById('login-username').value, 
            password: document.getElementById('login-password').value
        };

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server responded with an error:', errorData);
                alert("הכניסה נכשלה: " + errorData.message);
                return;
            }

            const result = await response.json();
            console.log(result);
            alert("הכניסה בוצע בהצלחה !!!!");
        } catch (error) {
            console.error('Error:', error);
            alert("Error occurred during login.");
        }
    });

    // מאזין לטופס ההרשמה
    document.getElementById('registerForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const userData = {
            name: document.getElementById('register-username').value,
            email: document.getElementById('register-email').value,
            password: document.getElementById('register-password').value
        };

        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server responded with an error:', errorData);
                alert("ההרשמה נכשלה: " + errorData.message);
                return;
            }

            const result = await response.json();
            console.log(result);
            alert("ההרשמה בוצע בהצלחה!!!!");

            // סגירת ה-Modal אחרי הרשמה מוצלחת
            const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            registerModal.hide();

            // העברת השם לטופס הכניסה אוטומטית
            document.getElementById('login-username').value = userData.name;

            // מיקוד שדה הסיסמה בטופס הכניסה
            document.getElementById('login-password').focus();

        } catch (error) {
            console.error('Error:', error);
            alert("Error occurred during registration.");
        }
    });
});
