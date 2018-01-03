import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import session from 'express-session';
import path from 'path'

import api from './routes';

const app = express();

app.use(function(err, req, res, next){
    console.error(err.stack)
    res.status(500).send("Something broke!")
})


app.use(bodyParser.json());
app.use(morgan('dev'))

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
const db = mongoose.connection;
mongoose.connect('mongodb://localhost/aiaikasa', (err, db) => {
    if(err){console.error(err)}
    else{console.log('connected to mongodb server')}
})


const MongoStore = connectMongo(session);

app.use(session({
    secret: 'pB32o3i4le32r32AFSpp@#@$',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000
    },
    store: new MongoStore({
       mongooseConnection: mongoose.connection,
        ttl: 365 * 24 * 60 * 60
    })
}))

app.use('/api', api);

//client side routing support
app.use(express.static(path.resolve(__dirname, "..", "frontend")))
app.get('*', (req,res)=> {
    res.sendFile(path.resolve(__dirname, "..", "frontend", "index.html"))
})


let port = 4000;
app.listen(port, () => {
    console.log('Express is running on port', port);
});

if (!process.env.NODE_ENV == "development") {
    const redirectApp = express()
    redirectApp.use('*', (req, res) => {
        res.redirect('https://aiaikasa.com' + req.url);
    })

    redirectApp.listen(5000, () => {
        console.log('Redirect server running on port 8000')
    })
}