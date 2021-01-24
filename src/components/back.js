const express = require('express');
const bodyParser = require('body-parser');
const formRouter = express.Router();
formRouter.use(bodyParser.urlencoded({
    extended: false
}));
formRouter.use(bodyParser.json());
formRouter.route("/")
.post((req, res) => {
    if (req.body != null) { 
    console.log("bitch",req.body)	
    } 
     else {
        err = new Error('Form not found in request body');
        err.status = 404;
    }
})
