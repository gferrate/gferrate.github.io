$(document).ready(function() {
    /*var options = {
        strings: ['<i>First</i> sentence.', '&amp; a second sentence.'],
        typeSpeed: 40,
        smartBackspace: true // Default value
    };
    var typed = new Typed('#typed', options);*/
    var term_input = $("#terminal_content");
    var bash_profile = "gferrate [~]$ ";
    var closable = false;
    var docker_stopped = false;

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

    $("#terminal_content").html(bash_profile);

    term_input.putCursorAtEnd().on(
        "focus",
        function() {
            term_input.putCursorAtEnd()
        }
    );

    const term = document.getElementById("terminal_content");
    setInterval(function() {
        term.scrollTop = term.scrollHeight - term.clientHeight;
    }, 5)

    function get_last_command(last_text) {
        var split_text = last_text.split(bash_profile);
        return split_text[split_text.length - 1];
    }

    function wrapCommand(comm) {
        return `\n  ${comm}\n`
    }

    function gameOver() {
        location.reload();
    }

    function execute_command(last_com) {
        switch (last_com) {
            case '':
            case ' ':
                return '\n'
            case 'clear':
                term_input.val('');
                return ''
            case 'help':
                var help_commands = [
                    'whoami - Print the user information',
                    'clear - Clear the console',
                    'contact - Show contact information',
                    'ls - List directory contents',
                    'cat - Concatenate and print files'
                ];
                return wrapCommand(help_commands.join('\n  '))
            case 'ls':
                return wrapCommand('easteregg.txt')
            case 'whoami':
                return wrapCommand('Gabriel Ferraté is a Telecommunications Engineer from Barcelona.')
            case 'cat easteregg.txt':
                return wrapCommand('foo...')
            case 'docker stop':
                return wrapCommand('Please, specify the image name to close.')
            case 'docker stop 1ab04ddd45af':
            case 'docker stop minecraft':
                docker_stopped = true
                $('.terminal_window').fadeOut(8000, gameOver);
                return wrapCommand('Oh, thanks God! I feel free now! Many thanks!! Bye!')
            case 'docker ps':
                var docker = [
                    'CONTAINER ID  IMAGE                  CREATED        NAMES',
                ]
                if (!docker_stopped) {
                    docker.push('1ab04ddd45af  itzg/minecraft-server  10 years ago   minecraft')
                }
                return wrapCommand(docker.join('\n  '))
            case 'cat /var/log/console.log':
                return wrapCommand('Not here, think more...')
            case 'bar':
                closable = true
                return wrapCommand('Hi, I am the linux Kernel, I\'ve been trapped in this shitty browser for a long time now... Could you help me out by closing the terminal?')
            case 'contact':
                return wrapCommand('You can contact Gabriel at g.ferrate.c@gmail.com or at his linkedin: https://www.linkedin.com/in/gabriel-ferrat%C3%A9-cuartero-7b326a12b/')
            default:
                return wrapCommand(`- bash: ${last_com}: command not found.Type help for more info.`)
        }
    }

    $('#close').click(function() {
        if (closable) {
            console.log('tail /var/log/console.log\n\nIt seems like I am running out of ram, stopping my docker processess will probably help.')
            alert('F**k it didn\'t work! Find the logs in /var/log/console.log');
        }
    });

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
            var last_command = get_last_command(current_text);
            var response = execute_command(last_command);
            current_text = $(this).val();
            current_text += response + bash_profile;
            term_input.val(current_text);
        }
    });

});