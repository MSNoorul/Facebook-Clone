const User = require("../../modal/user");
const ResponseJson = require("../../utils/handleResponse");

async function findFollowers (req , res ,path){
    const regex = /^\/user\/followers\/(\w+)$/;
    const Id = regex.exec(path)[1];

    try {
        const user = await User.findById(Id).populate('followers');
        if(!user)  ResponseJson(res,404,{message: 'User Not Found' })
        ResponseJson(res,200,user.followers)
    }
    catch(e){
        ResponseJson(res,500,{message: e.message })
    }
}

module.exports = findFollowers;