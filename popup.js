// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the prefix key for an easy map profile 
 *
 */
var KEY_PREFIX = 'easy_map_user.';
"easy_map_user.home"

var profileReader = {
	loadProfiles: function(){
		
	}
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  profileReader.loadProfiles();
});
