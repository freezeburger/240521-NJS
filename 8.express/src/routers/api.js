const express = require('express');
const { MessageService } = require('../services/message.service');
const router = express.Router()
const bodyParser = require('body-parser')

router.route('/')
    .all((req, res) => {
        res.send( 'You must specify a resource' )
    })

router
    .use(bodyParser.json())
    .route('/:resource')
    // C-reate
    .all((req, res, next) => {
        if( req.params.resource === 'messages' ){
            req.service = MessageService;
            next()
        }else{
            res.end( 'Invalid resource' )
        }
    })
    .post((req, res) => {
        console.log(req.body)
        res.send('POST' + req.params.resource )
    })
    // R-ead
    .get((req, res) => {
        console.log(req.service)
        res.send('GET' + req.params.resource )
    })
    // U-pdate
    .put((req, res) => {
        res.send('PUT!'  + req.params.resource )
    })
    // D-elete
    .delete((req, res) => {
        res.send('DELETE' + req.params.resource )
    });

module.exports= router;