<?php

/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2005-2014 Leo Feyer
 *
 * @package Pw_download
 * @link    https://contao.org
 * @license http://www.gnu.org/licenses/lgpl-3.0.html LGPL
 */


/**
 * Register the namespaces
 */
ClassLoader::addNamespaces(array
(
	'MCupic',
));


/**
 * Register the classes
 */
ClassLoader::addClasses(array
(
	// Elements
	'MCupic\ContentPasswordDownload' => 'system/modules/pw_download/elements/ContentPasswordDownload.php',
));


/**
 * Register the templates
 */
TemplateLoader::addFiles(array
(
	'ce_pw_download' => 'system/modules/pw_download/templates',
));
