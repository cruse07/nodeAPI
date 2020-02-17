module.exports = (app) => {
    const city = require('../controllers/city.controller.js');
app.post('/city', [city.insert]);
app.get('/city', city.list);
}