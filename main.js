//searchBtn

document.getElementById('searchBtn').addEventListener('click',function(){

        const searchInput = document.getElementById('searchInput').value;
        // console.log(searchInput);

        fetch(`https://api.lyrics.ovh/suggest/${searchInput}`)
        .then(res => res.json())
        .then(data => {
            
            displaySong(data);
        })
})

const displaySong = (data)=>{
    // console.log(data);

    const simpleResult = document.getElementById('simpleResult');
   
  

    for (let i = 0; i < 10; i++) {
        
             const songTitle = data.data[i].album.title;
            //  console.log(songTitle);

             const songArtist = data.data[i].artist.name;
            //  console.log(songArtist);

            //  simpleResult.innerHtml += ` <p class="author lead"><strong>${songTitle}</strong> Album by <span>${songArtist}</span> <button class="btn btn-success">Get Lyrics</button></p>`

            simpleResult.innerHTML += `<p class="author lead"><strong>${songTitle}</strong> Album by <span>${songArtist}</span> <button class="btn btn-success" onclick="getLyrics('${songArtist}','${songTitle}')"  id="lyricsBtn">Get Lyrics</button></p>`


            //fancy
            searchResult.innerHTML +=` <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${songTitle}</h3>
                <p class="author lead">Album by <span>${songArtist}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${songArtist}','${songTitle}')" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`
            
    }
   
}

function getLyrics(songArtist,songTitle) {
    const singleLyrics = document.getElementById('singleLyrics');
            fetch(`https://api.lyrics.ovh/v1/${songArtist}/${songTitle}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.lyrics);
                singleLyrics.innerHTML += `<button class="btn go-back">&lsaquo;</button>
                <h2 class="text-success mb-4">${songTitle} - ${songArtist}</h2>
                <pre class="lyric text-white">${data.lyrics}</pre>`
            })
            singleLyrics.innerHTML = '';
            // searchResult.innerHTML = '';
}




