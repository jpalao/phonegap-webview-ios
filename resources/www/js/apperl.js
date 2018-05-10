var featureArbitrator = false;

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

var listenerSuccess = function() {
	if (DEBUG)
		console.log("bindListener: listenerSuccess");
}

var listenerError = function() {
	if (DEBUG)
		console.log("bindListener: listenerError");	
}

var getLoggingEnabledSuccessCallback = function(message) {
	if (DEBUG)
		console.log("Logging enabled: " + message);
	setLoggingEnabled(message);
}

var setFeatureSuccessCallback = function(message) {
	if (DEBUG)
		console.log("Feature success: " + message);
	featureArbitrator = false;
}

var setFeatureErrorCallback = function(message) {
	if (DEBUG)
		console.log("Feature success: " + message);
	featureArbitrator = false;
}

var successCallback = function() {
	
}

var errorCallback = function() {
	
}

var getEditorDataSuccessCallback = function(eventData) {
	if (DEBUG)
		console.log("getSpeakerDataSuccessCallback success ");
	app.onReceivedEvent(eventData);
}

var PLUGIN_NAME 						= "ApperlPlugin";

// apperl Plugin JS object 
var apperlPlugin = {
    setFeature: function(feature, value) {
    	//if (!featureArbitrator) {
		//	featureArbitrator = true;
			cordova.exec(
				setFeatureSuccessCallback, 	// success callback function
				setFeatureErrorCallback, 		// error callback function
				PLUGIN_NAME, 		// maps to native Java class called "JBLG4Plugin"
				'setFeature', 		// Java method called "setFeature"
				[{                  // and this array of custom arguments to create our entry
					"feature": feature,
					"value": value
				}]
			);
        //}
    },
    bindListener: function(listener, listener) {
    	cordova.exec(
    		app.onReceivedCommand, 
    		listenerError, 
    		PLUGIN_NAME, 
    		'bindListener',	
    		[{   }]
    	);
    },
    enableLogging: function(listener, listener) {
    	cordova.exec(
    		successCallback, 
    		errorCallback, 
    		PLUGIN_NAME, 
    		'enableLogging',	
    		[{   }]
    	);
    },
    disableLogging: function(listener, listener) {
    	cordova.exec(
    		successCallback, 
    		errorCallback, 
    		PLUGIN_NAME, 
    		'disableLogging',	
    		[{   }]
    	);
    },
    getLoggingEnabled: function(listener, listener) {
    	cordova.exec(
    		getLoggingEnabledSuccessCallback, 
    		errorCallback, 
    		PLUGIN_NAME, 
    		'getLoggingEnabled',	
    		[{   }]
    	);
    },    
}
