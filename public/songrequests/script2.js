const getSongs = async () => {
    const url = "/api/songs";

    try {
        const response = await fetch(url);
        return response.json();
    } catch(error) {
        console.log(error);
    }
};

const showSongs = async() => {
    let songs = await getSongs();
    document.getElementById("songDisplaySection").innerHTML = "";
    document.getElementById("song-list").innerHTML;

    songs.forEach((song) => {
        const editDeleteSection = document.createElement("section");
        editDeleteSection.id = "editDeleteSection";
        const totalSection = document.createElement("section");
        totalSection.id = "totalSection";
        const imageSection = document.createElement("section");
        imageSection.id = "imageSection";
        const informationSection = document.createElement("section");
        informationSection.id = "informationSection"

        const dLink = document.createElement("a");
        dLink.innerHTML = "	&#9249;";
        editDeleteSection.append(dLink);
        dLink.id = "delete-link";

        const eLink = document.createElement("a");
        eLink.innerHTML = "&#9998;";
        editDeleteSection.append(eLink);
        eLink.id = "edit-link";
        
        const myImage = document.createElement("img");
        myImage.src = "images/" + song.image;
        myImage.id = "myImage";
        imageSection.append(myImage);

        //document.getElementById("song-list").append(mainSection);
        

        const myName = document.createElement("h3");
        myName.innerHTML = song.name;
        informationSection.append(myName);
        console.log(myName);

        const myArtist = document.createElement("p");
        myArtist.innerHTML = "Artist: " + song.artist;
        informationSection.append(myArtist);
        console.log(myArtist);

        const myGenre = document.createElement("p");
        myGenre.innerHTML = "Genre: " + song.genre;
        informationSection.append(myGenre);
        console.log(myGenre);
        
        totalSection.append(imageSection);
        totalSection.append(informationSection);
        totalSection.append(editDeleteSection);

        //document.getElementById("song-list").append(totalSection);
        document.getElementById("songDisplaySection").append(totalSection);

        eLink.onclick = (e) => {
            e.preventDefault();
            displayEditForm(song);
            //showSongForm();
            //populateEditForm(song);
        }
        
        dLink.onclick = deleteSong.bind(this, song);
        
        //populateEditForm(song);

        /*
        totalSection.onclick = (e) => {
            e.preventDefault();
            displayEditForm(song);
        };
        */

        
    });
    
};

showSongs();


const displayEditForm = (song) => {
    openDialog();
    populateEditForm(song);
    showSongForm();
};


const showSongForm = () => {
    console.log("in here");
    document.getElementById("song-details").classList.add("hidden");
    document.getElementById("add-song-form").classList.remove("hidden");
};

const populateEditForm = (song) => {
    const form = document.getElementById("add-song-form");
    form._id.value = song._id;
    form.name.value = song.name;
    form.artist.value = song.artist;
    form.genre.value = song.genre
    document.getElementById("img-prev").src = "images/" + song.image;
}

const addSong = async (e) => {
    e.preventDefault();
    const form = document.getElementById("add-song-form");
    const formData = new FormData(form);
    let response;

    console.log(form._id.value);
    console.log(...formData);
    

    if (form._id.value.trim() == "") {
        console.log("in post");
        formData.delete("_id");
        response = await fetch("/api/songs", {
            method: "POST",
            body: formData,
        });
    } else {
        console.log("in put");
        //console.log(form._id.value.trim());
        response = await fetch(`/api/songs/${form._id.value}`,{
            method: "PUT",
            body: formData,
        });
    }
    

    if (response.status != 200) {
        result.innerHTML = "Error adding your song";
        result.style.color = "blue";
        setTimeout(() => {
            result.innerHTML = "";
        }, 3000);
        console.log("Error posting data");
    }

    await response.json();
    resetForm();
    document.getElementById("add-song-form").classList.add("hidden");
    document.getElementById("song-details").classList.remove("hidden");
    document.getElementById("dialog").style.display = "none"
    showSongs();
}

const deleteSong = async (song) =>{
    let response = await fetch(`/api/songs/${song._id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json;charset=utf-8",
      },
    });
  
    if(response.status!= 200){
        result.innerHTML = "Error Deleting Your Song";
        result.style.color = "red";
        setTimeout(() => {
            result.innerHTML = "";
        }, 3000)
      console.log("Error deleting");
      return;
    }
  
    let result = await response.json();
    resetForm();
    showSongs();
    document.getElementById("dialog").style.display = "none";
};

const resetForm = () => {
    const form = document.getElementById("add-song-form");
    form.reset();
    document.getElementById("img-prev").src = "";
};




const showEditForm = (e) => {

}

const showSongForm2 = (e) => {
    document.getElementById("_id").value = "";
    e.preventDefault();
    openDialog2("add-song-form");
    resetForm();
}

const openDialog = () => {
    document.getElementById("dialog").style.display = "block";
    document.querySelectorAll("#dialog-details > *").forEach((item) => {
      item.classList.add("hidden");
    });
};

const closeDialog = () => {
    document.getElementById("dialog").style.display = "none";
}

const openDialog2 = (id) => {
    document.getElementById("dialog").style.display = "block";
    document.querySelectorAll("#dialog-details > *").forEach((item) => {
      item.classList.add("hidden");
    });
    document.getElementById(id).classList.remove("hidden");
  };


const addSupplies = (e) => {
    e.preventDefault();
    const section = document.getElementById("supply-boxes");
    const input = document.createElement("input");
    input.type = "text";
    section.append(input);
}

/*
const openDialog = (id) => {
    document.getElementById("dialog").style.display = "block";
}
*/
document.getElementById("dialog-close").onclick = closeDialog;
document.getElementById("add-song-form").onsubmit = addSong;
document.getElementById("add-link").onclick = showSongForm2;

document.getElementById("img").onchange = (e) => {
    if (!e.target.files.length) {
        document.getElementById("img-prev").src = "";
        return;
    }
    document.getElementById("img-prev").src = URL.createObjectURL(
        e.target.files.item(0)
    );
};


