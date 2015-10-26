var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { name: 'Blue', length: '4:26' },
        { name: 'Green', length: '3:14' },
        { name: 'Red', length: '5:01' },
        { name: 'Pink', length: '3:21'},
        { name: 'Magenta', length: '2:15'}
    ]
};

var albumMarconi = {
     name: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
        { name: 'Hello, Operator?', length: '1:01' },
        { name: 'Ring, ring, ring', length: '5:01' },
        { name: 'Fits in your pocket', length: '3:21'},
        { name: 'Can you hear me now?', length: '3:14' },
        { name: 'Wrong phone number', length: '2:15'}
     ]
 };

var albumTiesto = {
    name: 'A Town Called Paradis',
    artist: 'Tiesto',
    label: 'Universal',
    year: '2014',
    albumArtUrl: 'assets/images/tiesto.jpg',
    songs: [
        { name: 'Red Lights', length: '4:22' },
        { name: 'Light Years Away', length: '3:43' },
        { name: 'Wasted', length: '3:10' },
        { name: 'The Feeling', length: '4:45' },
        { name: 'Footprints', length: '4:17'}
    ]
}

var createSongRow = function(songNumber, songName, songLength) {
    var template =
       ' <tr class="album-view-song-item">'
     + ' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + ' <td class="song-item-title">' + songName + '</td>'
     + ' <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;
    
    var $row = $(template);
    
    var clickHandler = function() {
        var dataSong = $(this).attr('data-song-number');

	    if (songPlayingNow !== null) {
		  // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingTable = $('.song-item-number[data-song-number="' + songPlayingNow + '"]');
		    currentlyPlayingTable.html(songPlayingNow);
	}
	    if (songPlayingNow !== dataSong) {
		      // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
		    songPlayingNow = dataSong;
	}   else if (songPlayingNow === dataSong) {
		// Switch from Pause -> Play button to pause currently playing song.
            $(this).html(playButtonTemplate);
            songPlayingNow = null;
	}
};
                
    var onHover = function(event) {
        var numberItem = $(this).find('.song-item-number');
        var dataSong = numberItem.attr('data-song-number');

        if (dataSong !== currentlyPlayingSong) {
            numberItem.html(playButtonTemplate);
        }
    };
                                    
    var offHover = function(event) {
        var numberItem = $(this).find('.song-item-number');
        var dataSong = numberItem.attr('data-song-number');

        if (dataSong !== currentlyPlayingSong) {
            numberItem.html(dataSong);
        }
    };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    

var setCurrentAlbum = function(album) {
    
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

//This is the album button template
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
//This is the pause button template
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);

    
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

                  
