/**
 * Created by embrasse-moi on 1/20/17.
 */

export function addslashes (str) {
    // Escapes single quote, double quotes and backslash characters in a string with backslashes
    //
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/addslashes    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: marrtins
    // +   improved by: Nate
    // +   improved by: Onno Marsman    // +   input by: Denny Wardhana
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Oskar Larsson Högfeldt (http://oskar-lh.name/)
    // *     example 1: addslashes("kevin's birthday");
    // *     returns 1: 'kevin\'s birthday'
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}
export function hasWhiteSpace(s) {
    return /\s/g.test(s);
}
export function trim(strText)
{
    strText += '';
    strText=strText.replace('\t','');
    //alert(strText.length);
    // this will get rid of leading spaces - not tab however
    while (strText.substring(0,1) == ' ')
    {
        strText = strText.substring(1, strText.length);
    }

    // this will get rid of trailing spaces
    while (strText.substring(strText.length-1,strText.length) == ' ')
    {
        strText = strText.substring(0, strText.length-1);
    }
    //alert(strText.length);
    return strText;
}