// Preload images

let images = ["../images/tree.jpg", "../images/skycastle.jpg", "../images/book1.jpg"];

images.forEach(imageUrl => {
    let img = new Image();
    img.src = imageUrl;
});

// Preloader

const mainWrapper = document.getElementById("mainWrapper");
const preloader = document.getElementById("preloader");

window.onload = () => {
    mainWrapper.style.display = "block";
    preloader.style.display = "none";
}

// Appear effect for displaying slides / books / news pages //

const appear = (x, arr) => {
    let grabbed = arr[x];
    grabbed.style.opacity = (parseFloat(grabbed.style.opacity) + 0.015);
    if (grabbed.style.opacity < 1) {
        setTimeout(appear, 10, x, arr);
    }
}

// Slideshow - main showcase //

let looping;
let slidePosition = 0;
let slideArray = Array.from(document.getElementsByClassName("slide"));
let buttonsArray = Array.from(document.getElementsByClassName("buttons"));
let topButtons = Array.from(document.getElementsByClassName("topButton"));

buttonsArray.forEach((button)=> {
    button.addEventListener("click", ()=> {
        setSlide(buttonsArray.indexOf(button) + 1)
    })
});

const displaySlide = () => {
    stopSlideshow();
    let currentSlide = slideArray[slidePosition];
    let currentButton = buttonsArray[slidePosition];
    buttonsArray.forEach((button)=> {
        button.style.backgroundColor = "rgba(0,0,0,0.65)"
        });
    for (let i=0; i<slideArray.length; i++) {
        if (currentSlide === slideArray[i] && currentButton === buttonsArray[i]) {
            currentSlide.style.opacity = 0;
            currentSlide.style.display = "flex";
            currentButton.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
            appear(slideArray.indexOf(currentSlide), slideArray);
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
   looping = setInterval(nextSlide, 7000);
}

const stopSlideshow = () => {
    clearInterval(looping);
}

const setSlide = x => {
    slidePosition = x - 1;
    displaySlide();
}

topButtons.forEach((button) => {
    button.addEventListener("mouseover", stopSlideshow);
    button.addEventListener("mouseout", startSlideshow);
    if (topButtons.indexOf(button) == 0) button.addEventListener("click", ()=> {
        displayBook(0);
    });
    if (topButtons.indexOf(button) == 1) button.addEventListener("click", ()=> {
        displayBook(4);
    });
    if (topButtons.indexOf(button) == 2) button.addEventListener("click", ()=> {
        displayBook(3);
    });
});

setSlide(1);

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
    pagesArray[pageNumber - 1].style.opacity = 0;
    appear(pageNumber - 1, pagesArray );
    document.getElementById("page-number").textContent = "Strona " + pageNumber + " / " + pagesArray.length;
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
let myGradient = "linear-gradient(66deg, rgba(61,61,61,1) 0%, rgba(121,108,108,1) 40%, rgba(61,61,61,1) 100%)";
let navItem = document.querySelectorAll(".navItem")
let hamburgerMenu = document.getElementById("hamburgerMenu");

const navbarControl = () => {
    let currentScrollPos = pageYOffset; 
    if (0 < currentScrollPos) {
        navbar.style.backgroundColor = "rgb(121, 108, 108)";
        navbar.style.background = myGradient ;
        navbar.style.height = "8vh";
        navbar.style.boxShadow = "-1px 4px 23px rgba(0, 0, 0, 0.75)";
    }
    else {
        navbar.style.height = "9vh";
        navbar.style.boxShadow = "none"; 
        if (mobileNavbar.style.display != "flex") {
            navbar.style.background = "none";
        }
    }
}

onscroll = navbarControl;

// Mobile menu //

let mobileNavbar = document.getElementById("mobile");
let mobileMenuItems = Array.from(document.getElementsByClassName("navItemMobile"));

const expandMenu = () => {
    let background = navbar.style.background;
    if (background != myGradient) {
       navbar.style.background = myGradient;
    }
    if (mobileNavbar.style.display != "flex") {
        mobileNavbar.style.display = "flex"
        hamburgerMenu.src = "./images/xicon.png";
    }
    else {
        mobileNavbar.style.display = "none";
        hamburgerMenu.src = "./images/menuicon.png";
    }
}

hamburgerMenu.addEventListener("click", expandMenu);
mobileMenuItems.forEach((item)=> {
    item.addEventListener("click", expandMenu);
})
addEventListener("resize", ()=> {
    if (innerWidth > 768) {
        mobileNavbar.style.display = "none";
        hamburgerMenu.src = "./images/menuicon.png"
    }
})

// Display books

let bookArray = Array.from(document.getElementsByClassName("bookcaseBody"));
let bookItems = Array.from(document.getElementsByClassName("bookItem"));
let bookPrev = document.getElementById("bookPrev");
let bookNext = document.getElementById("bookNext");
let mobileBooklist = document.querySelector(".mobileBooklist");
let currentBook = 0;

const displayBook = x => {
    bookArray.forEach((bookDescription)=> {
        bookDescription.style.display = "none"
    })
    bookArray[x].style.display = "flex";
    bookArray[x].style.opacity = 0;
    currentBook = bookArray.indexOf(bookArray[x])
    appear(currentBook, bookArray);
    mobileBooklist.innerText = bookItems[currentBook].innerText;
}

bookItems.forEach((item)=> {
    item.addEventListener("click", () => {
        displayBook(bookItems.indexOf(item))
    })
});

mobileBooklist.innerText = bookItems[currentBook].innerText;

bookPrev.addEventListener("click", ()=> {
    currentBook === 0 ? displayBook(5) : displayBook(currentBook - 1);
    mobileBooklist.innerText = bookItems[currentBook].innerText;
})

bookNext.addEventListener("click", ()=> {
    currentBook === (bookArray.length -1) ? displayBook(0) : displayBook(currentBook + 1);
    mobileBooklist.innerText = bookItems[currentBook].innerText;
})