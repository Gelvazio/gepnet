<?php

/**
 * Automatically generated data model
 *
 * This class has been automatically generated based on the dbTable "" @ 16-05-2013
 * 17:21
 */
class Default_Model_DbTable_Agenda extends Zend_Db_Table_Abstract
{

    protected $_name = 'tb_agenda';
    protected $_primary = array('idagenda');
    protected $_dependentTables = array();
    protected $_referenceMap = array(
        'Pessoa' => array(
            'refTableClass' => 'tb_pessoa',
            'columns' => 'idcadastrador',
            'refColumns' => 'idpessoa'
        ),
        'Escritorio' => array(
            'refTableClass' => 'tb_escritorio',
            'columns' => 'idescritorio',
            'refColumns' => 'idescritorio'
        )
    );

}

