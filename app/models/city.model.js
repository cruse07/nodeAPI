const mongoose = require('../../common/services/mongoos.service').mongoose;
const Schema = mongoose.Schema;
const base= require('../baseModel/base.model.js')

const CitySchema = new Schema({
    Name: String,
    State: String,
    Country:String
});


CitySchema.virtual('id').get(function () {
    return this._id.toHexString();
});



exports.findByTitle = (title) => {
    return city.find({ Name: title }, title);
};

exports.createCity = (cityData) => {
  return base.create(cityData, CitySchema, 'City' )
};

exports.list = (perPage, page) => {
    return base.list(perPage, page,CitySchema, 'City')
};


exports.Schema = ()=>{
    return mongoose.modelSchemas;
}
