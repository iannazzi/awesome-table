/**
 * Created by embrasse-moi on 2/7/17.
 */
export function parseQuery(querystring)
{
    if(querystring.indexOf('?') != -1)
    {
        // remove any preceding url and split
        querystring = querystring.substring(querystring.indexOf('?')+1);
        //console.log('querystring' + querystring);

        querystring = querystring.split('&');
        //console.log('querystring');
        //console.log(querystring);
        //console.log('querystring length');
        //console.log(querystring.length);

        var params = {}, pair, d = decodeURIComponent;
        // march and parse
        for (var i = querystring.length - 1; i >= 0; i--)
        {
            pair = querystring[i].split('=');
            params[d(pair[0])] = d(pair[1]);
        }

        return params;

    }
    else
    {
        return {};
    }
}