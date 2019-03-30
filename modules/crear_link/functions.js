$(document).ready(function () {
    $("[name=icono]").focusout(function(e) {
        $(".preview-icono").html(`<i class="${$(this).val()}" aria-hidden="true"></i>`);
    });
    $("#frm_crear_link").formValidation(confValidation)
    .on('success.form.fv', function (e) {
        e.preventDefault();
        $.post("PHP/create.php",{varia:"valor"},function (result) { 
            alert("hola");
        });
        // $.ajax({
        //     url:"PHP/create.php",
        //     type:"POST",
        //     dataType:"json",
        //     data:new FormData(e),
        //     mineType:"multipart/form-data",
        //     beforeSend:function (param) { 

        //     },
        //     success:function (result) { 
        //         errorManager(result);
        //     }
        // })
    });
});