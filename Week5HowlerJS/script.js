var song1 = new Howl({
    src: ['ariana.mp3'],
    html5: true, 
    volume: 0.5
});

function playSound() {
    song1.play();
}

function pauseSound() {
    song1.pause();
}

function resumeSound() {
    song1.play();
}

function stopSound() {
    song1.stop();
}
