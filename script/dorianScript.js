let slidePosition = 0;
let slideArray = ["stories", "audiobook","gamebook", "textbook"];
let buttonsArray = ["firstButton", "secondButton", "thirdButton", "fourthButton"];
let bookArray = ["storyOne", "storyTwo", "storyThree", "bookOne", "audio1", "audio2"];
let newsCollection = document.getElementsByClassName("newsbox");
let pagesCollection = document.getElementsByClassName("page");
let pagesArray;
let currentPage;
let pageCounter = 1;
let rightArrow = document.getElementById("right-arrow");
let leftArrow = document.getElementById("left-arrow");

// Appear effect for displaying slides / books

const appear = (x, arr) => {
    let grabbed = document.getElementById(arr[x]);
    grabbed.style.opacity = (parseFloat(grabbed.style.opacity) + 0.01);
    if (grabbed.style.opacity < 1) {
        setTimeout(appear, 10, x, arr);
    }
}

// Slideshow - main showcase

const displaySlide = () => {
    stopSlideshow();
    let currentSlide = slideArray[slidePosition];
    let currentButton = buttonsArray[slidePosition];
    for (let n=0; n<buttonsArray.length; n++) {
        document.getElementById(buttonsArray[n]).style.backgroundColor = "rgba(0,0,0,0.65)";
    }
    for (let i=0; i<slideArray.length; i++) {
        if(currentSlide === slideArray[i] && currentButton === buttonsArray[i]) {
            document.getElementById(currentSlide).style.opacity = 0;
            document.getElementById(currentSlide).style.display = "flex";
            document.getElementById(currentButton).style.backgroundColor = "rgba(255, 255, 255, 0.73)";
            setTimeout(appear(slideArray.indexOf(currentSlide), slideArray), 10);
        }      
        else document.getElementById(slideArray[i]).style.display = "none";
    }
    startSlideshow();
}

const nextSlide = () => {
    if(slidePosition < slideArray.length - 1) slidePosition +=1;
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

// News archive

const archiveNews = () => {
    newsArray = Array.from(newsCollection);
    let news = document.getElementById("news");
    let n = 1;
    while (newsArray.length > 0) {
        if (document.getElementById("page" + n)) {
            currentPage = document.getElementById("page" + n);
        }
        else {
            currentPage = document.createElement("div");
            currentPage.classList.add("page");
            currentPage.id = "page" + n;
        }
        news.appendChild(currentPage);
        for (let i=0; i<3; i++) {
            if (newsArray.length > 0) {
                currentPage.append(newsArray[0]);
               newsArray.shift();
                }
            }
        n++;
    }
}

archiveNews();

const displayPage = (pageNumber) => {
    rightArrow.style.opacity = "1";
    leftArrow.style.opacity = "1";
    rightArrow.style.cursor = "pointer";
    leftArrow.style.cursor = "pointer";
    pagesArray = Array.from(pagesCollection);
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

displayPage(1);

rightArrow.addEventListener("click", ()=> {
    if (pageCounter != pagesCollection.length) {
        pageCounter++;
        displayPage(pageCounter);
    }
    

});
leftArrow.addEventListener("click", ()=> {
    if (pageCounter - 1 != 0) {
        pageCounter--;
        displayPage(pageCounter)
    }
    
})

// On scroll effects //
const navbarControl = () => {
    let currentScrollPos = window.pageYOffset;
    if(0 < currentScrollPos) {
    document.getElementById("navbar").style.backgroundColor = "rgb(121, 108, 108)";
    document.getElementById("navbar").style.background = "linear-gradient(66deg, rgba(61,61,61,1) 0%, rgba(121,108,108,1) 100%)";
    document.getElementById("navbar").style.height = "5vh";
    document.getElementById("navbar").style.boxShadow = "-1px 4px 23px rgba(0, 0, 0, 0.75)";
    document.getElementById("mobile").style.marginTop = "0"
    }
    else {document.getElementById("navbar").style.backgroundColor = "";
    if (document.getElementById("mobile").style.display != "flex") document.getElementById("navbar").style.background = "none"
    document.getElementById("navbar").style.height = "6vh";
    document.getElementById("navbar").style.boxShadow = "none";
    document.getElementById("mobile").style.marginTop = "1vh";
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

// Mobile menu //

const expandMenu = () => {
    let background = document.getElementById("navbar").style.background;
    if (background != "linear-gradient(66deg, rgba(61,61,61,1) 0%, rgba(121,108,108,1) 100%)") {
       document.getElementById("navbar").style.background = "linear-gradient(66deg, rgba(61,61,61,1) 0%, rgba(121,108,108,1) 100%)";
    }
    if (document.getElementById("mobile").style.display === "" || document.getElementById("mobile").style.display === "none") {
        document.getElementById("mobile").style.display = "flex"
        document.getElementById("hamburgerMenu").src = "./images/xicon.png";
        if (getComputedStyle(document.getElementById("navbar")) === "6vh;") {
            document.getElementById("mobile").style.marginTop = "1vh";
        }
    }
    else {document.getElementById("mobile").style.display = "none";
    document.getElementById("hamburgerMenu").src = "./images/menuicon.png";
    }
}

startSlideshow();
window.onscroll = navbarControl;