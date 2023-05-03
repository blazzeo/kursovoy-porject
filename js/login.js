errorElement = document.querySelector('#errorElement');

function xmlVerify(inputName, inputPassword) {
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: inputName,
          password: inputPassword
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // перенаправляем на другую страницу
          window.location.href = '../blog.html';
        } else {
          // выводим ошибку на текущей странице;
          errorElement.textContent = 'Wrong username or password.';
          errorElement.classList.remove("hidden");
        }
      })
      .catch(error => console.error(error));
}

function checkUser() {
    event.preventDefault();
    var inputName = document.getElementById('username').value;
    var inputPassword = document.getElementById('password').value;

    if (inputName == "" || inputPassword == "") {
        errorElement.textContent = 'Both fields must be field.';
        errorElement.classList.remove("hidden");
    } else if (inputPassword.length <= 8) {
        errorElement.textContent = 'Password must be longer than 8 characters.';
        errorElement.classList.remove("hidden");
    } else xmlVerify(inputName, inputPassword);
}