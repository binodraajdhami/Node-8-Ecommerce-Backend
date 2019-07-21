module.exports = function(req, res, next){
    // if(req.headers.token == 'ram'){
    //     return next();
    // } else{
    //     return res.json({
    //         msg: 'Your are not authenticate'
    //     });
    // }
    next();
}