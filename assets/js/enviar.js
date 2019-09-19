$(document).ready(function () {
    $("#formulario").bind("submit",function(){
        var todoCorrecto = true;
        var respuestaError = "";

        var btnEnviar = $("#btnEnviar");
        var nombre = $("#nombre");
        var apellido = $("#apellido");
        var email = $("#email");
        var email2 = $("#email2");
        var dni = $("#dni");
        var movil = $("#movil");

        //patrones validos
        var patronnombre = "^[a-z A-Z]{2,50}$";
        var patronapellido = "^[a-z A-Z]{2,80}$";
        var patronemail = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{3}$";
        var patrondni = "[0-9]{8}[a-zA-Z]{1}$";
        var patronmovil = "[6|7]{1}[0-9]{8}$";

        //validamos todos campos por orden
        if(!patronCorrecto(nombre, patronnombre)){
            respuestaError = "- Por favor introduzca su nombre sin números<br\>";
            todoCorrecto= false;
            nombre.addClass('datoErroneo');
        }else {
            nombre.removeClass('datoErroneo');
        }

        if(!patronCorrecto(apellido, patronapellido)){
            respuestaError = respuestaError+"- Por favor introduzca su apellido sin números<br\>";
            todoCorrecto= false;
            apellido.addClass('datoErroneo');
        }else {
            apellido.removeClass('datoErroneo');
        }

        if(!patronCorrecto(email, patronemail)){
            respuestaError = respuestaError+"- Por favor introduzca un email valido ejemplo info@gmail.com <br\>";
            todoCorrecto= false;
            email.addClass('datoErroneo');
            email2.addClass('datoErroneo');
        }else if(email.val() !== email2.val()){
                respuestaError = respuestaError+"- Los Email introducidos no coinciden<br\>";
                todoCorrecto= false;
                email.removeClass('datoErroneo');
                email2.addClass('datoErroneo');
        }else{
            email.removeClass('datoErroneo');
        }

        if(!patronCorrecto(dni, patrondni)){
            respuestaError = respuestaError+"- Por favor introduzca un dni con el siguiente formato 12345678A<br\>";
            todoCorrecto= false;
            dni.addClass('datoErroneo');
        }else if(!comprobarLetraDNI(dni)){
                respuestaError = respuestaError+"- El dni es erroneo<br\>";
                todoCorrecto= false;
                dni.addClass('datoErroneo');
        }else{
            dni.removeClass('datoErroneo');
        }

        if(!patronCorrecto(movil, patronmovil)){
            respuestaError = respuestaError+"- Los teléfonos móviles aceptados empiezan por 6 ó 7 y cuentan con 9 números<br\>";
            todoCorrecto= false;
            movil.addClass('datoErroneo');
        }else{
            movil.removeClass('datoErroneo');
        }



        if(todoCorrecto){
            $.ajax({
                type: $(this).attr("method"),
                url: $(this).attr("action"),
                data:$(this).serialize(),
                beforeSend: function(){
                    btnEnviar.val("Enviando"); // Para input de tipo button
                    btnEnviar.attr("disabled","disabled");
                },
                complete:function(data){
                    btnEnviar.val("Enviar");
                    btnEnviar.removeAttr("disabled");
                },
                success: function(data){
                    /*
                    * Se ejecuta cuando termina la petición y esta ha sido
                    * correcta
                    * */
                    $(".respuesta").html(data);
                    if(data === "El usuario ya existe"){
                        $(".respuesta").removeClass('respuesta-afirmativa');
                        $(".respuesta").addClass('respuesta-negativa');
                    }else{
                        $(".respuesta").removeClass('respuesta-negativa');
                        $(".respuesta").addClass('respuesta-afirmativa');
                    }

                },
                error: function(data){
                    $(".respuesta").html("El formulario no pudo enviarse.<br/> Pruebe más tarde.<br/> Gracias.");
                    $(".respuesta").removeClass('respuesta-afirmativa');
                    $(".respuesta").addClass('respuesta-negativa');
                }
            });
        }else{
            $(".respuesta").html(respuestaError);
            $(".respuesta").removeClass('respuesta-afirmativa');
            $(".respuesta").addClass('respuesta-negativa');
        }

        // Nos permite cancelar el envio del formulario
        return false;
    });
});



/**
 * Función creada para comprobar los input a través de un patrón
 * devuelve true cuando no hay error
 */
function patronCorrecto(variable, patron) {
    return variable.val().match(patron) != null;
}

/*
devuelve true si la letra introducida es la correcta
 */
function comprobarLetraDNI(dni) {
    var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
    var numero = dni.val().substring(0,8);
    var letraDniActual = dni.val().substring(8,9);
    return letras[numero%23]===letraDniActual;

}