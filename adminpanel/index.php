<? 
include_once('../lib/config.php'); 
$pagename="index.php";
$pagetitle="Login";
$err="";
if(isset($_REQUEST['username'])&& $_REQUEST['username']!=''){
 $res=$sql->adminlogin($_REQUEST['username'],$_REQUEST['password']);
 if($res=="true") 
 {   ?> 
   <script>window.location='dashboard.php';</script>   
   <? }
 else 
 {
    $err= "<p class='errormsg'>Invalid login details!</p>";
 }
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Localad Admin | <?= $pagetitle?></title>
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="css/AdminLTE.min.css">

</head>

<body class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <a href="index.php"><img src="images/logo.png" width="132px" height="61px" alt="Logo"/></a>
  </div>
  <div class="login-box-body">
 <h3>Admin Login</h3>
<?=$err ?>
    <form method="post" id="loginform">
      <div class="form-group has-feedback loginfrm">	  
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        <input type="text" class="form-control" placeholder="Username" name="username" id="username">
      </div>
      <div class="form-group has-feedback loginfrm">
	  <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        <input type="password" class="form-control" placeholder="Password" name="password" id="password">      
      </div>
      <div class="row">      
        <div class="col-xs-4">
          <button type="submit" class="btn btn-success btn-block btn-flat">Login</button>
		  </div><div class="col-xs-4">
		  <button type="reset" class="btn btn-default btn-block btn-flat">Reset</button>
        </div>
      </div>
    </form>
	<br/>
  </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="js/jquery.validate.min.js"></script>

<script type="text/javascript">
$().ready(function() {

	$("#loginform").validate({
		rules: {
			username: "required",
			password: "required",		
		},
		messages: {	
	
			username: {
				required: "",
			},
			password: {
				required: "",
			},	    
					},
		submitHandler: function() { 			
			document.form.submit();
		}
	});
	
});
</script>
</body>
</html>