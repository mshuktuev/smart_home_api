# Template REST Server

Сервак для API, построен на системе микросервисов, можно интегрировать несколько ОРМ и БД в будущем

### И спользуемые библиотеки:

- Express: [GitHub](https://github.com/expressjs/express) | [npm](https://www.npmjs.com/package/express) | [Сайт](https://expressjs.com/)
  - body-parser: [GitHub](https://github.com/expressjs/body-parser) | [npm](https://www.npmjs.com/package/body-parser)
  - multer: [GitHub](https://github.com/expressjs/multer) | [npm](https://www.npmjs.com/package/multer)
  - cors: [GitHub](https://github.com/expressjs/cors) | [npm](https://www.npmjs.com/package/cors)
  - helmet: [GitHub](https://github.com/helmetjs/helmet) | [npm](https://www.npmjs.com/package/helmet) | [Сайт](https://helmetjs.github.io/)
  - http-status: [GitHub](https://github.com/adaltas/node-http-status) | [npm](https://www.npmjs.com/package/http-status)
- Nodemailer [GitHub](https://github.com/nodemailer/nodemailer) | [npm](https://www.npmjs.com/package/nodemailer) | [Сайт](https://nodemailer.com/)
- jsonwebtoken [GitHub](https://github.com/auth0/node-jsonwebtoken) | [npm](https://www.npmjs.com/package/jsonwebtoken)
- uuid [GitHub](https://github.com/uuidjs/uuid) | [npm](https://www.npmjs.com/package/uuid)
- bcrypt [GitHub](https://github.com/kelektiv/node.bcrypt.js) | [npm](https://www.npmjs.com/package/bcrypt)
- Dotenv [GitHub](https://github.com/motdotla/dotenv) | [npm](https://www.npmjs.com/package/dotenv)
- Nodemon [GitHub](https://github.com/remy/nodemon) | [npm](https://www.npmjs.com/package/nodemon) | [Сайт](https://nodemon.io/)

### Example `api`

#### User

- GET `/api/users`
- GET `/api/users/:user_id`
- POST `/api/users/add`
- POST `/api/users/update`
- DELETE `/api/users/:user_id`

#### Auth

- GET `/api/auth`
- GET `/api/auth/isAuth`
- POST `/api/auth/refreshToken`
