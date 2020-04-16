$(document).ready(function() {
    /*var options = {
        strings: ['<i>First</i> sentence.', '&amp; a second sentence.'],
        typeSpeed: 40,
        smartBackspace: true // Default value
    };
    var typed = new Typed('#typed', options);*/
    var term_input = $("#terminal_content");
    var bash_profile = "[~]$ ";

    jQuery.fn.putCursorAtEnd = function() {
        return this.each(function() {
            var $el = $(this),
                el = this;

            if (!$el.is(":focus")) {
                $el.focus();
            }
            if (el.setSelectionRange) {
                var len = $el.val().length * 2;
                setTimeout(function() {
                    el.setSelectionRange(len, len);
                }, 1);
            } else {
                $el.val($el.val());
            }
            this.scrollTop = 999999;
        });

    };

    function setCaretAtend(elem) {
        var elemLen = 5;
        if (document.selection) {
            elem.focus();
            var oSel = document.selection.createRange();
            oSel.moveStart('character', -elemLen);
            oSel.moveStart('character', elemLen);
            oSel.moveEnd('character', 0);
            oSel.select();
        } else if (elem.selectionStart || elem.selectionStart == '0') {
            // Firefox/Chrome
            elem.selectionStart = elemLen;
            elem.selectionEnd = elemLen;
            elem.focus();
        }
    }
    $("#terminal_content").html(bash_profile);

    term_input.putCursorAtEnd().on(
        "focus",
        function() {
            term_input.putCursorAtEnd()
        }
    );

    const a = document.getElementById("terminal_content");

    setInterval(function() {
        a.scrollTop = a.scrollHeight - a.clientHeight;
    }, 5)

    term_input.on("keydown", function(e) {
        var key_code = e.keyCode;
        var current_text = $(this).val();
        if (key_code == 8) {
            // Check if bash profile is being deleted
            if (current_text.endsWith(bash_profile)) {
                e.preventDefault();
                return false;
            }
        } else if (key_code == 13) {
            e.preventDefault();
            current_text += '\n' + bash_profile;
            term_input.val(current_text);
        }
    });

});