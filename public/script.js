const toggleNav = () => {
    document.getElementById("topLinksId").classList.toggle("hide");
    console.log("here");
};



document.getElementById("hamburger").onclick = toggleNav;