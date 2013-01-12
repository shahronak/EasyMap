// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the prefix key for an easy map profile 
 *
 */
var KEY_PREFIX = 'easy_map_user.';


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
		localStorage[key] = req_profile_addr;
		document.getElementById("profileName").value = '';
		document.getElementById("profileAddr").value = '';
		loadProfiles();
		attachEvents();
	}
}

function removeProfile(key){
	localStorage.removeItem(key);
	var parent = document.getElementById(key).parentNode.parentNode;
	parent.parentNode.removeChild(parent);
}
	
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('button').addEventListener('click', addProfile);
	loadProfiles();
	attachEvents();
});
