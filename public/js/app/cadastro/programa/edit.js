function enviar_ajax(url, form, callback) {
    $.ajax({
        url: base_url + url,
        dataType: 'json',
        type: 'POST',
        data: $(form).serialize(),
        //processData:false,
        success: function (data) {
            if (typeof data.msg.text != 'string') {
                $.formErrors(data.msg.text);
                return;
            }
            if (callback && typeof (callback) === "function") {
                callback();
            }
            $.pnotify(data.msg);
        },
        error: function () {
            $.pnotify({
                text: 'Falha ao enviar a requisição',
                type: 'error',
                hide: false
            });
        }
    });
}

$(function () {
    $.pnotify.defaults.history = false;
    //$(".select2").select2();

    $("#resetbutton").click(function () {
        //$('.container-importar').slideToggle();
        $("#importar").select2('data', null);
        $("#alert-import").html('').hide();
        $("#btn-importar").attr('disabled', true);
        $("select#domcargo option").attr('disabled', false);
    });

    $('.mask-cel').mask("(99) 9999-9999?9").focusout(function () {
        var phone, element;
        element = $(this);
        element.unmask();
        phone = element.val().replace(/\D/g, '');
        if (phone.length > 10) {
            element.mask("(99) 99999-999?9");
        } else {
            element.mask("(99) 9999-9999?9");
        }
    }).trigger('focusout');


    $('.mask-tel').mask("(99) 9999-9999");
    $('.mask-cpf').mask("999.999.999-99");

    var $form = $("form#form-pessoa");

    $form.validate({
        errorClass: 'error',
        validClass: 'success',
        /*
        showErrors: function (errorMap, errorList) {
            $.each(errorList, function (index, value) {
                $(value.element).parents('.control-group').addClass('error');
            });
        },
        */
        highlight: function (element, errorClass, validClass) {
            //console.log('wilton');
            var $element;
            if (element.type === 'radio') {
                $element = this.findByName(element.name);
            } else {
                $element = $(element);
            }
            $element.addClass(errorClass).removeClass(validClass);
            // add the bootstrap error class
            $element.parents("div.control-group").addClass("error").removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
            //console.log('unwilton');
            var $element;
            if (element.type === 'radio') {
                $element = this.findByName(element.name);
            } else {
                $element = $(element);
            }
            $element.removeClass(errorClass).addClass(validClass);
            // remove the bootstrap error class
            $element.parents("div.control-group").removeClass(errorClass)/*.addClass(validClass)*/;

            if ($element.parents("div.control-group").find("." + errorClass).length == 0) {
                // Only remove the class if there are no other errors
                $element.parents("div.control-group").removeClass("error");
            }
        },
        submitHandler: function (form) {
            $.ajax({
                url: base_url + "/cadastro/escritorio/edit/format/json",
                dataType: 'json',
                type: 'POST',
                async: true,
                cache: true,
                data: $form.serialize(),
                processData: false,
                success: function (data) {
                    if (typeof data.msg.text != 'string') {
                        $.formErrors(data.msg.text);
                        return;
                    }
                    $.pnotify(data.msg);
                    if (data.success) {
                        $("#resetbutton").trigger('click');
                    }
                },
                error: function () {
                    //$('div#noticia').html('Em manuten&ccedil;&atilde;o');
                }
            });
        }
    });

//    $.formErrors = function(data) {
//        $.each(data, function(element, errors) {
//            var ul = $("<ul>").attr("class", "errors help-inline");
//            $.each(errors, function(name, message) {
//                ul.append($("<li>").text(message));
//            });
//            $("#" + element).parent().find('ul').remove();
//            $("#" + element).after(ul);
//        });
//    }


});






