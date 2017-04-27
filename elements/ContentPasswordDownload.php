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
     * Template
     * @var string
     */
    protected $strTemplate = 'ce_pw_download';


    /**
     * Return if the file does not exist
     * @return string
     */
    public function generate()
    {

        // Return if there is no file
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

        $allowedDownload = trimsplit(',', strtolower(\Config::get('allowedDownload')));

        // Return if the file type is not allowed
        if (!in_array($objFile->extension, $allowedDownload))
        {
            return '';
        }

        $file = \Input::get('file', true);

        // Send the file to the browser and do not send a 404 header (see #4632)
        if ($file != '' && $file == $objFile->path)
        {
            \Controller::sendFileToBrowser($file);
        }

        $this->singleSRC = $objFile->path;


        if ($this->id == \Input::get('file'))
        {
            if ($_SESSION['PW_DOWNLOAD'][$this->id] == true)
            {
                \Controller::sendFileToBrowser($objFile->path);
            }
        }


        // Check password
        if (\Environment::get('isAjaxRequest') && $this->Input->get('id') == $this->id && $this->Input->get('code'))
        {
            if ($this->Input->get('code') == $this->pw_download_key)
            {
                $_SESSION['PW_DOWNLOAD'][$this->id] = true;
                // send file to browser if password is ok
                // send error message if a wrong password was entered
                $message = array('status' => 'success', 'message' => '<p class="success">' . $GLOBALS['TL_LANG']['MSC']['rightPassword'] . '</p>');
                echo json_encode($message);
                exit();
            }
            else
            {
                $objFile = new \File($this->singleSRC, true);
                if ($this->linkTitle == '')
                {
                    $this->linkTitle = specialchars($objFile->basename);
                }
                // send error message if a wrong password was entered
                $message = array('status' => 'error', 'message' => '<p class="error">' . sprintf($GLOBALS['TL_LANG']['MSC']['wrongPassword'], $this->linkTitle) . '</p>');
                echo json_encode($message);
                exit();
            }
        }
        return parent::generate();
    }


    /**
     * Generate the content element
     */
    protected function compile()
    {

        $objFile = new \File($this->singleSRC, true);

        if ($this->linkTitle == '')
        {
            $this->linkTitle = specialchars($objFile->basename);
        }

        $strHref = \Environment::get('request');

        // Remove an existing file parameter (see #5683)
        if (preg_match('/(&(amp;)?|\?)file=/', $strHref))
        {
            $strHref = preg_replace('/(&(amp;)?|\?)file=[^&]+/', '', $strHref);
        }

        $strHref .= ((\Config::get('disableAlias') || strpos($strHref, '?') !== false) ? '&amp;' : '?') . 'file=' . $this->id;

        $this->Template->link = $this->linkTitle;
        $this->Template->title = specialchars($this->titleText ?: sprintf($GLOBALS['TL_LANG']['MSC']['download'], $objFile->basename));
        $this->Template->href = $strHref;
        $this->Template->filesize = $this->getReadableSize($objFile->filesize, 1);
        $this->Template->icon = \Image::getPath($objFile->icon);
        $this->Template->mime = $objFile->mime;
        $this->Template->extension = $objFile->extension;
        $this->Template->path = $objFile->dirname;


        $this->Template->closeLayer = $GLOBALS['TL_LANG']['MSC']['closeLayer'];
        $this->Template->fileIsProtected = $GLOBALS['TL_LANG']['MSC']['fileIsProtected'];
        $this->Template->enterKey = $GLOBALS['TL_LANG']['MSC']['enterKey'];

        $this->Template->auth = 'true';
        if ($_SESSION['PW_DOWNLOAD'][$this->id] == true)
        {
            $this->Template->auth = 'false';
        }


    }
}
