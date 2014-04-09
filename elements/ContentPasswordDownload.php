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

/**
 * Run in a custom namespace, so the class can be replaced
 */
namespace MCupic;


/**
 * Class ContentPasswordDownload
 *
 * Front end content element "download".
 * @copyright  Marko Cupic 2010-2013
 * @author     Marko Cupic <m.cupic@gmx.ch>
 * @package    Controller
 */
class ContentPasswordDownload extends \ContentElement
{

       /**
        * File object
        * @var File
        */
       protected $objFile;

       /**
        * Template
        * @var string
        */
       protected $strTemplate = 'ce_pw_download';

       /**
        * AuthStatus
        * @var bool
        */
       protected $authError = null;


       /**
        * Return if the file does not exist
        * @return string
        */
       public function generate()
       {

              if ($this->singleSRC == '')
              {
                     return '';
              }

              $objFile = \FilesModel::findByUuid($this->singleSRC);

              if ($objFile === null)
              {
                     if (!\Validator::isUuid($this->singleSRC))
                     {
                            return '<p class="error">' . $GLOBALS['TL_LANG']['ERR']['version2format'] . '</p>';
                     }

                     return '';
              }

              if (!is_file(TL_ROOT . '/' . $objFile->path))
              {
                     return '';
              }


              $allowedDownload = trimsplit(',', strtolower($GLOBALS['TL_CONFIG']['allowedDownload']));

              // Return if the file type is not allowed
              if (!in_array($objFile->extension, $allowedDownload))
              {
                     return '';
              }

              $this->objFile = new \File($objFile->path, true);


              // Check password
              if ($this->Input->post('FORM_SUBMIT') == 'pw_download' && strlen($this->Input->post('ceId') && $this->Input->post('ceId') == $this->id))
              {
                     if (strlen($this->Input->post('password')))
                     {
                            if ($this->Input->post('password') == $this->pw_download_key)
                            {
                                   // send file to browser if password is ok
                                   \Controller::sendFileToBrowser($this->objFile->path);
                            }
                            else
                            {
                                   // send error message if a wrong password was entered
                                   $this->authError = true;
                            }
                     }
                     else
                     {
                            if ($this->pw_download_key == "")
                            {
                                   // send file to browser if no key is defined
                                   \Controller::sendFileToBrowser($this->objFile->path);
                            }
                            else
                            {
                                   // send error message if no password was entered
                                   $this->authError = true;
                            }
                     }
              }
              return parent::generate();
       }


       /**
        * Generate the content element
        */
       protected function compile()
       {

              $objFile = $this->objFile;

              if (!strlen($this->linkTitle))
              {
                     $this->linkTitle = $objFile->basename;
              }

              // store the file object in a template var, so you can easily access its properties
              $this->Template->objFile = $objFile;

              // store the content element object in a template var, so you can easily access its properties
              $this->Template->objCe = $this;

              $this->Template->closeLayer = $GLOBALS['TL_LANG']['MSC']['closeLayer'];
              $this->Template->enterKey = $GLOBALS['TL_LANG']['MSC']['enterKey'];
              $this->Template->link = $this->linkTitle;
              $this->Template->title = 'Download: ' . specialchars($this->linkTitle);
              $this->Template->size = $this->getReadableSize($objFile->filesize, 1);
              $this->Template->formAction = \Environment::get('request');
              $this->Template->ceId = $this->id;
              $this->Template->filesize = $this->getReadableSize($objFile->filesize, 1);
              $this->Template->icon = TL_ASSETS_URL . 'assets/contao/images/' . $objFile->icon;
              $this->Template->mime = $objFile->mime;
              $this->Template->extension = $objFile->extension;
              $this->Template->path = $objFile->dirname;
              $this->Template->fileHref = TL_MODE == 'FE' ? 'javascript:fadeInForm(this,' . $this->id . ')' : 'javascript:void(0)';

              if ($this->authError === true)
              {
                     $this->Template->authError = true;
                     $this->Template->passwordErrorMessage = sprintf($GLOBALS['TL_LANG']['MSC']['wrongPassword'], $this->linkTitle);
              }
       }
}
