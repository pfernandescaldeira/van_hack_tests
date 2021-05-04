const mongoose   = require('mongoose');
const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
// const jwt        = require('jsonwebtoken');



//Configuracoes
    // Body Parser
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
 
// Mongoose
    mongoose.Promise = global.Promise; 
    mongoose.connect("mongodb://localhost/van_hack").then(() => {
        console.log("Conectado ao mongo")

    }).catch((err) => {
        console.log("Erro ao se conectar: " + err)
    })

var User = mongoose.model('User',  new mongoose.Schema({ 
    name    : { type: String, required: true },
    email   : { type: String, required: true },
    password: { type: String, required: true },
    token   : String
    }))


var Album = mongoose.model('Album', new mongoose.Schema({
    performer: String, title: String, cost: Number,
    }));
    


function verifyJWT(req, res, next) {
    
    const token = req.headers['authorization'];

    User.findOne({ token: token }, function (err, user) {
        console.log(user)
        if (err)  return res.status(401).end();

        if (user) {
            console.log("entrei user")
            next();

        }else {
            console.log("entrei else")
            return res.status(401).end();
        }
    })

    // jwt.verify( token, "SECRET_KEY", (err, decoded) => {
    //     if(err) return res.status(401).end();

    //     next();
    // })

} 


app.post('/signup', function(req, res) {

    const new_token =  req.body.email + "_" + Math.random()
    // const new_token = jwt.sign({ email: req.body.email }, "SECRET_KEY", { expiresIn: "8h" }); 
    console.log(req.body)

    User.findOne({ email   : req.body.email }, function (err, user) {
    
        if (err)  return res.status(401).end();

        if (!user) {
            
            new User({
                name    : req.body.name     , 
                email   : req.body.email    ,
                password: req.body.password ,
                token   : new_token
        
             }).save().then( new_user => {
              
                 res.set('authorization',  new_user.token)
                 res.status(204).send()
          
             }).catch( (err) => {
                  res.status(401).send("Error")  
             });    

        }else {
            return res.status(401).end();
        }
    })
});


app.post('/login', function(req, res) {

    const new_token =  req.body.email + "_" + Math.random()
    // const new_token = jwt.sign({ email: req.body.email }, "SECRET_KEY", { expiresIn: "8h" });   


    User.findOneAndUpdate({ email: req.body.email, password:req.body.password }, {token: new_token} , { new: true }, (err, user) => {
        if (err)  return res.status(401).end();

        if (user) {
            res.set('authorization', user.token)
            res.status(204).send()

        }else {
            return res.status(401).end();
        }

      });
});


app.post('/logout', verifyJWT, function(req, res) {

    const token = req.headers['authorization'];
    const new_token =  undefined

    User.findOne({token: token}, (err, user) => {
        if (err)  return res.status(401).end();

        if (user) {
            user.token = "undefined";
            user.save();
            res.status(204).send()

        }else {
            return res.status(401).end();
        }

      });
});
 

app.post('/teste', verifyJWT, function(req, res) {
    console.log(req.headers['authorization'])

    res.status(204).send({mensagem:"TOKEN VALIDO"})  

});



app.post('/albums', verifyJWT, function(req, res){   
    
    console.log(req.body)

    new Album(req.body).save((err, album) => {
      res.json({data: album});
    });
  });
 

const PORT = 8000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
}); 