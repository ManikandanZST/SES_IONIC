<?
include_once('../lib/config.php');
$password = $_REQUEST['password'];
$table="adminlogin";
$passwords=($password);
$where=" where password ='".$passwords."'";
$res = $sql->select_query($table,$where);
if(count($res)){
	echo "1";
}else{ 
	echo "0";
}
?>