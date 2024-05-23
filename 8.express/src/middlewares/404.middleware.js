
module.exports = (req, res, next) => {
    res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
}