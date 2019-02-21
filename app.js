/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;

/* Basically same origin policy prevents me from doing jack. I tried some work arounds. 
 * I don't feel comfortable sending these logon requests through a proxy that I didn't create myself
 * Even though it is open source, people can always host something different, and don't have the resources to host it https://github.com/Rob--W/cors-anywhere/
 * A hosted environment is needed for jsonp as well, so I am deprecating this. It was fun trying while it lasted.
 *
 */
//This is some black magic sorcery to prompt the user to add their credentials so we can commit CRSF and get data to import into trello.
//It's so bad, it's good
loginPrompt = function(loginObj)
{
	loginObj.un = prompt("Enter FootPrints Username:", "ex) asd12");
	loginObj.ps = prompt("Enter FootPrints Password: This will be clear text input! Mask yourself!");
	if (loginObj.un == null || loginObj.un == "" || loginObj.ps == null || loginObj.ps == "") {
		Alert("You have to enter something!");
		loginPrompt()
	}
}

var loginObj = {un : "", ps : ""};

loginPrompt(loginObj);

//I wonder what behavior this will exhibit in an iframe.
let form = document.createElement("form");
form.setAttribute("method", "POST");
form.setAttribute("action", "https://footprints.mtsu.edu/MRcgi/MRlogin.pl");

let username = document.createElement("input");
username.setAttribute("USER", loginObj.un);
form.appendChild(username);

let password = document.createElement("input")
password.setAttribute("PASSWORD", loginObj.ps);
form.appendChild(password);

document.body.appendChild(form);

form.submit();








/*
//Here we go... let's get this right this time. I just tested with postman, and they don't check content type.
//As long as the body is form encoded, it accepts the request.
//application/x-www-form-urlencoded goes like this...
//MyVariableOne=ValueOne&MyVariableTwo=ValueTwo

var request = new XMLHttpRequest();

request.open('POST', "https://footprints.mtsu.edu/MRcgi/MRlogin.pl", true);

 request.onreadystatechange = function () {
	//If Successful
	if (request.readyState == 4 && request.status == 200) {
		
		var body = request.response;

		t.set("Auto Set");

	}
    };

request.send("USER=" + loginObj.un + "&PASSWORD=" + loginObj.ps);

//...well crap...same-origin-policy is enforced in an iframe as well... remember that SOP is enforced with POST requests.
*/




/*
var BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421';

TrelloPowerUp.initialize({
  // Start adding handlers for your capabilities here!
	// 'card-buttons': function(t, options) {
	// return t.set("member", "shared", "hello", "world")
	// .then(function(){
	// 	  return [{
	// icon: BLACK_ROCKET_ICON,
	// 		  text: 'Estimate Size',
	//       callback: function(t) {
	//         return t.popup({
	//           title: "Estimation",
	//           url: 'estimate.html',
	//         });
	//       }
	// 	  }];
	// })
	// },
});
*/






/*
Trello Data Access
The following methods show all allowed fields, you only need to include those you want.
They all return promises that resolve to an object with the requested fields.
Get information about the current board
t.board('id', 'name', 'url', 'shortLink', 'members')
Get information about the current list (only available when a specific list is in context)
So for example available inside 'attachment-sections' or 'card-badges' but not 'show-settings' or 'board-buttons'
t.list('id', 'name', 'cards')
Get information about all open lists on the current board
t.lists('id', 'name', 'cards')
Get information about the current card (only available when a specific card is in context)
So for example available inside 'attachment-sections' or 'card-badges' but not 'show-settings' or 'board-buttons'
t.card('id', 'name', 'desc', 'due', 'closed', 'cover', 'attachments', 'members', 'labels', 'url', 'shortLink', 'idList')
Get information about all open cards on the current board
t.cards('id', 'name', 'desc', 'due', 'closed', 'cover', 'attachments', 'members', 'labels', 'url', 'shortLink', 'idList')
Get information about the current active Trello member
t.member('id', 'fullName', 'username')
For access to the rest of Trello's data, you'll need to use the RESTful API. This will require you to ask the
user to authorize your Power-Up to access Trello on their behalf. We've included an example of how to
do this in the `🔑 Authorization Capabilities 🗝` section at the bottom.
*/

/*
Storing/Retrieving Your Own Data
Your Power-Up is afforded 4096 chars of space per scope/visibility
The following methods return Promises.
Storing data follows the format: t.set('scope', 'visibility', 'key', 'value')
With the scopes, you can only store data at the 'card' scope when a card is in scope
So for example in the context of 'card-badges' or 'attachment-sections', but not 'board-badges' or 'show-settings'
Also keep in mind storing at the 'organization' scope will only work if the active user is a member of the team
Information that is private to the current user, such as tokens should be stored using 'private' at the 'member' scope
t.set('organization', 'private', 'key', 'value');
t.set('board', 'private', 'key', 'value');
t.set('card', 'private', 'key', 'value');
t.set('member', 'private', 'key', 'value');
Information that should be available to all users of the Power-Up should be stored as 'shared'
t.set('organization', 'shared', 'key', 'value');
t.set('board', 'shared', 'key', 'value');
t.set('card', 'shared', 'key', 'value');
t.set('member', 'shared', 'key', 'value');
If you want to set multiple keys at once you can do that like so
t.set('board', 'shared', { key: value, extra: extraValue });
Reading back your data is as simple as
t.get('organization', 'shared', 'key');
Or want all in scope data at once?
t.getAll();
*/
