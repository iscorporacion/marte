var appName = "Mis favoritos";
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


let sesion = async function(params) {
    let hacer = function(result) {
        console.log(params);
        if(result.error > 200){
            if(result.error == 201){
                if(params.href == true)
                    window.location.href = result.url;
            }else{
                if(params.url){
                    window.location.href = params.url
                }else{
                    $(".usuario").empty().append(`
                        ${result.rows.nombre}
                    `);
                }
            }
        }
    }
    await solicitud({
        url: "/PHP/validarSesion.php",
        loader:"Validando usuario...!",
        ejecutar:hacer,
        loaderStop: params.loaderStop || false
    });
}

let mensaje = function (result,params) {
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
                funcion(result,params);
        }
    }).catch(swal.noop);
}
let errorManager = function (result,params) {
    switch (result.error) {
        case 200:
            mensaje(result,params);
            break;
        case 201:
            var funcion = params.ejecutar || null;
            if (funcion != null)
                funcion(result,params);
            break;
        case 202:
            var funcion = params.ejecutar || null;
            if (funcion != null)
                funcion(result,params);
            break;
        case 204:
            mensaje(result);
            break;
        case 500:
            mensaje(result,params);
            break;
        default:
            mensaje("Error desconocido");
    }
}

let solicitud = async function (params) {
    result = await $.ajax({
        url: params.url,
        type: params.type || "POST",
        dataType: "json",
        data: params.data || null,
        contentType: false,
        cache: false,
        processData: false,
        mineType: "multipart/form-data",
        beforeSend: function (param) {
            loader(params.loader);
        },
        success: function (result) {
            if(!params.loaderStop){
                loader("close");
            }
            errorManager(result,params);
        }
    });
    return result;
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
            // $('.page-loader').fadeOut();
        }
    });
    $(document).ready(function () {
        $(".appName").text(appName);
        $('[data-toggle="tooltip"]').tooltip();
    });
})(jQuery);
// finl loader