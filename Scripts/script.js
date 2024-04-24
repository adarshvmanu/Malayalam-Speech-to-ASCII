var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
const speak = document.getElementById('start_button');

if (!('webkitSpeechRecognition' in window)) {
    upgrade();
} else {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function () {
        recognizing = true;
        showInfo('info_speak_now');
    };

    recognition.onerror = function (event) {
        if (event.error == 'no-speech') {
            showInfo('info_no_speech');
            ignore_onend = true;
        }
        if (event.error == 'audio-capture') {
            showInfo('info_no_microphone');
            ignore_onend = true;
        }
        if (event.error == 'not-allowed') {
            if (event.timeStamp - start_timestamp < 100) {
                showInfo('info_blocked');
            } else {
                showInfo('info_denied');
            }
            ignore_onend = true;
        }
    };

    recognition.onend = function () {
        recognizing = false;
        if (ignore_onend) {
            return;
        }
        if (!final_transcript) {
            showInfo('info_start');
            return;
        }
        showInfo('');
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
            var range = document.createRange();
            range.selectNode(document.getElementById('final_span'));
            window.getSelection().addRange(range);
        }
    };

    recognition.onresult = function (event) {
        var interim_transcript = '';
        if (typeof (event.results) == 'undefined') {
            recognition.onend = null;
            recognition.stop();
            upgrade();
            return;
        }
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        final_transcript = capitalize(final_transcript);
        var combinedText = final_transcript + ' ' + interim_transcript;
        document.getElementById('text-field').value = combinedText;
    };
}


function upgrade() {
  showInfo('info_upgrade');
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}


function copyButton() {
  if (recognizing) {
    recognizing = false;
    recognition.stop();
  }
  const textarea = document.getElementById('text-field');
  const originalText = textarea.value;
  const modifiedText = convert(originalText,"ML-Karthika-Normal-3")
  const tempTextarea = document.createElement('textarea');
  tempTextarea.value = modifiedText;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  try {
    document.execCommand('copy');
    alert('Text copied successfully');
  } catch (err) {
    alert('Failed to copy text');
  }
  document.body.removeChild(tempTextarea);
}


function startButton(event) {
  if (recognizing) {
    speak.style.backgroundColor = '#aec926';
    recognition.stop();
    showInfo('info_start')
    return;
  }
  speak.style.backgroundColor = '#c97a26';
  final_transcript = '';
  recognition.lang = 'ml-IN';
  recognition.start();
  ignore_onend = false;
  showInfo('info_allow');
  start_timestamp = event.timeStamp;
}

function showInfo(s) {
  if (s) {
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? 'inline' : 'none';
      }
    }
    info.style.visibility = 'visible';
  } else {
    info.style.visibility = 'hidden';
  }
}