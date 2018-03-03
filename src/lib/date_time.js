/**
 * Created by embrasse-moi on 1/20/17.
 */
function isDate(txtDate)
{
    //checking format 2012-03-01
    //alert(txtDate.substring(4, 5) + ' ' + txtDate.substring(7, 8) + ' ' + txtDate.substring(0, 4) + ' ' +   txtDate.substring(5, 7) + ' ' + txtDate.substring(8, 10));
    txtDate = trim(txtDate);
    var objDate,  // date object initialized from the txtDate string
        mSeconds, // txtDate in milliseconds
        day,      // day
        month,    // month
        year;     // year
    // date length should be 10 characters (no more no less)
    if (txtDate.length !== 10) {
        //alert('length');
        return false;
    }
    // fift and seventh character should be '/'
    if (txtDate.substring(4, 5) !== '-' || txtDate.substring(7, 8) !== '-') {
        //alert('dash');
        return false;
    }
    // extract month, day and year from the txtDate (expected format is yyyy-dd-mm)
    // subtraction will cast variables to integer implicitly (needed
    // for !== comparing)
    month = txtDate.substring(5, 7) - 1; // because months in JS start from 0
    day = txtDate.substring(8, 10) - 0;
    year = txtDate.substring(0, 4) - 0;
    // test year range
    if (year < 1000 || year > 3000) {
        //alert('year');
        return false;
    }
    // convert txtDate to milliseconds
    mSeconds = (new Date(year, month, day)).getTime();
    // initialize Date() object from calculated milliseconds
    objDate = new Date();
    objDate.setTime(mSeconds);
    // compare input date and parts from Date() object
    // if difference exists then date isn't valid
    if (objDate.getFullYear() !== year ||
        objDate.getMonth() !== month ||
        objDate.getDate() !== day) {
        //alert('compare');
        return false;
    }
    // otherwise return true
    return true;
}
function changeDate(reference_id, change_id, days)
{
    var reference_element =  document.getElementById(reference_id);
    var change_element =  document.getElementById(change_id);
    change_element.value = dateAddDays(reference_element.value, parseInt(days));
}
function parseDate(input, format)
{
    //errors arrive in using my favorite format, so we need to parse it
    format = format || 'yyyy-mm-dd'; // default format
    var parts = input.match(/(\d+)/g),
        i = 0, fmt = {};
    // extract date-part indexes from the format
    format.replace(/(yyyy|dd|mm)/g, function(part) { fmt[part] = i++; });

    return new Date(parts[fmt['yyyy']], parts[fmt['mm']]-1, parts[fmt['dd']]);
}
function convertDate(yyyy_mm_dd)
{
    d=yyyy_mm_dd.split("-");
    return d[1]+'/'+ d[2] +'/' +d[0];
}
function dateAddDays( /*string yyyy-mm-dd*/ dateString, /*int*/ ndays)
{
    //dateString= dateString.replace('-','/');
    dateString = convertDate(dateString);
    //alert(dateString);
    var actualDate = new Date(dateString); // convert to actual date
    var newDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate()+ndays); // create new increased

    return (newDate.toYMD());
}
function compareTwoDates(date1, date2)
{
    //return -1 date one is before date 2, 0 same, 1 date one is after date 2
    dateString1 = convertDate(date1);
    //alert(date1 + ' ' + dateString1);
    dateString2 = convertDate(date2);
    var date1_new = new Date(dateString1);
    var date2_new = new Date(dateString2);
    if(date1_new.getTime() == date2_new.getTime())
    {
        return 0;
    }
    else if (date1_new.getTime() < date2_new.getTime())
    {
        return -1;
    }
    else
    {
        return 1;
    }
}
function getDays(/*string yyyy-mm-dd*/ dateString)
{
    var actualDate = new Date(dateString); // convert to actual date
    var newDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate()+1);
    days = newDate.getDate();
    day_string =  addZeroToDateString(days.toString());
    return day_string;

}
function addZeroToDateString(string)
{
    if (string.length == 1)
    {
        string = '0' + string;
    }
    return string;
}
function getMonth(/*string yyyy-mm-dd*/ dateString)
{
    var actualDate = new Date(dateString); // convert to actual date
    var newDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate()+1);
    var month = newDate.getMonth() + 1;
    month_string = addZeroToDateString(month.toString());
    return month_string;
}
function getYear(/*string yyyy-mm-dd*/ dateString)
{
    var actualDate = new Date(dateString); // convert to actual date
    var newDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate()+1);
    year = newDate.getFullYear();
    return year.toString();
}
function getYYYear(/*string yyyy-mm-dd*/ dateString)
{
    var actualDate = new Date(dateString); // convert to actual date
    var newDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate()+1);
    year = newDate.getFullYear();
    year_string = year.toString()
    return year_string.substring(2,4);
}

function secondsToTimeString(seconds)
{
    //var totalSec = new Date().getTime() / 1000;
    hours = parseInt( seconds / 3600 ) % 24;
    minutes = parseInt( seconds / 60 ) % 60;
    seconds = seconds % 60;

    result = (hours < 10 ? "0" + hours : hours) + " Hours " + (minutes < 10 ? "0" + minutes : minutes) + " Minutes " + (seconds  < 10 ? "0" + seconds : seconds) + " Seconds";
    return result;
}
