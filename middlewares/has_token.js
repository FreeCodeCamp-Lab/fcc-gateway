module.exports = (req, res, next) => {
  if(req.headers['token']){
    next();
  }else{
    res.status(400).end('bad request');
  }
};