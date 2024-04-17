// Add event listener to the albums
document.addEventListener('DOMContentLoaded', function() {
    const players = document.querySelectorAll('.player');
    const allAudioPlayers = document.querySelectorAll('audio');
  
    players.forEach(player => {
        const playButton = player.querySelector('.play-icon');
        const pauseButton = player.querySelector('.pause-icon');
        const audioPlayer = player.querySelector('audio');
        const progressBar = player.querySelector('.progress-bar');
        const progress = player.querySelector('.progress');
        const currentTimeDisplay = player.querySelector('.current-time');
  
        playButton.addEventListener('click', function() {
            // Pause all other audio players
            allAudioPlayers.forEach(otherAudioPlayer => {
                if (otherAudioPlayer !== audioPlayer) {
                    otherAudioPlayer.pause();
                    otherAudioPlayer.parentElement.querySelector('.play-icon').style.display = 'inline';
                    otherAudioPlayer.parentElement.querySelector('.pause-icon').style.display = 'none';
                }
            });
  
            // Play this audio player
            audioPlayer.play();
            playButton.style.display = 'none';
            pauseButton.style.display = 'inline';
        });
  
        pauseButton.addEventListener('click', function() {
            audioPlayer.pause();
            playButton.style.display = 'inline';
            pauseButton.style.display = 'none';
        });
  
        audioPlayer.ontimeupdate = function() {
            const percentage = (this.currentTime / this.duration) * 100;
            progress.style.width = percentage + '%';
            currentTimeDisplay.textContent = formatTime(this.currentTime);
        };
  
        progressBar.addEventListener('click', function(e) {
            const progressPos = e.offsetX / this.clientWidth;
            audioPlayer.currentTime = progressPos * audioPlayer.duration;
        });
  
        function formatTime(seconds) {
            let min = Math.floor((seconds / 60));
            let sec = Math.floor(seconds - (min * 60));
            if (sec < 10){ 
                sec  = `0${sec}`;
            }
            return `${min}:${sec}`;
        }
    });
  });
  
  
  // Add event listener to the floating player
  document.addEventListener('DOMContentLoaded', function() {
    const albums = document.querySelectorAll('.player');
    const floatingPlayer = document.getElementById('floatingPlayer');
    const floatingAudio = floatingPlayer.querySelector('.audioPlayer');
    const playButton = floatingPlayer.querySelector('.play-icon');
    const pauseButton = floatingPlayer.querySelector('.pause-icon');
    const progressBar = floatingPlayer.querySelector('.progress');
    const progressBarContainer = floatingPlayer.querySelector('.progress-bar-container');  // Make sure this selector matches your HTML
    const currentTimeDisplay = floatingPlayer.querySelector('.current-time');
    const totalTimeDisplay = floatingPlayer.querySelector('.total-time');
    let currentPlayingAlbum = null;

    progressBarContainer.addEventListener('click', function(event) {
        const bounds = this.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const percentage = x / this.offsetWidth;
        floatingAudio.currentTime = percentage * floatingAudio.duration;
    });

    albums.forEach(player => {
        const artContainer = player.querySelector('.album-art-container');
        const audio = player.querySelector('audio');
  
        artContainer.addEventListener('click', function() {
            if (window.innerWidth >= 1024) {
                if (floatingAudio.src !== audio.src) {
                    floatingAudio.src = audio.src;
                    floatingAudio.play();
                    updatePlayPauseButtons(playButton, pauseButton);
                    updateFloatingPlayerInfo(player, floatingPlayer);
                    currentPlayingAlbum = player;
                }
            }
        });
  
        artContainer.addEventListener('mouseenter', function() {
            if (window.innerWidth >= 1024) {
                updateFloatingPlayerInfo(player, floatingPlayer);
            }
        });

        artContainer.addEventListener('mouseleave', function() {
            if (window.innerWidth >= 1024 && currentPlayingAlbum) {
                // Only revert if the mouse leaves the current playing album and no other album is hovered
                setTimeout(() => {
                    if (!document.querySelector('.player:hover')) {  // Checks if no player is currently being hovered
                        updateFloatingPlayerInfo(currentPlayingAlbum, floatingPlayer);
                    }
                }, 100);  // A small delay to ensure it only reverts if truly no album is hovered
            }
        });
    });

  
  
    playButton.addEventListener('click', function() {
        if (floatingAudio.paused) {
            floatingAudio.play();
            updatePlayPauseButtons(playButton, pauseButton);
        }
    });
  
    pauseButton.addEventListener('click', function() {
        if (!floatingAudio.paused) {
            floatingAudio.pause();
            updatePlayPauseButtons(playButton, pauseButton);
        }
    });
  
    floatingAudio.addEventListener('timeupdate', function() {
        if (window.innerWidth >= 1024) {
        updateProgressBar(this, progressBar, currentTimeDisplay, totalTimeDisplay);}
    });
  });
  
  function updateFloatingPlayerInfo(player, floatingPlayer) {
    const albumArt = player.querySelector('.album-art');
    const title = player.querySelector('.song_title').textContent;
    const source = player.querySelector('.song_source').textContent;
    const intro = player.querySelector('.song_intro').textContent;
  
    floatingPlayer.querySelector('.album-art').src = albumArt.src;
    floatingPlayer.querySelector('.song_title').textContent = title;
    floatingPlayer.querySelector('.song_source').textContent = source;
    floatingPlayer.querySelector('.song_intro').textContent = intro;
  }
  
  function updatePlayPauseButtons(playButton, pauseButton) {
    if (floatingPlayer.querySelector('.audioPlayer').paused) {
        playButton.style.display = 'inline';
        pauseButton.style.display = 'none';
    } else {
        playButton.style.display = 'none';
        pauseButton.style.display = 'inline';
    }
  }
  
  function updateProgressBar(audio, progressBar, currentTimeDisplay, totalTimeDisplay) {
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const percentage = (currentTime / duration) * 100;
    progressBar.style.width = `${percentage}%`;
    currentTimeDisplay.textContent = formatTime(currentTime);
    totalTimeDisplay.textContent = formatTime(duration);
}

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('musics');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // The *2 is the speed of the drag
        slider.scrollLeft = scrollLeft - walk;
    });

    // Optional: Add touch support for mobile devices
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    }, {passive: true});

    slider.addEventListener('touchend', () => {
        isDown = false;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // The *2 is the speed of the drag
        slider.scrollLeft = scrollLeft - walk;
    }, {passive: true});
});
