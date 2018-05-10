/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var demo = false;
var DEBUG = false;
var enableCordova = !demo;

function makeMarker() {
  var marker = document.createElement("div");
  marker.style.color = "#822";
  marker.style.fontSize = "24px";
  marker.innerHTML = "●";
  return marker;
}

var app = {
  getContext: function() { return this; },
    // Application Constructor
    initialize: function () {
        window.onload = function() {
         app.ta = document.getElementById("code");
         app.editor = CodeMirror.fromTextArea(app.ta, {
                lineNumbers: true,
                gutters: ["CodeMirror-linenumbers", "breakpoints"],
                mode: "perl"
           });
           app.editor.on("gutterClick", function(cm, n) {
        var info = cm.lineInfo(n);
          cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
       });
           setTimeout(function() {
               app.editor.setGutterMarker(1, "breakpoints", makeMarker());
               app.editor.setValue("use strict;\nuse warnings;\nprint \"Hello World!\";\n");
               app.editor.display.sizer.style.fontSize = '16px';
             app.editor.refresh();
//             (function(){
//          $(".CodeMirror pre").css('font-size',"20pt");
//         })(jQuery)
       },1);
        }
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);
    
    // Process events coming from native
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        app.bindListener = function(listener) {
      if (DEBUG)
        console.log("bindListener");
      apperlPlugin.bindListener(listener, listener);
    };
    app.bindListener(app.onReceivedCommand);
    },
  
  // Process events coming from Java
  onReceivedCommand : function() {
    if (DEBUG) {
      console.log("onReceivedCommand :: eventData :: " + JSON.stringify(eventData));
    }
    var eventData = arguments[0];

    switch (eventData.command){
// Get the current editor content. You can pass it an optional argument to specify the
// string to be used to separate lines (defaults to "\n").
      case "getValue":
        result = app.editor.getValue();
        break;

// Set the editor content.
      case "editorsetValue":
        app.editorsetValue(arguments[1]);
        break;

// Get the currently selected code.
      case "getSelection":
        result = app.editor.getSelection();
        break;

//Replace the selection with the given string.
      case "replaceSelection":
        app.editor.replaceSelection(eventData.arg0);
        break;

// Programmatically set the size of the editor (overriding the applicable CSS rules). width
// and height height can be either numbers (interpreted as pixels) or CSS units ("100%",
// for example). You can pass null for either of them to indicate that that dimension
// should not be changed.
      case "setSize":
        app.editor.setSize(arguments[1], arguments[2]);
        break;
// Give the editor focus.
      case "focus":
        app.editor.focus();
        break;

// Scroll the editor to a given (pixel) position. Both arguments may be left as null or
// undefined to have no effect.
      case "scrollTo":
        app.editor.scrollTo(arguments[1], arguments[2]);
        break;

// Get an {x, y, width, height} object that represents the current scroll position and
// scrollable area size of the editor.
      case "getScrollInfo":
        app.editor.getScrollInfo();
        break;

// Scrolls the given {line, ch} position into view. If no argument is given, this will
// scroll the cursor into view.
      case "scrollIntoView":
        app.editor.scrollIntoView(arguments[1]);
        break;

// Change the configuration of the editor. option should the name of an option, and value
// should be a valid value for that option.
      case "setOption":
        app.editor.setOption(arguments[1], arguments[2]);
        break;

// Retrieves the current value of the given option for this editor instance.
      case "getOption":
        result = app.editor.getOption(arguments[1]);
        break;

// Gets the mode object for the editor. Note that this is distinct from getOption("mode"),
// which gives you the mode specification, rather than the resolved, instantiated mode
// object.
      case "getMode":
        result = app.editor.getMode();
        break;

// Returns an {x, y, yBot} object containing the coordinates of the cursor. If mode is
// "local", they will be relative to the top-left corner of the editable document. If it is
// "page" or not given, they are relative to the top-left corner of the page. yBot is the
// coordinate of the bottom of the cursor. start is a boolean indicating whether you want
// the start or the end of the selection.
      case "cursorCoords":
        result = app.editor.cursorCoords(arguments[1], arguments[2]);
        break;

// Like cursorCoords, but returns the position of an arbitrary characters. pos should be a
// {line, ch} object.
      case "charCoords":
        result = app.editor.charCoords(arguments[1], arguments[2]);
        break;

// Given an {x, y} object (in page coordinates), returns the {line, ch} position that
// corresponds to it.
      case "coordsChar":
        result = app.editor.coordsChar(arguments[1]);
        break;

// Returns the line height of the default font for the editor.
      case "defaultTextHeight":
        result = app.editor.defaultTextHeight();
        break;

// Undo one edit (if any undo events are stored).
      case "undo":
        app.editor.undo();
        break;

// Redo one undone edit.
      case "redo":
        app.editor.redo();
        break;

// Returns an object with {undo, redo} properties, both of which hold integers, indicating
// the amount of stored undo and redo operations.
      case "historySize":
        result = app.editor.historySize();
        break;

// Clears the editor's undo history.
      case "clearHistory":
        app.editor.clearHistory();
        break;

// Get a (JSON-serializeable) representation of the undo history.
      case "getHistory":
        result = app.editor.getHistory();
        break;

// Replace the editor's undo history with the one provided, which must be a value as
// returned by getHistory. Note that this will have entirely undefined results if the
// editor content isn't also the same as it was when getHistory was called.
      case "setHistory":
        app.editor.setHistory(arguments[1]);
        break;

// Reset the given line's indentation to the indentation prescribed by the mode. If the
// second argument is given, indentation will be increased (if dir is true) or decreased
// (if false) by an indent unit instead.
      case "indentLine":
        app.editor.indentLine(arguments[1], arguments[2]);
        break;

// Retrieves information about the token the current mode found before the given position
// (a {line, ch} object). The returned object has the following properties:
      case "getTokenAt":
        result = app.editor.getTokenAt({line:arguments[1], ch:arguments[2]});
        break;

// start
// The character (on the given line) at which the token starts.
// end
// The character at which the token ends.
// string
// The token's string.
// className
// The class the mode assigned to the token. (Can be null when no class was assigned.)
// state
// The mode's state at the end of this token.

//Can be used to mark a range of text with a specific CSS class name. from and to should
//be {line, ch} objects. The options parameter is optional. When given, it should be an
//object that may contain the following configuration options:

// inclusiveLeft Determines whether text inserted on the left of the marker
// will end up inside or outside of it. inclusiveRight Like inclusiveLeft,
// but for the right side. startStyle Can be used to specify an extra CSS
// class to be applied to the leftmost span that is part of the marker.
// endStyle Equivalent to startStyle, but for the rightmost span. The
// method will return an object with two methods, clear(), which removes
// the mark, and find(), which returns a {from, to} (both document
// positions), indicating the current position of the marked range, or
// undefined if the marker is no longer in the document.
      case "markText":
        result = app.editor.markText(arguments[1], arguments[2],
          arguments[3], arguments[4]);
        break;

// Inserts a bookmark, a handle that follows the text around it as it is being edited, at
// the given position. A bookmark has two methods find() and clear(). The first returns
// the current position of the bookmark, if it is still in the document, and the second
// explicitly removes the bookmark.
      case "setBookmark":
        result = app.editor.setBookmark(arguments[1]);
        break;

// Returns an array of all the bookmarks and marked ranges present at the given position.
      case "findMarksAt":
        result = app.editor.findMarksAt(arguments[1]);
        break;

// Add a gutter marker for the given line. Gutter markers are shown in the line-number
// area (instead of the number for this line). Both text and className are optional.
// Setting text to a Unicode character like ● tends to give a nice effect. To put a
// picture in the gutter, set text to a space and className to something that sets a
// background image. If you specify text, the given text (which may contain HTML) will, by
// default, replace the line number for that line. If this is not what you want, you can
// include the string %N% in the text, which will be replaced by the line number.
      case "setMarker":
        result = app.editor.setMarker(arguments[1], arguments[2], arguments[3]);
        break;

// Clears a marker created with setMarker. line can be either a number or a handle
// returned by setMarker (since a number may now refer to a different line if something
// was added or deleted).
      case "clearMarker":
        app.editor.clearMarker(arguments[1]);
        break;

// Set a CSS class name for the given line. line can be a number or a line handle (as
// returned by setMarker or this function). className will be used to style the text for
// the line, and backgroundClassName to style its background (which lies behind the
// selection). Pass null to clear the classes for a line.
      case "setLineClass":
        result = app.editor.setLineClass(arguments[1], arguments[2],
          arguments[3]);
        break;

// Hide the given line (either by number or by handle). Hidden lines don't show up in the
// editor, and their numbers are skipped when line numbers are enabled. Deleting a region
// around them does delete them, and coping a region around will include them in the
// copied text.
      case "hideLine":
        result = app.editor.hideLine(arguments[1]);
        break;

// The inverse of hideLine—re-shows a previously hidden line, by number or by handle.
      case "showLine":
        result = app.editor.showLine(arguments[1]);
        break;

// Register a function that should be called when the line is deleted from the document.
      case "setSize":
        app.editor.onDeleteLine(arguments[1], arguments[2])
        break;

// Returns the line number, text content, and marker status of the given line, which can
// be either a number or a handle returned by setMarker. The returned object has the
// structure {line, handle, text, markerText, markerClass, lineClass, bgClass}.
      case "lineInfo":
        result = app.editor.lineInfo(arguments[1]);
        break;

// Fetches the line handle for the given line number.
      case "getLineHandle":
        result = app.editor.getLineHandle(arguments[1]);
        break;

// Returns a {from, to} object indicating the start (inclusive) and end (exclusive) of the
// currently displayed part of the document. In big documents, when most content is
// scrolled out of view, CodeMirror will only render the visible part, and a margin around
// it. See also the onViewportChange option.
      case "getViewport":
        result = app.editor.getViewport();
        break;

// Puts node, which should be an absolutely positioned DOM node, into the editor,
// positioned right below the given {line, ch} position. When scrollIntoView is true, the
// editor will ensure that the entire node is visible (if possible). To remove the widget
// again, simply use DOM methods (move it somewhere else, or call removeChild on its
// parent).
      case "addWidget":
        app.editor.addWidget(arguments[1], arguments[2], arguments[3]);
        break;

//Force matching-bracket-highlighting to happen.
      case "matchBrackets":
        app.editor.matchBrackets();
        break;

//Get the number of lines in the editor.
      case "lineCount":
        result = app.editor.lineCount();
        break;

// start may be a boolean indicating whether the start or the end of the selection must be
// retrieved. If it is not given, the current cursor pos, i.e. the side of the selection
// that would move if you pressed an arrow key, is chosen. You may also pass one of the
// strings "start", "end", "head" (same as null), or "anchor" (the opposite). A {line, ch}
// object will be returned.
      case "getCursor":
        result = app.editor.getCursor(arguments[1]);
        break;

// Return true if any text is selected.
      case "somethingSelected":
        result = app.editor.somethingSelected();
        break;

// Set the cursor position. You can either pass a single {line, ch} object, or the line
// and the character as two separate parameters.
      case "setCursor":
        app.editor.setCursor(arguments[1]);
        break;

// Set the selection range. start and end should be {line, ch} objects.
      case "setSelection":
        app.editor.setSelection(arguments[1], arguments[2]);
        break;

// Get the content of line n.
      case "getLine":
        result = app.editor.getLine(arguments[1]);
        break;

// Set the content of line n.
      case "setLine":
        app.editor.setLine(arguments[1], arguments[2]);
        break;

// Remove the given line from the document.
      case "removeLine":
        app.editor.removeLine(arguments[1]);
        break;

// Get the text between the given points in the editor, which should be {line, ch}
// objects. An optional third argument can be given to indicate the line separator string
// to use (defaults to "\n").
      case "getRange":
        result = app.editor.getRange(arguments[1], arguments[2]);
        break;

// Replace the part of the document between from and to with the given string. from and to
// must be {line, ch} objects. to can be left off to simply insert the string at position
// from.
      case "replaceRange":
        app.editor.replaceRange(arguments[1], arguments[2], arguments[3])
        break;

// Calculates and returns a {line, ch} object for a zero-based index who's value is
// relative to the start of the editor's text. If the index is out of range of the text
// then the returned object is clipped to start or end of the text respectively.
      case "posFromIndex":
        result = app.editor.posFromIndex(arguments[1]);
        break;

// The reverse of posFromIndex.
      case "indexFromPos":
        result = app.editor.indexFromPos(arguments[1]);
        break;

      default:
        console.log("onReceivedCommand :: unrecognized command: " + arguments[0]);
    }
  },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        console.log('Received Event: ' + id);
    },
};

app.initialize();

