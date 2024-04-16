const getSongs = async() => {
    const url = "requests.json";

    try {
        const response = await fetch(url);
        return response.json();
    } catch(error){
        console.log(error);
    }
};

const showSongs = async() => {
    const songs = await getSongs();
    songs.forEach((song) => {
        document.getElementById("songSection").append(getSongSection(song));
    });
};

const getSongSection = (song) => {
    const image = document.createElement("img");
    image.id = "image";
    const section = document.createElement("section");
    section.id = "sectionOne";
    const titleSection = document.createElement("section");
    titleSection.id = "titleSection";
    const informationSection = document.createElement("section");
    informationSection.id = "informationSection";
    

    //const songImage = document.createElement("img");
    image.src = "images/" + song.image;
    

    const h1 = document.createElement("h1");
    h1.innerHTML = song.name;
    titleSection.append(h1);
    informationSection.append(titleSection);

    const artist = document.createElement("p");
    artist.innerHTML = "Artist: " + song.artist;
    informationSection.append(artist);

    const genre = document.createElement("p");
    genre.innerHTML = "Genre: " + song.genre;
    informationSection.append(genre);

    section.append(image);
    section.append(informationSection);


    return section;
};

showSongs();