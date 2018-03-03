export default class global_library{

//Needed for page navigation, site functionality
 modifyURL(url_string)
{
	//now the bullshit begins...
	//create this element to access the url 
	var url = window.location.href;
	var protocal = window.location.protocol;
	var pathname = window.location.pathname;
	var pathArray = window.location.pathname.split( '/' );
	var filename = pathArray[pathArray.length-1];
	
	var a = $('<a>', { href:url } )[0];
	//console.log('host ' + a.hostname);
	//console.log('pathname ' + a.pathname);
	//console.log('search ' + a.search);
	//console.log('hash ' + a.hash);
	
	//recreate the url
	var new_url =  a.hostname + a.pathname + url_string;
	//console.log('new_url ' + new_url);
	var pageHTML = document.documentElement.innerHTML;
	var title = document.title;
	window.history.pushState('object or string', title, filename + url_string);
}
 tellmeyourname(control)
{
		
	alert("you are: " + control.id + "\n" +
	"Your cell id is: " + control.parentNode.id + "\n" + 
	"Your column number is: " + control.parentNode.cellIndex + "\n" + 
	"Your Row id is: " + control.parentNode.parentNode.id + "\n" +  
	"Your actual row is : " + control.parentNode.parentNode.rowIndex + "\n" +
	"Your thead,tbody, or tfoot id: " + control.parentNode.parentNode.parentNode.id + "\n" +

	"The table name is : " + control.parentNode.parentNode.parentNode.parentNode.id); // this is the table
	//	"Your tbody row number: " + control.parentNode.parentNode.parentNode.rows.rowIndex + "\n" +
	

}
 wait(msecs)
{
	var start = new Date().getTime();
	var cur = start
	while(cur - start < msecs)
	{
		cur = new Date().getTime();
	}
}
// ***** Session Timeout Warning and Redirect mReschke 2010-09-29 ***** //
//need to turn this into AJAX
 InitSessionTimer()
{
    /* mReschke 2010-09-29 */
    warn_sec = 12* 59 * 60 * 1000;             //Warning time in milliseconds
    timeout_sec = 12*60 * 60 * 1000;          //Actual timeout in milliseconds
    show_warning = true;
    start_time = new Date().getTime();
    CheckSessionStatus();
}
 CheckSessionStatus()
{
    //Check for session warning
    current_time = new Date().getTime();
    if (current_time > start_time + warn_sec && current_time < start_time + timeout_sec && show_warning)
    {
        show_warning = false; //Don't show again
        clicked_warning = false; //Did the user click the warning
        alert_shown = true;
        alert("Your session is about to timeout. Data entered on the current page may be lost.");
        //if the user hits OK and we are not timed out then restart the session_timer
        current_time2 = new Date().getTime();
        if(current_time2 < start_time + timeout_sec)
        {
        	InitSessionTimer();
        }
        else
        {
        	needToConfirm=false;
        	//down = setTimeout("CheckSessionStatus();", 1000);
        	window.location.href = LOGOUT_URL;
        }
    } 
    else if (current_time > start_time + timeout_sec) 
    {
        alert("Your session has timed out.");
        window.location.href = LOGOUT_URL;
    } 
    else 
    {
        down = setTimeout("CheckSessionStatus();", 1000);
    }
}


}

