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
    purchaseOrder(rows){
        let data = [];
        for(let i = 0; i<rows; i++)
        {
            data[i]={};
            data.style = 'style_' + i;
            data.sizes = this.sizesArray(5);
            data.cost = this.faker.finance.amount(4,58,2);
        }
        return data;

    }
    sizesArray(columns){
        let data = [];
        for(let i = 0;i<columns;i++){
            data[i] = this.faker.random.number({min:0, max:10});
        }
        return data;
    }

}

