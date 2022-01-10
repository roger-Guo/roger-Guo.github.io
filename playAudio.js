var myAudioElement = document.getElementById('audio');  
myAudioElement.addEventListener("canplaythrough", event => {
  /* the audio is now playable; play it if permissions allow */
  myAudioElement.play();
});
