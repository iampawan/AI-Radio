// Use this sample to create your own voice commands
intent('hello world', p => {
    p.play('(hello|hi there)');
});

question(
    'what this app can do?', 'what does this app do?',
    reply('This is a radio app where you can ask me to play some music.)'),
);



intent('play $(CHANNEL* (.*)) fm', p => {
    let channel = project.radios.filter(x => x.name.toLowerCase() === p.CHANNEL.value.toLowerCase())[0];
    try {
        p.play({ "command": "play_channel", "id": channel.id });
        p.play('(Playing Now|on it|Ok boss|Doing it)');
    } catch (err) {
        console.log("Can't play");
        p.play("I cannot play this");
    }
});

intent('play (some|) $(CATEGORY* (.*)) music', p => {
    let channel = project.radios.filter(x => x.category.toLowerCase() === p.CATEGORY.value.toLowerCase())[0];
    try {
        p.play({ 'command': 'play_channel', 'id': channel.id });
        p.play('(playing now|On it|Ok boss)');
    } catch (error) {
        console.log("Can't play");
        p.play('I could not find this genre');
    }

});


intent('(play)', 'play (the|) (some|) music', p => {
    p.play({ "command": "play" });
    p.play("(Playing Now|on it|Ok boss|Doing it)");
});

intent('stop (it|)', 'stop (the|) music', 'pause (it|)', 'pause (the|) music', p => {
    p.play({ "command": "stop" });
    p.play("(Stopping Now|on it|Ok boss|Doing it)");
});

intent('(play|) next (channel|fm|radio|)', p => {
    p.play({ "command": "next" });
    p.play("(on it|Ok boss|Doing it|sure)");
});

intent('(play|) previous (channel|fm|radio|)', p => {
    p.play({ "command": "prev" });
    p.play("(on it|Ok boss|Doing it|sure)");
});