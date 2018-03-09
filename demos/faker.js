export function faker(){
    var faker = require('faker');

    let data = [];
    for(let i=0;i<100;i++){
        data[i] = {
            "id":i+1,
            "name": faker.name.findName()
        }
    }
    return data;
}

