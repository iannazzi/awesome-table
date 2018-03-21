export class DataGenerator{



    constructor(){
        this.faker = require('faker');
    }
    data1(){
        let data = [];
        for(let i=0;i<10;i++){
            data[i] = {
                "id":i+1,
                "name": this.faker.name.findName()
            }
        }
        return data;
    }
    data2(){
        let data = [];
        for(let i=0;i<10;i++){
            data[i] = {
                "id":i+1,
                "style": this.faker.name.findName(),
                "size" : [this.faker.random.number(),this.faker.random.number(),this.faker.random.number(),this.faker.random.number(),this.faker.random.number()]
            }
        }
        return data;
    }

}

