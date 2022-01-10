var myAudioElement = document.getElementById('audio');  
myAudioElement.addEventListener("canplay", event => {
  /* the audio is now playable; play it if permissions allow */
  myAudioElement.play();
});
