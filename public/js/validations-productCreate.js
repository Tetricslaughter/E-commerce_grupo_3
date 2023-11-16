window.addEventListener("load", () => {

    let form = document.querySelector("form.crearprod__form");
    let nameProd = document.querySelector("#nameProd");
    let descriptionProd = document.querySelector("#descriptionProd");
    let brandProd = document.querySelector("#brandProd");
    let categoryProd = document.querySelector("#categoryProd");
    let lifestageProd = document.querySelector("#lifestageProd");
    let priceProd = document.querySelector("#priceProd");
    let discountProd = document.querySelector("#discountProd");
    let stockProd = document.querySelector("#stockProd");
    let imageProd = document.querySelector("#imageProd");

    nameProd.addEventListener("blur", (e) => {

        nameProd.removeAttribute("style");

        /** elimino los p.feedback anteriores para que no se amontonen */
        let elementoPadre = nameProd.parentElement;
        elementoPadre.querySelectorAll("p.feedback").forEach(feedback => {
            elementoPadre.removeChild(feedback);
        });

        let errores = [];

        if (nameProd.value.length == 0) {
            errores.push("El campo no puede estar vacío.");
        } else if (nameProd.value.length < 5) {
            errores.push("El nombre del producto debe tener al menos 5 caracteres.")
        } else if (nameProd.value.length > 50) {
            errores.push("El nombre del producto puede tener como maximo 50 caracteres.")
        }

        for (let i=0; i<errores.length; i++) {
            let p = document.createElement("p");
            p.classList.add("feedback");
            p.innerText = errores[i]
            nameProd.parentNode.insertBefore(p, nameProd.nextSibling)
        }

        if (errores.length > 0) {
            nameProd.style.border = "1px solid red";
        }
    });

    descriptionProd.addEventListener("blur", (e) => {

        descriptionProd.removeAttribute("style");

        /** elimino los p.feedback anteriores para que no se amontonen */
        let elementoPadre = descriptionProd.parentElement;
        elementoPadre.querySelectorAll("p.feedback").forEach(feedback => {
            elementoPadre.removeChild(feedback);
        });

        let errores = [];

        if (descriptionProd.value.length == 0) {
            errores.push("El campo no puede estar vacío.");
        } else if (descriptionProd.value.length < 20) {
            errores.push("La descripción debe tener al menos 20 caracteres.");
        }

        for (let i=0; i<errores.length; i++) {
            let p = document.createElement("p");
            p.classList.add("feedback");
            p.innerText = errores[i]
            elementoPadre.insertBefore(p, descriptionProd.nextSibling)
        }

        if (errores.length > 0) {
            descriptionProd.style.border = "1px solid red";
        }
    });

    brandProd.addEventListener("blur", (e) => {

        brandProd.removeAttribute("style");

        /** elimino los p.feedback anteriores para que no se amontonen */
        let elementoPadre = brandProd.parentElement;
        elementoPadre.querySelectorAll("p.feedback").forEach(feedback => {
            elementoPadre.removeChild(feedback);
        });

        let errores = [];

        if (brandProd.value.length == 0) {
            errores.push("El campo no puede estar vacío.");
        } else if (brandProd.value.length < 2) {
            errores.push("La marca del producto debe tener al menos 2 caracteres.");
        } else if (brandProd.value.length > 30) {
            errores.push("La marca del producto no debe superar los 30 caracteres.");
        }

        for (let i=0; i<errores.length; i++) {
            let p = document.createElement("p");
            p.classList.add("feedback");
            p.innerText = errores[i]
            elementoPadre.insertBefore(p, brandProd.nextSibling)
        }

        if (errores.length > 0) {
            brandProd.style.border = "1px solid red";
        }
    });

    categoryProd.addEventListener("blur", (e) => {

        categoryProd.removeAttribute("style");

        /** elimino los p.feedback anteriores para que no se amontonen */
        let elementoPadre = categoryProd.parentElement;
        elementoPadre.querySelectorAll("p.feedback").forEach(feedback => {
            elementoPadre.removeChild(feedback);
        });

        let errores = [];

        if (categoryProd.value == "") {
            errores.push("Debe seleccionar una categoría.");
        }

        for (let i=0; i<errores.length; i++) {
            let p = document.createElement("p");
            p.classList.add("feedback");
            p.innerText = errores[i]
            elementoPadre.insertBefore(p, categoryProd.nextSibling)
        }

        if (errores.length > 0) {
            categoryProd.style.border = "1px solid red";
        }
    });

    lifestageProd.addEventListener("blur", (e) => {

        lifestageProd.removeAttribute("style");

        /** elimino los p.feedback anteriores para que no se amontonen */
        let elementoPadre = lifestageProd.parentElement;
        elementoPadre.querySelectorAll("p.feedback").forEach(feedback => {
            elementoPadre.removeChild(feedback);
        });

        let errores = [];

        if (lifestageProd.value == "") {
            errores.push("Debe seleccionar una categoría.");
        }

        for (let i=0; i<errores.length; i++) {
            let p = document.createElement("p");
            p.classList.add("feedback");
            p.innerText = errores[i]
            elementoPadre.insertBefore(p, lifestageProd.nextSibling)
        }

        if (errores.length > 0) {
            lifestageProd.style.border = "1px solid red";
        }
    });

    priceProd.addEventListener("blur", (e) => {

        priceProd.removeAttribute("style");

        /** elimino los p.feedback anteriores para que no se amontonen */
        let elementoPadre = priceProd.parentElement;
        elementoPadre.querySelectorAll("p.feedback").forEach(feedback => {
            elementoPadre.removeChild(feedback);
        });

        let errores = [];

        if (priceProd.value == 0) {
            errores.push("El producto no puede valer cero.");
        } else if (priceProd.value > 999999) {
            errores.push("El producto no puede valer mas de un millón.");
        } else if (priceProd.value < 0) {
            errores.push("El producto no puede valer negativo.");
        }

        for (let i=0; i<errores.length; i++) {
            let p = document.createElement("p");
            p.classList.add("feedback");
            p.innerText = errores[i]
            elementoPadre.insertBefore(p, priceProd.nextSibling)
        }

        if (errores.length > 0) {
            priceProd.style.border = "1px solid red";
        }
    });

    discountProd.addEventListener("blur", (e) => {

        discountProd.removeAttribute("style");

        /** elimino los p.feedback anteriores para que no se amontonen */
        let elementoPadre = discountProd.parentElement;
        elementoPadre.querySelectorAll("p.feedback").forEach(feedback => {
            elementoPadre.removeChild(feedback);
        });

        let errores = [];

        if (discountProd.value > 99) {
            errores.push("El descuento no puede ser mayor al 99%.");
        } else if (discountProd.value < 0) {
            errores.push("El descuento no puede ser negativo.");
        }

        for (let i=0; i<errores.length; i++) {
            let p = document.createElement("p");
            p.classList.add("feedback");
            p.innerText = errores[i]
            elementoPadre.insertBefore(p, discountProd.nextSibling)
        }

        if (errores.length > 0) {
            discountProd.style.border = "1px solid red";
        }
    });

    stockProd.addEventListener("blur", (e) => {

        stockProd.removeAttribute("style");

        /** elimino los p.feedback anteriores para que no se amontonen */
        let elementoPadre = stockProd.parentElement;
        elementoPadre.querySelectorAll("p.feedback").forEach(feedback => {
            elementoPadre.removeChild(feedback);
        });

        let errores = [];

        if (stockProd.value > 99999) {
            errores.push("Numero muy grande para stock.");
        } else if (stockProd.value < 0) {
            errores.push("El producto no puede tener stock negativo.");
        }

        for (let i=0; i<errores.length; i++) {
            let p = document.createElement("p");
            p.classList.add("feedback");
            p.innerText = errores[i]
            elementoPadre.insertBefore(p, stockProd.nextSibling)
        }

        if (errores.length > 0) {
            stockProd.style.border = "1px solid red";
        }
    });

    form.addEventListener("submit", (e) => {
        let campos = form.querySelectorAll(".campo");
        let hayErrores = false;

        for (let i=0; i<campos.length; i++) {
            if (campos[i].querySelectorAll(".feedback").length > 0) {
                hayErrores = true;
                break;
            }
        }
        if (hayErrores == true) {
            e.preventDefault();
        }
    });

});