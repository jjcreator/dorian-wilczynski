// Appear effect for displaying slides / books //

const appear = (x, arr) => {
    let grabbed = arr[x];
    grabbed.style.opacity = (parseFloat(grabbed.style.opacity) + 0.01);
    if (grabbed.style.opacity < 1) {
        setTimeout(appear, 10, x, arr);
    }
}

// Slideshow - main showcase //

let looping;
let slidePosition = 0;
let slideArray = Array.from(document.getElementsByClassName("slide"));
let buttonsArray = Array.from(document.getElementsByClassName("buttons"));
let bookArray = ["storyOne", "storyTwo", "storyThree", "bookOne", "audio1", "audio2"];

const displaySlide = () => {
    stopSlideshow();
    let currentSlide = slideArray[slidePosition];
    let currentButton = buttonsArray[slidePosition];
    buttonsArray.forEach((button)=> {
        button.style.backgroundColor = "rgba(0,0,0,0.65)";
    });
    for (let i=0; i<slideArray.length; i++) {
        if (currentSlide === slideArray[i] && currentButton === buttonsArray[i]) {
            currentSlide.style.opacity = 0;
            currentSlide.style.display = "flex";
            currentButton.style.backgroundColor = "rgba(255, 255, 255, 0.73)";
            setTimeout(appear(slideArray.indexOf(currentSlide), slideArray), 10);
        }      
        else slideArray[i].style.display = "none";
    }
    startSlideshow();
}

const nextSlide = () => {
    if (slidePosition < slideArray.length - 1) slidePosition +=1;
    else slidePosition = 0;
    displaySlide();
}

const prevSlide = () => {
    if (slidePosition > 0) slidePosition -=1;
    else slidePosition = slideArray.length - 1;
    displaySlide();
}

const startSlideshow = () => {
   looping = setInterval(nextSlide, 6000);
}

const stopSlideshow = () => {
    clearInterval(looping);
}

const setSlide = x => {
    slidePosition = x - 1;
    displaySlide();
}

// News archive //

let pagesArray;
let rightArrow = document.getElementById("right-arrow");
let leftArrow = document.getElementById("left-arrow");

const archiveNews = () => {
    let newsArray = Array.from(document.getElementsByClassName("newsbox"));
    let newsSection = document.getElementById("news");
    let n = 1;
    let currentPage;
    while (newsArray.length > 0) {
        // Creates a news page or goes to the next one if it is filled
        if (document.getElementById("page" + n)) {
            currentPage = document.getElementById("page" + n);
        }
        else {
            currentPage = document.createElement("div");
            currentPage.classList.add("page");
            currentPage.id = "page" + n;
        }
        // Adds news page to the news section
        newsSection.appendChild(currentPage);
        // Fills the page with 3 news items
        for (let i=0; i<3; i++) {
            if (newsArray.length > 0) {
                currentPage.append(newsArray[0]);
                newsArray.shift();
                }
            }
        n++;
    }
}

const displayPage = (pageNumber) => {
    rightArrow.style.opacity = "1";
    leftArrow.style.opacity = "1";
    rightArrow.style.cursor = "pointer";
    leftArrow.style.cursor = "pointer";
    pagesArray = Array.from(document.getElementsByClassName("page"));
    pagesArray.forEach(page => {
        page.style.display = "none";
    });
    pagesArray[pageNumber - 1].style.display = "block";
    document.getElementById("page-number").textContent = "STRONA " + pageNumber + "/" + pagesArray.length;
    if (pageNumber === 1) {
        leftArrow.style.opacity = "0.2";
        leftArrow.style.cursor = "default";
    }
    if (pageNumber === pagesArray.length) {
        rightArrow.style.opacity = "0.2";
        rightArrow.style.cursor = "default";
    }
}

const arrows = () => {
    let pageCounter = 1;
    rightArrow.addEventListener("click", () => {
        if (pageCounter != pagesArray.length) {
            pageCounter++;
            displayPage(pageCounter);
        }  
    });
    leftArrow.addEventListener("click", () => {
        if (pageCounter - 1 != 0) {
            pageCounter--;
            displayPage(pageCounter)
        } 
    })
}

archiveNews();
displayPage(1);
arrows();

// Navbar animations //

let navbar = document.getElementById("navbar");

const navbarControl = () => {
    let currentScrollPos = pageYOffset; 
    if (0 < currentScrollPos) {
        navbar.style.backgroundColor = "rgb(121, 108, 108)";
        navbar.style.background = "linear-gradient(66deg, rgba(61,61,61,1) 0%, rgba(121,108,108,1) 100%)";
        navbar.style.height = "5vh";
        navbar.style.boxShadow = "-1px 4px 23px rgba(0, 0, 0, 0.75)";
        navbar.style.marginTop = "0"
    }
    else {
        navbar.style.backgroundColor = "";
        if (mobileNavbar.style.display != "flex")  {
            navbar.style.background = "none";
            navbar.style.height = "6vh";
            navbar.style.boxShadow = "none";
        }
            
    }
}

// Mobile menu //

let mobileNavbar = document.getElementById("mobile");

const expandMenu = () => {
    let background = navbar.style.background;
    let hamburgerMenu = document.getElementById("hamburgerMenu");
    if (background != "linear-gradient(66deg, rgba(61,61,61,1) 0%, rgba(121,108,108,1) 100%)") {
       navbar.style.background = "linear-gradient(66deg, rgba(61,61,61,1) 0%, rgba(121,108,108,1) 100%)";
    }
    if (mobileNavbar.style.display != "flex") {
        mobileNavbar.style.display = "flex"
        hamburgerMenu.src = "./images/xicon.png";
        if (getComputedStyle(navbar.height) === "6vh;") {
            mobileNavbar.style.marginTop = "1vh";
        }
    }
    else {
        mobileNavbar.style.display = "none";
        hamburgerMenu.src = "./images/menuicon.png";
    }
}

const displayBook = x => {
    for (let i=0; i<bookArray.length; i++) {
        document.getElementById(bookArray[i]).style.display = "none";
    }
    document.getElementById(bookArray[x]).style.display = "flex";
    document.getElementById(bookArray[x]).style.opacity = 0;
    setTimeout(appear(bookArray.indexOf(bookArray[x]), bookArray), 10);
}


startSlideshow();
onscroll = navbarControl;
