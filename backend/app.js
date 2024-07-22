require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { errors } = require("celebrate");
const cors = require("cors");

const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const NotFoundError = require("./errors/NotFoundError");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001, DB_URL = "mongodb://127.0.0.1:27017/mestodb" } =
  process.env; // переменная окружения

const app = express();

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

app.use(helmet());

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// подключаемся к серверу mongo
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter);

app.use("/signin", require("./routes/signin"));
app.use("/signup", require("./routes/signup"));

app.use(auth);

app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));

app.use("*", (req, res, next) => {
  next(new NotFoundError("страница не найдена"));
});

// app.use('/', require('./routes/index'));

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

// централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT);
