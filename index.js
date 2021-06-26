const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const yup = require("yup");
const monk = require('monk');
const {nanoid} = require("nanoid");
const path = require("path");

require('dotenv').config();

const db = monk(process.env.MONGODB_URI);
const urls = db.get('urls');
urls.createIndex({slug: 1}, {unique: true})

const app = express();


app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './client/public')));

app.get('/url/:id', (req, res) => {
    // TODO: Fetch a short url by id
x
});

app.get('/:id', async (req, res) => {
    // TODO: Redirect to URL.
    const {id: slug} = req.params;
    console.log(req.params);
    try {
        const url = await urls.findOne({slug});
        if(url) {
            res.redirect(url.url);
        }
        res.redirect(`/?error=${slug} not found`);
    } catch (error) {
        res.redirect(`/?error=Link not found`);    
    }
});

app.use((error, req, res, next) => {
    if (error.status) {
        res.status(error.status);
    } else {
        res.status(500);
    }

    res.json({
        message:error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
    })
})

const schema = yup.object().shape({
    slug: yup.string().trim().matches(/[\w\-]/i),
    url: yup.string().trim().url().required(),
});

app.post('/url', async (req, res, next) => {
    // TODO: Create a short url
    let {slug, url} = req.body;
    try {
        await schema.validate({
            slug,
            url
        })
        if(!slug) {
            slug = nanoid(5);
        } else {
            const existing = await urls.findOne({slug});
            if(existing) {
                throw new Error('Slug in use. 🐌')
            }
        }
        slug = slug.toLowerCase();
        const newUrl = {
            url,
            slug,
        };

        const created = await urls.insert(newUrl);
        res.json(created);

    } catch (error) {
        next(error);
    }
});

app.get('/.*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
});

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at https://localhost:${port}`);
});