window.addEventListener("load", function () {

    let sliderInner = document.querySelector(".slider__inner");
    let sliderImg = document.querySelectorAll(".slider__img");
    let index = 1;
    let time = 5000; // timepo entre cada imagen
    let sliderDotContainer = document.querySelector(".slider-dot-container");

    for (let i = 0; i < sliderImg.length; i++) {
        let sliderDot = document.createElement("div");
        sliderDot.classList.add("slider-dot")
        sliderDot.style.backgroundColor = "#FFFFFF70"
        sliderDotContainer.appendChild(sliderDot);
    }

    let dots = document.querySelectorAll(".slider-dot");
    dots[index-1].style.backgroundColor = "#FFF"

    setInterval((time) => {
        let porcentage = index * -700;
        sliderInner.style.transform = `translateX(${porcentage}px)`;
        index++;
        if (index != 1) {
            dots[index-1].style.backgroundColor = "#FFFFFF"
            dots[index-2].style.backgroundColor = "#FFFFFF70"
        } else {
            dots[index-1].style.backgroundColor = "#FFF"
            dots[sliderImg.length-1].style.backgroundColor = "#FFFFFF50"
        }

        if (index > sliderImg.length-1) {
            index = 0;
        }
    }, time)

});