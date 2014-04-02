<?php

/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2005-2014 Leo Feyer
 *
 * @package   pw_download
 * @author    Marko Cupic, m.cupic@gmx.ch
 * @license   shareware
 * @copyright Marko Cupic 2014
 */


// add palette
$GLOBALS['TL_DCA']['tl_content']['palettes']['pw_download'] = '{type_legend},type,headline;{source_legend},singleSRC,pw_download_key;{dwnconfig_legend},linkTitle;{protected_legend:hide},protected;{expert_legend:hide},guests,invisible,cssID,space';

// add field
$GLOBALS['TL_DCA']['tl_content']['fields']['pw_download_key'] = array(
       'label'       => &$GLOBALS['TL_LANG']['tl_content']['pw_download_key'],
       'exclude'     => false,
       'inputType'   => 'text',
       'eval' => array(
              'mandatory' => true,
              'maxlength' => 255,
              'allowHtml' => false
       ),
       'sql'         => 'text NULL'
);
