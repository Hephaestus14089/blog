const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');
const app = express();
const path = require('path');

const port = 5000;
const dbUrl = 'mongodb://localhost/blog';

mongoose.connect(dbUrl);

app.set('view engine','ejs');

app.use(express.urlencoded({ extended: false }));
app.use(
	"/css",
	express.static(path.join(__dirname, "./node_modules/bootstrap/dist/css"))
);
app.use(
	"/js",
	express.static(path.join(__dirname, "./node_modules/bootstrap/dist/js"))
);


app.get('/', (req,res) => {
     const articles = [{
          title: 'Test article',
          createdAt : new Date(),
          description: 'Test description'
     }];
     res.render('articles/index', { articles: articles });
});

app.use('/articles', articleRouter);

app.listen(port, err => {
     console.log(
          err
          ? `could not establish connection :( \n${err}`
          : `listening on port ${port} :)`
     );
});