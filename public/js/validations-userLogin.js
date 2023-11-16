window.addEventListener("load", () => {

    let username = document.querySelector("#username");
    let password = document.querySelector("#password");
    let form = document.querySelector("form.form-login");

    username.addEventListener("blur", (e) => {

        username.removeAttribute("style");
        /** elimino los p.feedback anteriores para que no se amontonen */
        let elementoPadre = username.parentElement;
        elementoPadre.querySelectorAll("p.feedback").forEach(feedback => {
            elementoPadre.removeChild(feedback);
        });

        let errores = [];

        if (username.value.length == 0) {
            errores.push("El campo no puede estar vacío.");
        }

        for (let i=0; i<errores.length; i++) {
            let p = document.createElement("p");
            p.classList.add("feedback");
            p.innerText = errores[i]
            username.parentNode.insertBefore(p, username.nextSibling)
        }

        if (errores.length > 0) {
            username.style.border = "1px solid red";
        }

    });

    password.addEventListener("blur", (e) => {

        password.removeAttribute("style");
        /** elimino los p.feedback anteriores para que no se amontonen */
        let elementoPadre = password.parentElement;
        elementoPadre.querySelectorAll("p.feedback").forEach(feedback => {
            elementoPadre.removeChild(feedback);
        });

        let errores = [];

        if (password.value.length == 0) {
            errores.push("El campo no puede estar vacío.");
        }

        for (let i=0; i<errores.length; i++) {
            let p = document.createElement("p");
            p.classList.add("feedback");
            p.innerText = errores[i]
            password.parentNode.insertBefore(p, password.nextSibling)
        }

        if (errores.length > 0) {
            password.style.border = "1px solid red";
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