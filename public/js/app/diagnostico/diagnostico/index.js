var altura_ocupada = 120;

$(function () {

    function formatadorLinkEditar(cellvalue, options, rowObject) {
        var r = rowObject,
            params = '',
            url = {
                editar: base_url + '/diagnostico/diagnostico/detalhar'
            };
        params = '/iddiagnostico/' + r[4];
        var editar = r[4];
        $return = '<a title="Editar" ' +
            'style="text-decoration: none; color: #0b83d1;" onMouseOver="this.style.textDecoration=\'underline\'; this.style.color = \'#1e395b\';" ' +
            'onMouseOut="this.style.textDecoration=\'none\'; this.style.color = \'#0b83d1\';" href="' + url.editar + params + '" >' + r[0] + '</a>\n';
        return $return;

    }

    var
        grid = null,
        lastsel = null,
        gridEnd = null,
        colModel = null,
        colNames = null,
        msgerroacesso = 'Acesso negado para essa ação.',
        colNames = ['Diagnóstico', 'Unidade Principal', 'Data de Início', 'Data de Encerramento', 'id'];
    colModel = [{
        name: 'dsdiagnostico',
        index: 'dsdiagnostico',
        width: 19,
        search: false,
        hidden: false,
        sortable: true,
        formatter: formatadorLinkEditar
    }, {
        name: 'sigla',
        index: 'sigla',
        width: 15,
        hidden: false,
        search: false,
        sortable: true
    }, {
        name: 'dtinicio',
        index: 'dtinicio',
        width: 8,
        hidden: false,
        search: false,
        sortable: true
    }, {
        name: 'dtencerramento',
        index: 'dtencerramento',
        width: 8,
        hidden: false,
        search: false,
        sortable: true
    }, {
        name: 'iddiagnostico',
        index: 'iddiagnostico',
        width: 8,
        hidden: true,
        search: false,
        sortable: true
    }];

    grid = jQuery("#list-grid-diagnostico").jqGrid({
        url: base_url + "/diagnostico/diagnostico/pesquisar?" + $("form#form-pesquisar").serialize(),
        datatype: "json",
        mtype: 'post',
        width: '645',
        height: '200',
        colNames: colNames,
        colModel: colModel,
        rownumbers: true,
        rowNum: 20,
        rowList: [20, 50, 100],
        pager: '#pager-grid-diagnostico',
        sortname: 'dsdiagnostico',
        viewrecords: true,
        sortorder: "asc",
        gridComplete: function () {
        },
        loadComplete: function (data) {
            console.log('sucesso');
            console.log(data);
        },
        loadError: function () {
            $.pnotify({
                text: 'Falha ao enviar a requisição',
                type: 'error',
                hide: false
            });
        },
    });

    grid.jqGrid('navGrid', '#pager-grid-diagnostico', {
        search: false,
        edit: false,
        add: false,
        del: false,
        view: false
    });

    grid.jqGrid('setLabel', 'rn', 'Ord');
    resizeGrid();

    /**
     * Envia ajax por array de parametros
     */
    function ajax_arrparams(url, data, callback) {
        $.ajax({
            url: base_url + url,
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function (data) {
                if (typeof data.msg.text !== 'string') {
                    $.formErrors(data.msg.text);
                    return;
                }
                $.pnotify(data.msg);
                if (callback && typeof (callback) === "function") {
                    callback(data);
                }
            },
            error: function () {
                $.pnotify({
                    text: msgerroacesso,
                    type: 'error',
                    hide: false
                });
            }
        });
    }

    $("form#form-pesquisar").validate();

    $('#submitbutton').click(function (e) {
        e.preventDefault();
        grid.setGridParam({
            url: base_url + "/diagnostico/diagnostico/pesquisar?" + $("form#form-pesquisar").serialize(),
            page: 1
        }).trigger("reloadGrid");
    });

    $("#dialog").dialog({
        autoOpen: false,
        title: 'Diagnóstico - Excluir',
        width: 360,
        height: 150,
        modal: true,
        dataType: 'json',
        type: 'POST',
        dataType: "text",
        buttons: {
            "Sim": function () {
                $.ajax({
                    url: base_url + '/diagnostico/diagnostico/excluir/format/json',
                    data: {
                        iddiagnostico: $('#diagnostico').val(),
                    },
                    success: function (data) {
                        if (typeof data.msg.text != 'string') {
                            $.formErrors(data.msg.text);
                            return;
                        }
                        $.pnotify(data.msg);
                        if (data.success) {
                            $.pnotify(data.msg.text);
                            window.location.href = base_url + "/diagnostico/diagnostico" + $("form#form-pesquisar").serialize();
                        }
                    }
                });
            },
            "Não": function () {
                $(this).dialog("close");
            }
        }
    });

    $("#dialogqtmelhoria").dialog({
        autoOpen: false,
        title: 'Diagnóstico - Editar',
        width: 360,
        height: 150,
        modal: true,
        dataType: 'json',
        type: 'POST',
        dataType: "text",
        buttons: {
            "Fechar": function () {
                $(this).dialog("close");
            }
        }
    });

    $("#btnexcluir").on("click", function (e) {
        e.preventDefault();
        $("#dialog").dialog("open");
    });

    $('.editar').click(function () {
        if ($('#quantidademelhoria').val() > 0) {
//            e.preventDefault();
            $("#dialogqtmelhoria").dialog("open");
            return false;

        } else {
            return true;
        }
    });

});