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


// add content element
$GLOBALS['TL_CTE']['files']['pw_download'] = 'ContentPasswordDownload';


if (TL_MODE == 'FE')
{
       $GLOBALS['TL_JAVASCRIPT'][] = 'system/modules/pw_download/assets/js/pw_download.js';
       $GLOBALS['TL_CSS'][] = 'system/modules/pw_download/assets/css/pw_download.css';
}