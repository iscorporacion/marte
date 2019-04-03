var appName = "Mis Links";
var confValidation = {
    framework: 'bootstrap',
    excluded: [':disabled', ':hidden', ':not(:visible)'],
    locale: 'es_ES',
    icon: {
        valid: 'zmdi zmdi-check',
        validating: 'zmdi zmdi-close'
    },
    row: {
        valid: 'field-success',
        invalid: 'field-error'
    }
};
/*
let sesion = function(params) {
    console.log(`llamado por ${params.modulo}`);
    let ejecutar = function(result) {
        if(result.error == 204){
            window.location.href = "index.html";
        }else{
            $(".usuario").empty().append(`
                <b>${result.rows.nombre}</b> [${result.rows.email}]
            `);
        }
    }
    $.get("modules/login/validarUsuario.php",{},function(result){
        result['accion'] = ejecutar;
        errorManager(result);
    },"json");
}*/

let mensaje = function (params,result) {
    console.log(params);
    console.log(result);
    let opcions = {
        title: result.title ?  result.title : "",
        buttonsStyling: false,
        allowOutsideClick: false,
        html: result.message,
        type: result.type || "info",
        confirmButtonText:"Aceptar",
        cancelButtonText:"Cancelar",
        customClass: {
            confirmButton: `btn blue-gradient waves-effect waves-light`,
            cancelButton: 'btn btn-danger waves-effect waves-light',
        }
    }
    Swal.fire(opcions).then(async (response) => {
        var funcion = params.ejecutar || null;
        if (response.value) {
            if (funcion != null)
                funcion(params,result);
        }
    }).catch(swal.noop);
}
let errorManager = function (params,result) {
    switch (result.error) {
        case 200:
            mensaje(params,result);
            break;
        case 201:
            var funcion = params.ejecutar || null;
            if (funcion != null)
                funcion(result);
            break;
        case 204:
            mensaje(params,result);
            break;
        case 500:
            mensaje(params,result);
            break;
        default:
            mensaje("Error desconocido");
    }
}

let solicitud = function (params) {
    $.ajax({
        url: params.url,
        type: params.type || "POST",
        dataType: "json",
        data: params.data,
        contentType: false,
        cache: false,
        processData: false,
        mineType: "multipart/form-data",
        beforeSend: function (param) {
            loader(params.loader);
        },
        success: function (result) {
            loader("close");
            errorManager(params,result);
        }
    })
}
// no tocar es el loader
var loader = (msj, funcion, arg) => {
    if (msj == 'close') {
        $(".progress").addClass("hide");
        $('#progressBar').css('width', '0%');
        $('.page-loader').fadeOut(function () {
            if (funcion != null)
                funcion(arg);
        });
    } else {
        $('.page-loader').find('.loader-msg').text(msj || "Procesando...!");
        $('.page-loader').fadeIn(function () {
            if (funcion != null)
                funcion(arg);
        });
    }
}
(function($){
    $(window).on("load",function(){        
        if($('.page-loader')[0]) {
            $('.page-loader').fadeOut();
        }
    });
    $(document).ready(function () {
        $(".appName").text(appName);
        $('[data-toggle="tooltip"]').tooltip();
    });
})(jQuery);
// finl loader