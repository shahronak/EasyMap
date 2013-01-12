// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function openMapTab(info, tab) {
  var selection = info.selectionText;
  selection = selection.replace("#","");
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
  if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(
	  function(position) {
	    var curLocation = position.coords.latitude+",+"+position.coords.longitude;
		var URL="http://maps.google.com/?saddr=" +curLocation+"&daddr="+selection;
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
	var title = "Open Google Maps";
	var context = "selection";
	var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context});
	console.log("'" + context + "' item:" + id);
});
	