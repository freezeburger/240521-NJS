
module.exports = (req, res, next) => {
    console.log(req.url);
    res.setHeader('X-Powered', 'Orsys-Team')
    next()
}