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
