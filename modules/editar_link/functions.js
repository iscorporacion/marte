$(document).ready(async function () {
    $("[name=icono]").focusout(function (e) {
        $(".preview-icono").html(`<i class="${$(this).val()}" aria-hidden="true"></i>`);
    });
    async function resetForm(result, params) {
        if (result.error == 200) {
            await localStorage.removeItem("idLink");
            window.location.href = result.url;
        }else{
            $('[name=titulo]').focus();
        }
    }
    async function mostrarLink(result, params) {
        await $("[name=icono]").val(result.rows.icono);
        await $("[name=url]").val(result.rows.url);
        await $("[name=descripcion]").val(result.rows.descripcion);
        await $("[name=titulo]").val(result.rows.titulo).focus();
        await loader("close");
    }
    sesion({ href: true, loaderStop:true });
    $("#frm_editar_link").formValidation(confValidation)
        .on('success.form.fv', function (e) {
            e.preventDefault();
            let formData = new FormData(this);
            formData.append("id",id);
            solicitud({
                url: "PHP/update.php",
                data: formData,
                loader: "Cargando...!",
                ejecutar: resetForm
            });
        });
    let id = await localStorage.getItem("idLink");
    let formData = new FormData();
    formData.append("id",id);
    await solicitud({
        url: "PHP/listarLink.php",
        loader: "Cargando link...!",
        data:formData,
        ejecutar: mostrarLink,
        loaderStop:true
    });
    
});