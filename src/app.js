import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


let jsonParser = bodyParser.json();

const app = express();
const port = 3001;
const { text } = bodyParser;
const { Schema } = mongoose;

app.use(jsonParser);

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
// }).then(() => {
//     console.log('MONGOOSE SUCCESS!!!!');
// }).catch((error) => {
//     console.log('MONGOOSE FAIL!!!!!!', error)
// });

const testSchema = new mongoose.Schema({
    name: String,
    email: String,
    DOB: Date
});

const TestModel = mongoose.model('test', testSchema);

app.use(express.json());


app.post('/testPost', (req, res) => {
    // .save() - SAVE ONE DOCUMENT TO MONGODB COLLECTION
    // const test = new TestModel(req.body);
    // test.save().then((test) => {
    //     res.status(201).send(test)
    // }).catch((err) => {
    //     res.status(400).send(err);
    // })

    // .create() - SAVES ONE OR MORE DOCUMENTS TO DB AND RUNS .save() FOR EVERY DOC IN DOCS
    // TestModel.create(req.body).then((test) => {
    //     res.status(201).send(test);
    // }).catch((err) => {
    //     res.status(400).send(err);
    // })

    // .insertMany() - FASTER THAN .create() BECAUSE IT ONLY SENDS ONE OPERATION TO SERVER AND NOT MANY FOR EACH DOCUMENT
    TestModel.insertMany(req.body).then((tests) => {
        res.status(201).send(tests);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

app.get('/testGet/:name', (req, res) => {  //POSTMAN DOES NOT NEED COLON FOR REQUESTS AND MUST BE CASE SENSITIVE
    const {body, params} = req;
    TestModel.find({name: params.name}).then((test) => { //NEEDED TO PUT 'PARAMS.NAME' HERE INSTEAD OF JUST 'PARAMS'
        res.status(201).send(test);
        console.log(req)
    }).catch((err) => {
        // console.log(err)
        res.status(400).send(err);
    })
})

app.patch('/testPatch/:name', (req, res) => { //TAKES IN NAME AND REQUESTS WILL OVERWRITE WHAT IS CURRENTLY IN DB
    const {params} = req;
    TestModel.updateOne({name: params.name}, req.body).then((replace) => {
        res.status(200).send(replace);
        console.log(req)
    }).catch((err) => {
        res.status(400).send(err);
    })
})

app.delete('/testDelete/:name', (req, res) => {
    const {params} = req;
    TestModel.deleteOne({name: params.name}, req.body).then((del) => {
        res.status(200).send(del);
        console.log(params)
    }).catch((err) => {
        res.status(400).send(err);
    })
})

// app.get('/api/teams/:id', (req, res) => {
//     const {params} = req;
//     console.log(params);
//     res.send(params.name)
// });

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// app.post('/post', (req, res) => { // create form and bring in body parser
//     const {body, params} = req;
//     console.log(body)
//     res.json(body)
// });

// app.post('/post/:id', (req, res) => { 
//     const {body, params} = req;
//     console.log(params)
//     res.json(body)
// });





app.listen(port, () => console.log('I LOVE YOU' + ' ' + 3001))