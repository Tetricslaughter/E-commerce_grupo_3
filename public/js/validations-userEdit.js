window.addEventListener("load", () => {

    let name = document.querySelector("#name");
    let surname = document.querySelector("#surname");
    let email = document.querySelector("#email");
    let birthDay = document.querySelector("#birthDay");
    let form = document.querySelector("form.form-edit");

    name.addEventListener("blur", (e) => {
        
        name.removeAttribute("style");
        /** elimino los p.feedback anteriores para que no se amontonen */
        let elementoPadre = name.parentElement;
        elementoPadre.querySelectorAll("p.feedback").forEach(feedback => {
            elementoPadre.removeChild(feedback);
        });

        let errores = [];

        if (name.value.length == 0) {
            errores.push("El campo no puede estar vacío.");
        } else if (name.value.length < 2) {
            errores.push("El nombre debe tener al menos 2 caracteres.")
        } else if (name.value.length > 30) {
            errores.push("El nombre puede tener como maximo 30 caracteres.")
        }

        for (let i=0; i<errores.length; i++) {
            let p = document.createElement("p");
            p.classList.add("feedback");
            p.innerText = errores[i]
            name.parentNode.insertBefore(p, name.nextSibling)
        }

        if (errores.length > 0) {
            name.style.border = "1px solid red";
        }
    });

    surname.addEventListener("blur", (e) => {
        
        surname.removeAttribute("style");
        /** elimino los p.feedback anteriores para que no se amontonen */
        let elementoPadre = surname.parentElement;
        elementoPadre.querySelectorAll("p.feedback").forEach(feedback => {
            elementoPadre.removeChild(feedback);
        });

        let errores = [];

        if (surname.value.length == 0) {
            errores.push("El campo no puede estar vacío.");
        } else if (surname.value.length < 2) {
            errores.push("El apellido debe tener al menos 2 caracteres.")
        } else if (surname.value.length > 30) {
            errores.push("El apellido puede tener como maximo 30 caracteres.")
        }

        for (let i=0; i<errores.length; i++) {
            let p = document.createElement("p");
            p.classList.add("feedback");
            p.innerText = errores[i]
            surname.parentNode.insertBefore(p, surname.nextSibling)
        }

        if (errores.length > 0) {
            surname.style.border = "1px solid red";
        }
    });

    email.addEventListener("blur", (e) => {
        
        email.removeAttribute("style");
        /** elimino los p.feedback anteriores para que no se amontonen */
        let elementoPadre = email.parentElement;
        elementoPadre.querySelectorAll("p.feedback").forEach(feedback => {
            elementoPadre.removeChild(feedback);
        });

        let errores = [];

        if (email.value.length == 0) {
            errores.push("El campo no puede estar vacío.");
        } else if (email.value.length < 10) {
            errores.push("El email es muy corto.");
        } else if (email.value.length > 30) {
            errores.push("El email es demasiado largo.");
        } else if (!email.value.includes('@')) {
            errores.push("El email no es válido.");
        }

        for (let i=0; i<errores.length; i++) {
            let p = document.createElement("p");
            p.classList.add("feedback");
            p.innerText = errores[i]
            email.parentNode.insertBefore(p, email.nextSibling)
        }

        if (errores.length > 0) {
            email.style.border = "1px solid red";
        }
    });

    birthDay.addEventListener("blur", (e) => {
        
        birthDay.removeAttribute("style");
        
        /** elimino los p.feedback anteriores para que no se amontonen */
        let elementoPadre = birthDay.parentElement;
        elementoPadre.querySelectorAll("p.feedback").forEach(feedback => {
            elementoPadre.removeChild(feedback);
        });

        let errores = [];

        if (birthDay.value.length == 0) {
            errores.push("El campo no puede estar vacío.");
        }

        for (let i=0; i<errores.length; i++) {
            let p = document.createElement("p");
            p.classList.add("feedback");
            p.innerText = errores[i]
            birthDay.parentNode.insertBefore(p, birthDay.nextSibling)
        }

        if (errores.length > 0) {
            birthDay.style.border = "1px solid red";
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