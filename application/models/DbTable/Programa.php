<?php

/**
 * Automatically generated data model
 *
 * This class has been automatically generated based on the dbTable "" @ 16-05-2013
 * 17:22
 */
class Default_Model_DbTable_Programa extends Zend_Db_Table_Abstract
{
    protected $_schema = 'agepnet200';
    protected $_name = 'tb_programa';
    protected $_primary = array('idprograma');
    protected $_dependentTables = array();
    protected $_referenceMap = array(
        'Pessoa' => array(
            'refTableClass' => 'tb_pessoa',
            'columns' => 'idresponsavel',
            'refColumns' => 'idpessoa'
        )
    );

}

