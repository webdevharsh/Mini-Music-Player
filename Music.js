//javascriptpro_
//initial reference        
let musicImage = document.querySelector('.container .image-box img');
let songName = document.querySelector('.container .pre-container .song-name');
let artistName = document.querySelector('.container .pre-container .artist-name');
let playPauseBtn = document.querySelector('.container .btns .play-pause-btn');
let prevSongBtn = document.querySelector('.container .btns .fa-backward-step');
let nextSongBtn = document.querySelector('.container .btns .fa-forward-step');
let progressArea = document.querySelector('.container .pre-container .progress-area');
let progressBar = document.querySelector('.container .pre-container .progress-area .progress-bar');
let currTime = document.querySelector('.container  .pre-container .progress-area .curr-time');
let totalTime = document.querySelector('.container  .pre-container .progress-area .total-time');
let playIcon = document.querySelector('.container .btns .play-pause-btn .fa-play');
let pauseIcon = document.querySelector('.container .btns .play-pause-btn .fa-pause');
let music = document.querySelector('#music');

let musicIndex = 1;
let loadMusic =(musicIndex)=>{
 musicImage.src = `${allmusic[musicIndex - 1].img}.jpg`;    
 music.src = `${allmusic[musicIndex - 1].src}.mp3`;
 songName.innerHTML = `${allmusic[musicIndex - 1].name}`;
 artistName.innerHTML = `${allmusic[musicIndex - 1].artist}`;
}

//play pause audio
playPauseBtn.addEventListener('click',()=>{
if(playPauseBtn.classList.contains('play')){
 playIcon.style.display = 'none';
 pauseIcon.style.display = 'block';
 playPauseBtn.classList.remove('play');
 music.play();
}else{
 pauseIcon.style.display = 'none';
 playIcon.style.display = 'block';
 playPauseBtn.classList.add('play');
 music.pause();        
}    
})

//next music
nextSongBtn.addEventListener('click',()=>{
 musicIndex++;
 musicIndex > allmusic.length ? musicIndex = 1 : musicIndex = musicIndex;
 progressBar.style.width = '0px';
 if(playPauseBtn.classList.contains('play')){
   playPauseBtn.classList.remove('play');
   pauseIcon.style.display = 'block';
   playIcon.style.display = 'none';
 }
 loadMusic(musicIndex);
  music.play();
})

// prev music
prevSongBtn.addEventListener('click',()=>{
  musicIndex--;
  musicIndex < 1 ? musicIndex = allmusic.length : musicIndex = musicIndex;
  progressBar.style.width = '0px';
  if(playPauseBtn.classList.contains('play')) {
    playPauseBtn.classList.remove('play');
    pauseIcon.style.display = 'block';
    playIcon.style.display = 'none';
  }  
  loadMusic(musicIndex);
  music.play();
})

//curr Time & total Time
music.addEventListener('timeupdate',(e)=>{
 let currDuration = e.target.currentTime;
 let totalDuration = e.target.duration;
 
 //curr Time
 let currMin = Math.floor(currDuration / 60);
 let currSec = Math.floor(currDuration % 60);
 if(currSec < 10){
   currSec = '0' + currSec;      
 }
  currTime.innerHTML = `${currMin}:${currSec}`;
  
  //total time
 music.addEventListener('loadeddata',(e)=>{
  let audioDuration = e.target.duration;
  
  let totalMin = Math.floor(audioDuration / 60);
  let totalSec =Math.floor(audioDuration % 60);
  if(totalSec < 10){
    totalSec = '0' + totalSec;      
  }
  totalTime.innerHTML = `${totalMin}:${totalSec}`;
 })
 
 //Progress width
 let progressWidth = (currDuration / totalDuration) * 100;
 progressBar.style.width = `${progressWidth}%`;
 //music progress change on click
 progressArea.addEventListener('click', (e) => {
     let progressWidth = progressArea.clientWidth;
     let clickedOffsetX = e.offsetX;
     let songDuration = music.duration;
     music.currentTime = (clickedOffsetX / progressWidth) * songDuration;
      music.play();
      pauseIcon.style.display = 'block';
      playIcon.style.display = 'none';
      playPauseBtn.classList.remove('play');
 })
})



loadMusic(musicIndex);
