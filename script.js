document.addEventListener("DOMContentLoaded", function () {
    const departamentoInput = document.getElementById("departamentoInput");
    const localidadInput = document.getElementById("localidadInput");
    const buscarButton = document.getElementById("buscarButton");
    const resultado = document.getElementById("resultado");
    const encabezadoResultado = document.getElementById("encabezado-resultado");
    const divResultado = document.getElementById("div-resultado");
    const divEncabezado = document.getElementById("div-encabezado");
    

    buscarButton.addEventListener("click", async function () {
        
        const departamento = departamentoInput.value.trim();
        const localidad = localidadInput.value.trim();
        const mensajeError = "Por favor, ingrese ";


        if (departamento === "" && localidad === "") {
            alertaInput("", `${mensajeError} un departamento y una localidad.`);
            return;
        }

        if (departamento === "" && localidad !== "") {
            alertaInput("", `${mensajeError} un departamento.`);
            return;
        }

        if (departamento !== "" && localidad === "") {
            alertaInput("", `${mensajeError} una localidad.`);
            return;
        }

        try {
            const res = await fetch(`https://direcciones.ide.uy/api/v0/geocode/localidades?departamento=${departamento}`);
            const data = await res.json();

            const localidadEncontrada = data.find(item => item.nombre.toUpperCase() === localidad.toUpperCase());

            if (localidadEncontrada) {
                const codigoPostal = localidadEncontrada.codigoPostal;
                divResultado.removeAttribute("hidden");
                divEncabezado.removeAttribute("hidden");
                encabezadoResultado.innerHTML = resultado.innerHTML = `EL CÓDIGO POSTAL DE ${localidadEncontrada.nombre.toUpperCase()} (${departamento.toUpperCase()}) ES:`
                resultado.innerHTML = `${codigoPostal}`;
            } else {
                divEncabezado.setAttribute("hidden", true);
                resultado.innerHTML = `LOCALIDAD NO ENCONTRADA EN EL DEPARTAMENTO ${departamento.toUpperCase()}.`;
            }
        } catch (error) {
            console.error("Error:", error);
            resultado.innerHTML = "Error al obtener los datos";
        }
    });

    function alertaInput(encabezado, mensaje) {
        divEncabezado.setAttribute("hidden", true);
        divResultado.removeAttribute("hidden");
        encabezadoResultado.innerHTML = encabezado;
        resultado.innerHTML = mensaje;
    }
});