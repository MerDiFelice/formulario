const formulario = document.getElementById("formulario"); // selecciona el formulario

const inputs = document.querySelectorAll("#formulario input"); // selecciona todos los input del formulario, el resultado es un array

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 caracteres.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
};
const campos = {
    usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

// Agrega un evento para detectar el envio del formulario
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault(); // anula el envio por la accion del formulario

    const terminos = document.getElementById('terminos');

    if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) 
    {
        /* ---- guardar los datos o enviar los datos ----*/

        formulario.reset();

        document.getElementById('formulario_mensaje_exito').classList.add('formulario_mensaje_exito_activo');
        setTimeout( () => {
            document.getElementById('formulario_mensaje_exito').classList.remove('formulario_mensaje_exito_activo');
        }, 5000);

        document.querySelectorAll('.formulario_grupo_correcto').forEach( (icono) => {
            icono.classList.remove('formulario_grupo_correcto');
        });
        
    }
    else
    {
        document.getElementById('formulario_mensaje').classList.add('formulario_mensaje_activo');

        setTimeout( () => {
            document.getElementById('formulario_mensaje').classList.remove('formulario_mensaje_activo');
        }, 5000);
    }
});

const validarFormulario = (evento) => {
    switch (evento.target.name) {
        case 'usuario':
            // if (expresiones.usuario.test(evento.target.value)) 
            // {
            //     document.getElementById('grupo_usuario').classList.remove('formulario_grupo_incorrecto');
            //     document.getElementById('grupo_usuario').classList.add('formulario_grupo_correcto');
            //     document.querySelector('#grupo_usuario i').classList.remove('fa-times-circle');
            //     document.querySelector('#grupo_usuario i').classList.add('fa-check-circle');
            //     document.querySelector('#grupo_usuario .formulario_input_error').classList.remove('formulario_input_error_activo');
            // } 
            // else 
            // {
            //     document.getElementById('grupo_usuario').classList.remove('formulario_grupo_correcto');
            //     document.getElementById('grupo_usuario').classList.add('formulario_grupo_incorrecto');
            //     document.querySelector('#grupo_usuario i').classList.remove('fa-check-circle');
            //     document.querySelector('#grupo_usuario i').classList.add('fa-times-circle');
            //     document.querySelector('#grupo_usuario .formulario_input_error').classList.add('formulario_input_error_activo');
            // }
            validarCampo(expresiones.usuario, evento.target, 'usuario');
            break;
        case 'nombre':
            validarCampo(expresiones.nombre, evento.target, 'nombre');
            break;
        case 'password':
            validarCampo(expresiones.password, evento.target, 'password');
            validarPassword2();
            break;
        case 'password2':
            validarPassword2();
            break;
        case 'correo':
            validarCampo(expresiones.correo, evento.target, 'correo');
            break;
        case 'telefono':
            validarCampo(expresiones.telefono, evento.target, 'telefono');
            break;
    }    
};

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) 
            {
                document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo_incorrecto');
                document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo_correcto');
                document.querySelector(`#grupo_${campo} i`).classList.remove('fa-times-circle');
                document.querySelector(`#grupo_${campo} i`).classList.add('fa-check-circle');
                document.querySelector(`#grupo_${campo} .formulario_input_error`).classList.remove('formulario_input_error_activo');
                campos[campo] = true;
            } 
            else 
            {
                document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo_correcto');
                document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo_incorrecto');
                document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check-circle');
                document.querySelector(`#grupo_${campo} i`).classList.add('fa-times-circle');
                document.querySelector(`#grupo_${campo} .formulario_input_error`).classList.add('formulario_input_error_activo');
                campos[campo] = false;
            }
};

const validarPassword2 = () => {
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");
    if (password.value !== password2.value) 
    {
        document.getElementById(`grupo_password2`).classList.remove('formulario_grupo_correcto');
        document.getElementById(`grupo_password2`).classList.add('formulario_grupo_incorrecto');
        document.querySelector(`#grupo_password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo_password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo_password2 .formulario_input_error`).classList.add('formulario_input_error_activo');
        campos['password'] = false;
    } 
    else 
    {
        document.getElementById(`grupo_password2`).classList.remove('formulario_grupo_incorrecto');
        document.getElementById(`grupo_password2`).classList.add('formulario_grupo_correcto');
        document.querySelector(`#grupo_password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo_password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo_password2 .formulario_input_error`).classList.remove('formulario_input_error_activo');
        campos['password'] = true;
    }
};

// Se recorre los input al ejecutarse un evento en cada uno de ellos
inputs.forEach( (input) => {
    input.addEventListener('keyup', validarFormulario); // evento que se agrega a los input cuando se presiona y se suelta una tecla
                                                        // y se llama a la funcion validarFormulario
    input.addEventListener('blur', validarFormulario); //  evento que se agrega a los input cuando se sale o pierde el foco
                                                         // y se llama a la funcion validarFormulario
});