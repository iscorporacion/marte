$(document).ready(function () {
    $("[name=icono]").focusout(function (e) {
        $(".preview-icono").html(`<i class="${$(this).val()}" aria-hidden="true"></i>`);
    });
    $("#frm_crear_link").formValidation(confValidation)
        .on('success.form.fv', function (e) {
            e.preventDefault();
            solicitud({
                url: "PHP/create.php",
                data: new FormData(this),
            });
        });
});