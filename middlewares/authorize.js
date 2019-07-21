module.exports = function(req, res, next){
    // if(req.headers.access == 'admin'){
    //     return next();
    // } else{
    //     return res.json({
    //         msg: 'Your are not authorize'
    //     });
    // }
    next();
}