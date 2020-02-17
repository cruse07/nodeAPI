const mongoose = require('../../common/services/mongoos.service').mongoose;
//const Schema = mongoose.Schema;

function getschema(name, dbschema)
{
    return  mongoose.model(name, dbschema);
}
exports.create = (obj, schema, key) => {
    
   const model= getschema(key, schema);
   const entity = new model(obj);
    return entity.save();
};

exports.list = (perPage, page, schema, key) => {
    const model= getschema(key, schema);
    return new Promise((resolve, reject) => {
        model.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};