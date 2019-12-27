const app = require('../src/app');
const {PORT} = require('../src/config');

describe(`APP`, ()=>{

    it(`Get / responds with 200 status and Hello World`,()=>{
        return request(app)
            .get('/')
            .expect(200, `Server listening at PORT:${PORT}`);
    }); 

});