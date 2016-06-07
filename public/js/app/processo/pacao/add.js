function selectRow(row) {
    //console.log(row);
    $('.input-selecionado')
        .find('input:hidden').val(row.idpessoa).trigger('blur')
        .end()
        .find('input:text').val(row.nompessoa).trigger('blur');
}

$(function() {
    $.pnotify.defaults.history = false;

    $(".select2").select2();

    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy',
        language: 'pt-BR'
    });

    $('#idprojetoprocesso')
            .attr('readonly', true)
            .focus(function() {
        $(this).blur();
    });

    var $form = $("form#form-pacao");

    $form.validate({
        errorClass: 'error',
        validClass: 'success',
        submitHandler: function(form) {
            enviar_ajax("/processo/pacao/add/format/json", "form#form-pacao", function(data) {
                if (data.success) {
                    $("#resetbutton").trigger('click');
                }
            });
            //console.log('enviando');
        }
    });
    $(".pessoa-button").on('click', function(event) {
        event.preventDefault();
        $(this).closest('.container-pessoa').find('.control-group').removeClass('input-selecionado');
        $(this).closest('.control-group').addClass('input-selecionado');
        if ($("table#list-grid-pessoa").length <= 0) {
            $.ajax({
                url: base_url + "/cadastro/pessoa/grid",
                type: "GET",
                dataType: "html",
                success: function(html) {
                    $(".grid-append").append(html).slideDown('fast');
                }
            });
            $('.pessoa-button')
                .off('click')
                .on('click',function() {
                    var $this = $(this);
                    $(".grid-append").slideDown('fast', function(){
                        $this.closest('.container-pessoa').find('.control-group').removeClass('input-selecionado');
                        $this.closest('.control-group').addClass('input-selecionado');
                    });
                });
        }
    });


});