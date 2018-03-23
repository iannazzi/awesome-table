/**
 * Created by embrasse-moi on 1/20/17.
 */
import { trim } from './strings';
export function round(num, dec)
{
    var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
    return result;
}
export function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
export function round2(num, dec)
{
    if(trim(num) == '')
    {
        num = 0;
    }

    if (!isNaN(num))
    {

        let number=parseFloat(num);
        number = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
        return number.toFixed(dec); //not rounding up...
        //return number.round(dec);

    }
    else
    {
        return num;
    }
}
export function myParseFloat(value)
{
    if(value =='' || value == '0' || value =='null' || value == null)
    {
        return 0;
    }
    else
    {
        return parseFloat(value);
    }
}
export function myParseInt(value)
{
    if(value =='' || value == '0' || value =='null' || value == null)
    {
        return 0;
    }
    else
    {
        return parseInt(value);
    }
}
export function permute(input)
{
    var permArr = [],
        usedChars = [];
    function main(){
        var i, ch;
        for (i = 0; i < input.length; i++) {
            ch = input.splice(i, 1)[0];
            usedChars.push(ch);
            if (input.length == 0) {
                permArr.push(usedChars.slice());
            }
            main();
            input.splice(i, 0, ch);
            usedChars.pop();
        }
        return permArr;
    }
    return main();
}