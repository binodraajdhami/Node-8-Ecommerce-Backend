module.exports = function(req, res, next) {

    if (req.loggedInUser.role == 1) {
        return next();
    } else {
        res.json({
            msg: 'Your dont have access'
        });
    }

}