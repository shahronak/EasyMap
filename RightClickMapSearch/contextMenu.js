// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
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
	    var dest;
	    var curLocation = position.coords.latitude+",+"+position.coords.longitude;
		if (id == "contextselection") {
		  dest = selection;
		} else {
		  dest = localStorage[id];
		}
		var URL="http://maps.google.com/?saddr=" +curLocation+"&daddr="+dest;
		chrome.tabs.create({'url': URL}, function(tab) {
		  // Tab opened.
		});
	  }
	)
  }
}

chrome.contextMenus.onClicked.addListener(openMapTab);

// Create one test item for each context type.
chrome.runtime.onInstalled.addListener(function() {
	var title = "From Current Location";
	var context = "selection";
	var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context});
	console.log("'" + context + "' item:" + id);
	localStorage["test1"] = "140+Westmount+Rd.+N,+Waterloo,+ON";
	localStorage["test2"] = "98+King+St.+N,+Waterloo,+ON";
	for (var i=0; i<localStorage.length;i++) {
      title = localStorage.key(i);
      id = chrome.contextMenus.create({"title": "From "+title, "contexts":[context], "id": title});
	  console.log("'" + context + "' item:" + id);
	}
});
	