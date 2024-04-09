const User = require("../../modal/user");
const ResponseJson = require("../../utils/handleResponse");

async function findFollowing (req , res ,path){
    const regex = /^\/user\/following\/(\w+)$/;
    const Id = regex.exec(path)[1];

    try {
        const user = await User.findById(Id).populate('following');
        if(!user)  ResponseJson(res,404,{message: 'User Not Found' })
        ResponseJson(res,200,user.following)
    }
    catch(e){
        ResponseJson(res,500,{message: e.message })
    }
}

module.exports = findFollowing;