var contextID = 0;

var lut = {
  "q" : ["q", "p"],
  "w" : ["w", "o"],
  "e" : ["e", "i"],
  "r" : ["r", "u"],
  "t" : ["t", "y"],
  "y" : ["y", "t"],
  "u" : ["u", "u"],
  "i" : ["i", "i"],
  "o" : ["o", "o"],
  "p" : ["p", "p"],
  "a" : ["a", "'"],
  "s" : ["s", "l"],
  "d" : ["d", "k"],
  "f" : ["f", "j"],
  "g" : ["g", "h"],
  "h" : ["h", "g"],
  "j" : ["j", "j"],
  "k" : ["k", "k"],
  "l" : ["l", "l"],
  "z" : ["z", "."],
  "x" : ["x", ","],
  "c" : ["c", "m"],
  "v" : ["v", "n"],
  "b" : ["b", "b"],
  "n" : ["n", "n"],
  "m" : ["m", "m"],
};
    

chrome.input.ime.onFocus.addListener(
    function(context) {
      contextID = context.contextID;
    }
);

chrome.input.ime.onBlur.addListener(() => {
  contextID = 0;
});


//var shiftPressed = false;

// TODO: Add support for virtual keyboard input.

chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;
      
      /*if (keyData.type = "keyup") {
        if (keyData.code == "ShiftLeft") {
          shiftPressed = false;
        }
      }*/

      if (keyData.type == "keydown") {

        /*if (keyData.code == "ShiftLeft") {
          shiftPressed = true;
        }*/

        console.log(" WA WHAT HAPPENED");

        if (lut[keyData.key.toLowerCase()]) {
          let shifted = keyData.shiftKey ^ 0;
          let emit = lut[keyData.key.toLowerCase()][shifted];
          
          if (keyData.altKey) {
            emit = emit.toUpperCase();
          }

          if (emit != null && contextID != 0) {
            chrome.input.ime.commitText({
              "contextID": contextID,
              "text": emit,
            }, () => {
              if (chrome.runtime.lastError) {
                console.error('Error committing text:', chrome.runtime.lastError);
                return;
              }
            });
          }
          handled = true;
        } 
      }
      return handled;
});

chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);

  emit = command;

  if (emit != null && contextID != 0) {
    chrome.input.ime.commitText({
      "contextID": contextID,
      "text": emit,
    }, () => {
      if (chrome.runtime.lastError) {
        console.error('Error committing text:', chrome.runtime.lastError);
        return;
      }
    });
  }
});
