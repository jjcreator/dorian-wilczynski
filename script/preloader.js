const initPreloader = () => {
    const mainWrapper = document.getElementById("mainWrapper");
    const preloader = document.getElementById("preloader");
    
    window.onload = () => {
        mainWrapper.style.display = "block";
        preloader.style.display = "none";
        setSlide(1);
    }
}

export default initPreloader;


