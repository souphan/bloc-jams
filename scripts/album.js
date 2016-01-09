var setSong = function(songNumber) {
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber -1]
};

var getSongNumberCell = function(number) {
    return $('song-item-number[data-song-number]="' + number + '"]');
};

var createSongRow = function(songNumber, songName, songLength) {
    var template =
       ' <tr class="album-view-song-item">'
     + ' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + ' <td class="song-item-title">' + songName + '</td>'
     + ' <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;
    
    var $row = $(template);
    
    /*Write a function called updatePlayerBarSong() that updates the text of the <h2> tags that contain the song name and the artist name. Reference data from the current song variables to populate them.
    <h2 class="song-name"></h2>
    <h2 class="artist-song-mobile"></h2>
    album picasso from fixtures
    */
    
    
    var clickHandler = function() {
        
        var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {
         // Revert to song number for currently playing song because user started playing new song.
              var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
              currentlyPlayingCell.html(currentlyPlayingSongNumber);
     }

        if (currentlyPlayingSongNumber !== songNumber) {
         // Switch from Play -> Pause button to indicate new song is playing.
         $(this).html(pauseButtonTemplate);
         currentlyPlayingSongNumber = songNumber;
         currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
         updatePlayerBarSong();
     }  else if (currentlyPlayingSongNumber === songNumber) {
         // Switch from Pause -> Play button to pause currently playing song.
         $(this).html(playButtonTemplate);
         $('.main-controls .play-pause').html(playerBarPlayButton);
         currentlyPlayingSongNumber = null;
         currentSongFromAlbum = null;
     }

 };

 var onHover = function(event) {
     var songNumberCell = $(this).find('.song-item-number');
     var songNumber = parseInt(songNumberCell.attr('data-song-number'));

     if (songNumber !== currentlyPlayingSongNumber) {
         songNumberCell.html(playButtonTemplate);
     }
 };

 var offHover = function(event) {
     var songNumberCell = $(this).find('.song-item-number');
     var songNumber = parseInt(songNumberCell.attr('data-song-number'));

     if (songNumber !== currentlyPlayingSongNumber) {
        songNumberCell.html(songNumber);
     }
     console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
 };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};
    
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    $albumTitle.text(album.name);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
    $albumSongList.empty();   

    for (i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
        $albumSongList.append($newRow);
    }
};
   
var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);


};

var nextSong = function() {

  var getLastSongNumber = function(index) {
    return index == 0 ? currentAlbum.songs.length : index;
   
       /*if (index == 0){
     return currentAlbum.songs.length;
    } else{
      return index;*/
      
    };
      
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var previousSong = function() {
    
    // Note the difference between this implementation and the one in
    // nextSong()
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

//This is the album button template
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
//This is the pause button template
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
//This is the player bar Play button template
var playerBarPlayButton = '<span class="ion-play"></span>';
//This is the player bar Pause button template
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store state of playing songs
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    
    var albums = [albumPicasso, albumMarconi, albumTiesto];
    var index = 1;
    albumImage.addEventListener('click', function(event){
        setCurrentAlbum(albums[index]);
        index ++;
        if (index == albums.length) {
            index = 0;
        }
});

});

/*
window.onload = function() 

  songListContainer.addEventListener('mouseover', function(event) {
       
        //console.log(event.target);
        //Only target individual song rows when we hover over the event delegation
        if (event.target.parentElement.className === 'album-view-song-item') {
            //Change the content from the number to the play button's HTML
            var songItem = getSongItem(event.target);

            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;        
            }
        }
     });

for (i = 0; i < songRows.length; i++) {

songRows[i].addEventListener('mouseleave', function(event) {
            //Revert the content back to the number
            // Selects first child element, which is the song-item-number element
            //we've cached the song item that we're leaving in a variable. Referencing getSongItem() repeatedly causes multiple queries that can hinder performance
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute('data-song-number');
            //we've added the conditional that checks that the item the mouse is leaving is not the current song, and we only change the content if it isn't
            if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }

        });
        

var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
    

var setCurrentAlbum = function(album) {
    
    albumTitle.firstChild.nodeValue = album.name;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);
    
    albumSongList.innerHTML = '';
    */
                  
                  
    /*
    var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

    
    for (i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
    }
};*/
//findParentByClassName() function that keeps traversing the DOM upward until a parent with a specified class name is found.

/* var findParentByClassName = function(parent, targetClass){
    while ((parent = parent.parentElement) && !parent.classList.contains(targetClass));
    return parent;
}

   for (i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
            //Revert the content back to the number
            // Selects first child element, which is the song-item-number element
            //this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
            //we've cached the song item that we're leaving in a variable. Referencing getSongItem() repeatedly causes multiple queries that can hinder performance
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute('data-song-number');
            //we've added the conditional that checks that the item the mouse is leaving is not the current song, and we only change the content if it isn't
            if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }

        });
        

var findParentByClassName = function(element, targetClass) {
    var currentParent = element.parentElement;
    
    if (currentParent) { // why are we calling currentParent twice?
        while (currentParent.className && currentParent.className != targetClass) {
            currentParent = currentParent.parentElement;
    }
        if (currentParent.className == targetClass) {
            return currentParent;
        } else {
            alert("No parent with that class name found.");
        }
    } else {
        alert("No parent found.");
    }
};


var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};        

var clickHandler = function(targetElement) {
    
    var songItem = getSongItem(targetElement);
    
    if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    
    }else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
     
    }else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
};

 for (i = 0; i < songRows.length; i++) {
         
        songRows[i].addEventListener('click', function(event) {
            // Event handler call
            clickHandler(event.target);
        });
    }

*/

                  
