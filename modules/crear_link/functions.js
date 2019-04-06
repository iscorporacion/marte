$(document).ready(function () {
    $("[name=icono]").focusout(function (e) {
        $(".preview-icono").html(`<i class="${$(this).val()}" aria-hidden="true"></i>`);
    });
    function hacer(result, params) {
        // result = resultado de la petición
        // params = parametros de la petición
        $("#frm_crear_link")[0].reset();
        $("#frm_crear_link").formValidation('resetForm', true);
        $("[name=icono]").focus();
    }
    sesion({ href: false });
    $("#frm_crear_link").formValidation(confValidation)
        .on('success.form.fv', function (e) {
            e.preventDefault();
            solicitud({
                url: "PHP/create.php",
                data: new FormData(this),
                loader: "Cargando...!",
                ejecutar: hacer /*quitar si no quiere que ejecute una función después de terminar*/
            });
        });
    
});