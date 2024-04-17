/*
const submitSongForm = (e) => {
    e.preventDefault(); //don't refresh the page
    
    const form = document.getElementById("form-song");
    const songName = form.elements["song-name"].value;
    const artist = form.elements["artist-name"].value;
    const genre = form.elements["genre"].value;
    
    const mainSection = document.createElement("section");
    //adding more to this later

    console.log("songName: " + songName + "artist name: " + artist + "genre: " + genre);

    formSection.append("Success!");
    const title = document.createElement("h1");
    title.innerHTML = "Song Name: " + songName;
    formSection.append(title);
    const Artist = document.createElement("p");
    Artist.innerHTML = "Artist: " + artist;
    formSection.append(Artist);
    const Genre = document.createElement("p");
    Genre.innerHTML = "Genre: " + genre;
    formSection.append(Genre);


    
    //const title = document.createElement("h1");
    //title.innerHTML = songName;
    //titleSection.append(title);

    //const songArtist = document.createElement("p");
    //songArtist.innerHTML = 
    


}


const getRadioValue = (radioName) => {
    const radios = document.getElementsByName(radioName);

    for(let i in radios) {
        if(radios[i].checked){
            return radios[i].value;
        }
    }

    return "";
};

document.getElementById("form-song").onsubmit = submitSongForm;

*/
