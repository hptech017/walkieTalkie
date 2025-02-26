const say = require('say');

// Speak the text
say.speak("Hello my name is Harshit pandey");

// Speak with a different speed
// say.speak("Hello my name is Harshit pandey", "Microsoft David Desktop", 1);

// Stop speaking
setTimeout(() => {
    say.stop();
}, 3000);
