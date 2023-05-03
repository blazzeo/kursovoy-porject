function verify() {
  event.preventDefault();
  let userName = document.getElementById('user').value;
  let userPassword = document.getElementById('password').value;
  let userEmail = document.getElementById('email').value;

  const newUser = {
    username: userName,
    password: userPassword,
    email: userEmail
  }

  if (userName == '' || userPassword == '' || userEmail == '') {
    errorElement.textContent = 'Both fields must be field.';
            errorElement.classList.remove("hidden");
  } else if (userPassword.length <= 8) {
    errorElement.textContent = 'Password must be longer than 8 characters.';
            errorElement.classList.remove("hidden");
  } else {
    fetch("http://localhost:3000/signup", {
      method: "POST", // указываем метод запроса
      headers: { "Content-Type": "application/json" }, // указываем заголовки запроса
      body: JSON.stringify(newUser), // преобразуем объект JavaScript в JSON-строку и передаем в теле запроса
    })
      .then((response) => response.json()) // преобразуем ответ от сервера в объект JavaScript
      .then((data) => console.log(data)) // выводим полученные данные в консоль
      .catch((error) => console.error(error)); // обрабатываем ошибки
  }
}