<?php 
error_reporting(0); session_start();ob_start();
$ip=$_SERVER["SERVER_ADDR"];
if($ip=="::1")
{
	define("DB_HOST", "localhost");
	define("DB_NAME", "localad"); 
	define("DB_USER", "root");
	define("DB_PASS", "");
$sitepath='http://localhost/Task/LocalAd';
$siteadminpath='http://localhost/Task/LocalAd/adminpanel/';

}
else
{
    define("DB_HOST", "db5012038873.hosting-data.io");
    define("DB_NAME", "dbs10133207");
    define("DB_USER", "dbu5110161");
    define("DB_PASS", "Local@dadmiN@2023#");

    $sitepath='http://nskfix.com/dev/LocalAd/';
    $siteadminpath='http://nskfix.com/dev/LocalAd/adminpanel';
}


define('DOCUMENT_ROOT', $_SERVER['DOCUMENT_ROOT']);
define('SCRIPT_NAME',   $_SERVER["SCRIPT_NAME"]);
define('OUR_LOGO',      "images/logo.png");
define('PREFIX',       "la");
include_once('mysql_class.php');
$sql=new mysql(); 

// $table_setting=PREFIX."setting";
// $where_setting="";
// $res_setting=$sql->select_query($table_setting, $where_setting);
// define('SITETITLE', get_symbol($res_setting[0]['esite_title']));
?>