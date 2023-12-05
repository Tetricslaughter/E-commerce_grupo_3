window.addEventListener("load", function () {

    console.log("hola");

    let sliderInner = document.querySelector(".slider__inner");
    let sliderImg = document.querySelectorAll(".slider__img");
    let index = 1;
    let time = 5000;

    setInterval((time) => {
        let porcentage = index * -700;
        sliderInner.style.transform = "translateX(" + porcentage + "px)";
        index++;
        index > sliderImg.length - 1 ? index = 0 : '';
    }, time)



});