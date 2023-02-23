<?php
const HOST = DB_HOST;
const DBNAME = DB_NAME;
const USERNAME = DB_USER;
const PASSWORD = DB_PASS; 


class mysql{ 
/*===================== Admin Login start =============================*/
	function adminlogin($uname,$password){
	$conn1 = mysqli_connect(HOST, USERNAME, PASSWORD, DBNAME);
	   
		// $passwords=md5(md5($password));
		$passwords=$password;
		$uname=$uname;
			$sql="select * from adminlogin where username='".$uname."' and password='".$passwords."'";
		
			$value1=mysqli_query($conn1,$sql);
			// print_r ($sql); exit;
			$fetch=mysqli_fetch_array($value1);
			
			$_SESSION['id']=$fetch['id']; 
				
			$_SESSION['username']=$fetch['username'];
		if(($uname==$fetch['username']) && ($passwords==$fetch['password']))
		{ 
			return "true";
		}
		else
		{
			return "false";
		}
		return "false";
	}
/*============================= Change Password  =============================*/
		function change_password($old_pwd,$new_pwd,$sid){
		
		$conn1 = mysqli_connect(HOST, USERNAME, PASSWORD, DBNAME);

        $old_pwd=md5(md5($old_pwd));
		
        $web_password=md5(md5($new_pwd)); 	 
		$passval = mysqli_fetch_assoc(mysqli_query($conn1,"select * from adminlogin where password ='".$old_pwd."' AND id='".$sid."'"));		
		
		if($passval)
		{
			$sql = "update adminlogin set password='".$web_password."' where id='".$sid."'";
			mysqli_query($conn1,$sql);	
			return "success"; 
		}
		else
		{ 
			return "error";
		}
		exit();
	 }

	function select_query($table, $where){
			$conn1 = mysqli_connect(HOST, USERNAME, PASSWORD, DBNAME);
			$val1="select * from $table $where";
			
			$sql=mysqli_query($conn1,$val1); 	
			$num=mysqli_num_rows($sql);		
			if($num!=0)
			{   
				$i=0;
				$array_category= array();				
				while($query=mysqli_fetch_assoc($sql))
				{
					 foreach ($query as $key => $value) {
					 $array_category[$i][$key]=$value;
					 }							
					$i++;
				}
			}	
			return $array_category;
		}

		 	function add_query($field,$table){		

			$conn1 = mysqli_connect(HOST, USERNAME, PASSWORD, DBNAME);
			$key_value = implode(",", array_keys($field));
			$org_value = "'" . implode("','", array_values($field)) . "'" ;	
			$sql="insert into $table($key_value) values ($org_value)"; 
		
			$query=mysqli_query($conn1,$sql); 
			return true;
		}	
	function update_query($field,$table,$where){
			$conn1 = mysqli_connect(HOST, USERNAME, PASSWORD, DBNAME);
			$cn=1; $cnt_field=count($field);
			foreach($field as $key => $val)
			{
				if($cn!=$cnt_field)$comma= ", ";else $comma='';	
				$update.=$key."='".$val."'".$comma; 
				$cn++;
			}		
		  	$sql="Update $table set $update $where";   		 
			$query=mysqli_query($conn1,$sql);
			return true;
		}
		
		function delete_query($table,$where){
		$conn1 = mysqli_connect(HOST, USERNAME, PASSWORD, DBNAME);
			$sql="delete from $table $where ";
			$query=mysqli_query($conn1,$sql);
			return true;
		}




}

$searchReplaceArray = array(
' ' =>'%20',
'$' => '%24',
'&' => '%26',
'+'=>'%2B',
','=>'%2C',
'/'=>'%2F',
':'=>'%3A',
';'=>'%3B',
'='=>'%3D',
'?'=>'%3F',
'@'=>'%40',
"\'"=>'%27',
"'"=>'%27',
'"'=>'%93',
'‘'=>'%91',
'”'=>'%94',
'’'=>'%92',
'<'=>'%3C',
'>'=>'%3E'

);

$ReplaceArray = array(
'%20' => ' ',
'%24' => '$',
'%26' => '&',
'%2B'=>'+',
'%2C'=>',',
'%2F'=>'/',
'%3A'=>':',
'%3B'=>';',
'%3D'=>'=',
'%3F'=>'?',
'%40'=>'@',
'%27'=>"\'",
'%27'=>"'",
'%93'=>'"',
'%91'=>'‘',
'%94'=>'”',
'%92'=>'’',
'%3C'=>'<',
'%3E'=>'>'
);

function get_symbol($symbol)
{	
	global $ReplaceArray; global $searchReplaceArray;
	return $rslt=str_replace(array_keys($ReplaceArray),array_values($ReplaceArray),$symbol);
}

function get_entity($symbol) 
{	
	global $ReplaceArray; global $searchReplaceArray;
	return $rslt=str_replace(array_keys($searchReplaceArray),array_values($searchReplaceArray),$symbol);
}
$l_added="added";
$l_updated="updated";
$l_deleted="deleted";

?>