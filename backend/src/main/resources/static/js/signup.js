document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('section');

    signupForm.style.opacity = 0;

    setTimeout(() => {
        signupForm.style.transition = 'opacity 1s ease-in-out';
        signupForm.style.opacity = 1;
    }, 500);

    const form = signupForm.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(form);
            const user = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            fetch('/req/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
            .then(async res => {
                const message = await res.text(); // взимаме текста от backend-a
                if (res.ok) {
                    alert(message); // "Регистрацията е успешна!"
                    window.location.href = '/index'; 
                } else {
                    alert(message); // "Потребителското име вече съществува!"
                }
            })
            .catch(err => console.error(err));
        });
    }
});
