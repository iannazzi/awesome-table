/**
 * Created by embrasse-moi on 1/20/17.
 */
export function is_array(input)
{
    return typeof(input)=='object'&&(input instanceof Array);
}
export function show2DArray(array)
{
    debug = '';
    for (i=0;i<array.length;i++)
    {
        for(j=0;j<array[0].length;j++)
        {
            debug = debug + ' ' + array[i][j];
        }
        debug = debug + "\r\n";
    }
    alert(debug);
}
export function dumpProps(obj, parent) {
    //This function goes through an object and states the index and the property recusively
    // usage dumpProps(object);

    // Go through all the properties of the passed-in object
    for (var i in obj)
    {
        // if a parent (2nd parameter) was passed in, then use that to
        // build the message. Message includes i (the object's property name)
        // then the object's property value on a new line
        if (parent) { var msg = parent + "." + i + "\n" + obj[i]; } else { var msg = i + "\n" + obj[i]; }
        // Display the message. If the user clicks "OK", then continue. If they
        // click "CANCEL" then quit this level of recursion
        if (!confirm(msg)) { return; }
        // If this property (i) is an object, then recursively process the object
        if (typeof obj[i] == "object")
        {
            if (parent) { dumpProps(obj[i], parent + "." + i); } else { dumpProps(obj[i], i); }
        }
    }
}
export function isValueInArray(value, array)
{
    let found = false;
    for(let i=0;i<array.length;i++)
    {
        if (array[i] == value)
        {
            found = true;
        }
    }
    return found;
}
export function getJSONKeys(json_data)
{
    var keys = [];
    json_object = JSON.parse(json_data);
    for(var k in json_object)
    {
        keys.push(k);
        console.log(k);
    }
    return keys;
}
export function tryParseJSON (jsonString){
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns 'null', and typeof null === "object",
        // so we must check for that, too.
        if (o && typeof o === "object" && o !== null) {
            return o;
        }
    }
    catch (e) { }

    return false;
};
export function parseJSONdata(json)
{
    if(json == '')
    {
        obj = new Array();
    }
    else
    {
        obj = JSON && JSON.parse(json) || $.parseJSON(json);
    }
    return obj;
}
export function arrayMin(arr) {
    var len = arr.length, min = Infinity;
    while (len--) {
        if (arr[len] < min) {
            min = arr[len];
        }
    }
    return min;
}
export function arrayMax(arr) {
    var len = arr.length, max = -Infinity;
    while (len--) {
        if (arr[len] > max) {
            max = arr[len];
        }
    }
    return max;
}
