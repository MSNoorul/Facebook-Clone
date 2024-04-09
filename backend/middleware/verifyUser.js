const User = require('../modal/user');

async function verifyUser(req,res,path) {
const regex = /^\/post\/\w+\/(\w+)$/
const Id = regex.exec(path)[1];
try{
    const founduser = await User.findById(Id);
    if(founduser.username !== req.user) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "like not found" + Id }));
    }
    next();
}catch(e){
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: e }));
}



}

module.exports = verifyUser;
