document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signupForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert("Паролите не съвпадат!");
            return;
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
        if (!passwordPattern.test(password)) {
            alert("Паролата трябва да е поне 8 символа, да съдържа главна и малка буква, цифра и специален знак!");
            return;
        }

        const user = { username, email, password };

        fetch('/req/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        .then(res => {
            if (res.ok) {
                window.location.href = '/req/login';
            } else {
                res.text().then(message => alert(message));
            }
        })
        .catch(err => console.error(err));
    });
});
