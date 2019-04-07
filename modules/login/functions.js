<<<<<<< HEAD

function hacer(params,result) { 
    // params = parametros de la petición
    // result = resultado de la petición
    // $("#agregarUsuario")[0].reset();
    // $('[name=email]').focus();
    if(result.error == 200){
        window.location.href = result.url;
    }else{
        $('[contra=email]').focus();
    }
}
$("#login").formValidation(confValidation)
    .on('success.form.fv', function (e) {
        e.preventDefault();
        solicitud({
            url: "PHP/login.php",
            data: new FormData(this),
            loader:"logeando...!",
            // ejecutar:hacer /*quitar si no quiere que ejecute una función después de terminar*/ 
        });
    });
=======
$(document).ready(function () {
    function hacer(result, params) {
        if (result.error == 200 || result.error == 201) {
            window.location.href = result.url;
        }else{
            $('[name=email]').focus();
        }
    }
    $("#validarUsuario").formValidation(confValidation)
        .on('success.form.fv', function (e) {
            e.preventDefault();
            solicitud({
                url: "PHP/validarUsuario.php",
                data: new FormData(this),
                loader: "Registrando...!",
                ejecutar: hacer /*quitar si no quiere que ejecute una función después de terminar*/
            });
        });
    sesion({ href: false, "url": "/modules/perfil" });
});
>>>>>>> origin/thaylor
