const express = require('express');
const xml2js = require('xml2js');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const builder = new xml2js.Builder();
const parser = new xml2js.Parser({
  explicitArray: false,
  normalizeTags: true,
});

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

app.post('/signup', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  console.log(req.body);
  fs.readFile('../users.xml', 'utf-8', (err, xml) => {
    if (err) throw err;
    let newXML;
    parser.parseString(xml, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        result.users.user.push(req.body);
        newXML = builder.buildObject(result);
      }
    });
    
    fs.writeFile('../users.xml', newXML, (err) => {
      if (err) throw err;
      console.log('Новый пользователь добавлен в файл');
      // Если все прошло успешно, отправляем ответ клиенту
      // return res.status(200).send('Файл успешно обновлен');
      res.json({ success: true });
    });
  });
});

app.post('/login', (req, res) => {
  const name = req.body.username;
  const password = req.body.password;

  const user = {
    username: name,
    password: password
  };

  fs.readFile('../users.xml', 'utf-8', (err, xml) => {
    if (err) throw err;
    parser.parseString(xml, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        let userFound = false;
        for (const user of result.users.user) {
          if (user.username == name && user.password == password) {
            userFound = true;
            console.log('user exist');
            res.json({ success: true });
            break;
          }
        }
        if (!userFound) {
          console.log('no user\n');
          res.json({ success: false });
        }
      }
    });
  });
});


app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});