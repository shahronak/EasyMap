var KEY_PREFIX = 'easy_map_user.';

updateContextMenu()

function loadProfiles(){
	var list = document.getElementById("profileList");
	list.innerHTML = '';
	for(var key in localStorage){
		list.innerHTML = list.innerHTML + 
			"<tr>" +
				"<td>" +
					"<img src='deleteProfile.png' id='" + key + "'>" +  "<b>" + key + "</b>" +  "<br>" +
					localStorage[key] +
				"</td>" +
			"</tr>";
	}
}

function attachEvents(){
	for(var key in localStorage){
		var img = document.getElementById(key);
		img.addEventListener('click', 
			function(e){
				removeProfile(e.target.id);
			});
	}
}

function addProfile(){
	var req_profile_name = document.getElementById("profileName").value;
	var req_profile_addr = document.getElementById("profileAddr").value;
	var key = KEY_PREFIX+req_profile_name;
	var storedKey = localStorage[key];
	if(req_profile_name == ''){
		alert("Please enter a profile name");
	}else if(storedKey != null){
		alert("This profile name already exists \nPlease enter a new profile name.");
	}else if(req_profile_addr == ''){
		alert("Please enter a profile address");
	}else{
		localStorage[req_profile_name] = req_profile_addr;
		document.getElementById("profileName").value = '';
		document.getElementById("profileAddr").value = '';
		loadProfiles();
		attachEvents();
	}
	updateContextMenu();
}

function removeProfile(key){
	localStorage.removeItem(key);
	var parent = document.getElementById(key).parentNode.parentNode;
	parent.parentNode.removeChild(parent);
	updateContextMenu();
}

function openMapTab(info, tab) {
  var selection = info.selectionText;
  var id = info.menuItemId; //this will be equivalent to the key in localStorage
  selection = selection.replace("#","");
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
  if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(
	  function(position) {
	    var source = position.coords.latitude+",+"+position.coords.longitude;
		if (id != "contextselection") {
		  source = localStorage[id];
		}
		var URL="http://maps.google.com/?saddr=" +source+"&daddr="+selection;
		chrome.tabs.create({'url': URL}, function(tab) {
		  // Tab opened.
		});
	  },
	  function(error) {
	    var source = "";
		if (id != "contextselection") {
		  source = localStorage[id];
		}
		var URL="http://maps.google.com/?saddr=" +source+"&daddr="+selection;
		chrome.tabs.create({'url': URL}, function(tab) {
		  // Tab opened.
		});
	  }
	)
  }
}

function updateContextMenu() {
  chrome.contextMenus.removeAll();
  var title = "From Current Location";
  var context = "selection";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context});
  console.log("'" + context + "' item:" + id);
  for (var i=0; i<localStorage.length;i++) {
    title = localStorage.key(i);
    id = chrome.contextMenus.create({"title": "From "+title, "contexts":[context], "id": title});
    console.log("'" + context + "' item:" + id);
  }
}

chrome.contextMenus.onClicked.addListener(openMapTab);

// Create one test item for each context type.
chrome.runtime.onInstalled.addListener(updateContextMenu);
	
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('button').addEventListener('click', addProfile);
	loadProfiles();
	attachEvents();
});
