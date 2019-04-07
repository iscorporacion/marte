$(document).ready(function () {
    $("[name=icono]").focusout(function (e) {
        $(".preview-icono").html(`<i class="${$(this).val()}" aria-hidden="true"></i>`);
    });
    function hacer(result, params) {
        if (result.error == 200) {
            $("#frm_crear_link")[0].reset();
            $("#frm_crear_link").formValidation('resetForm', true);
            $("[name=icono]").focus();
        } else {
            $('[name=titulo]').focus();
        }

    }
    sesion({ href: true });
    $("#frm_crear_link").formValidation(confValidation)
        .on('success.form.fv', function (e) {
            e.preventDefault();
            solicitud({
                url: "PHP/create.php",
                data: new FormData(this),
                loader: "Guardando link...!",
                ejecutar: hacer 
            });
        });

});