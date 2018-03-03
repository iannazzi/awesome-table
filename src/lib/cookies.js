/**
 * Created by embrasse-moi on 1/20/17.
 */
function readAllCookiesFromForm(formId)
{
    var cookie = [];

    var elem = document.getElementById(formId).elements;
    for(var i = 0; i < elem.length; i++)
    {
        cookie[i] = readCookie(elem[i].name);
    }
    return cookie;
}
function getTbodyCookies(tbodyName)
{
    var pairs = document.cookie.split(";");
    var cookies = [];
    for (var i=0; i<pairs.length; i++){
        var pair = pairs[i].split("=");
        //alert(pair[0].search(tbodyName) );
        if (pair[0].search(tbodyName) != "-1")
        {
            //found the id
            cookies[trim(pair[0])] = unescape(pair[1]);
            //alert("Cookie: " + pair[0] + " Value: " + unescape(pair[1]) );
        }
    }
    return cookies;
}
function readCookie(name)
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function createCookiesAllFormValues(formId)
{
    //Doesn't work well in safari - use createCookie and be specific
    var elem = document.getElementById(formId).elements;
    for(var i = 0; i < elem.length; i++)
    {
        //str += "Type: " + elem[i].type + " Name: " + elem[i].name + " ID: " + elem[i].id + " Value: " + elem[i].value + "\r\n";
        createCookie(elem[i].name,elem[i].value,.1);
    }
    //alert(str);
}
function eraseCookiesAllFormValues(formId)
{
    //Function to create cookies for all form elements.
    var str = '';
    var elem = document.getElementById(formId).elements;
    for(var i = 0; i < elem.length; i++)
    {
        eraseCookie(elem[i].name);
    }
}
function createCookie(name,value,days)
{
//note only something like 30 cookies can be stored.. so basically don't use them, they might kill the session

    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}
function eraseCookie(name) {
    createCookie(name,"",-1);
}
