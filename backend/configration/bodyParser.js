async function bodyParser(req){
    return new Promise((resolve,reject)=>{
        let body = '';

        req.on('data', (chunk) => {
          body += chunk;
        });
      
        req.on('end', () => {
          try {
            let parsedBody ='';
            if(body){parsedBody = JSON.parse(body);}
            resolve(parsedBody);
        }catch (e){reject(e)}
        })
    })
 
}
module.exports  = bodyParser;