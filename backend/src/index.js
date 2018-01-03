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
mongoose.connect('mongodb://localhost/asked', (err, db) => {
    if(err){console.error(err)}
    else{console.log('connected to mongodb server')}
})


const MongoStore = connectMongo(session);

app.use(session({
    secret: 'asjfeisss#@sedc#@J3209dslfs',
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


let port = 80;
app.listen(port, () => {
    console.log('Express is running on port', port);
});
