<? 
include_once('../lib/config.php'); 
$pagename="change_password.php";
$pagetitle="Change Password";
if($_SESSION['id']=="")
{
header('Location:index.php');exit();
}

$field=array();	
$field['currentpassword']=$_REQUEST['currentpassword'];
$field['newpassword']=$_REQUEST['newpassword'];	
$sid=1;
$currentpassword=$field['currentpassword'];		
$newpassword=$field['newpassword'];

		if((isset($_REQUEST['currentpassword'])) && isset($_REQUEST['newpassword']))
			{				
			$res=$sql->change_password($currentpassword,$newpassword,$sid);	
			if($res==true){	?>				
					<script>window.location='<? echo $pagename."?msg=".$l_updated?>';</script>
				<? }	
		}
?>
<!DOCTYPE html>
<html>
<head>
<title>Localad Admin | <?=$pagetitle?></title>
<? include_once('header.php');?>
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper"><? include_once('menu.php');?>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>
        Localad Admin
      </h1>
      <ol class="breadcrumb">
        <li><a href="dashboard.php"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active"><?=$pagetitle?></li>
      </ol>
    </section>

    <section class="content">
	<? if ($_REQUEST["msg"]== "updated"){ ?>
	<div class="alert alert-success alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <i class="icon fa fa-check"></i> Password updated successfully!!!
              </div>
	<? } ?>
	  <div class="row">
        <div class="col-xs-12">     
   			 <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title"><?=$pagetitle?></h3>
            </div>

			<form name="form" id="pageform" class="form-horizontal pageform" enctype="multipart/form-data" method="post" action="">
              <div class="box-body">
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Current Password&nbsp; <font color="red">*</font> :</label>

                  <div class="col-sm-9">
                    <input type="password" class="form-control" id="currentpassword" name="currentpassword" placeholder="Current Password" maxlength="20">
					<label id="mpassworderr" class="error" style="display:none;">Invalid old password</label>
                  </div>
                </div>                
               <div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">New Password&nbsp; <font color="red">*</font> :</label>

                  <div class="col-sm-9">
                    <input type="password" class="form-control" id="newpassword" name="newpassword" placeholder="New Password" maxlength="20">
                  </div>
                </div>  
 				<div class="form-group">
                  <label for="inputEmail3" class="col-sm-3 control-label">Confirm Password&nbsp; <font color="red">*</font> :</label>

                  <div class="col-sm-9">
                    <input type="password" class="form-control" id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" maxlength="20">
                  </div>
                </div>   				
              </div>
              <!-- /.box-body -->
              <div class="box-footer" style="padding-right: 20.5%;">
			  <input type="hidden" value="" id="hdnvalue" name="hdnvalue">			
				 <button type="submit" id="edit" name="edit" class="btn btn-success"><i class="fa fa-save"></i>&nbsp;&nbsp;Update</button>				
			<!--	<button type="reset" class="btn btn-default">Cancel</button> -->
              </div></form></div>	</div></div></section></div>

<? include_once('footer.php');?>

<script type="text/javascript">
$(function () {
	
	$("#pageform").validate({
		rules: {
			currentpassword:  {
						required: true
			},
			newpassword:  {
						required: true
						} ,
			confirmpassword:  {
						required: true,
						equalTo : "#newpassword"
						}  			
		},
		messages: {		
			currentpassword: {
				required: "Please enter your current password",
			},
			newpassword: {
				required: "Please enter your new password", 
			},
			confirmpassword: {
				required: "Please confirm your password",
			} 
		},			
		submitHandler: function() {		
			  $.ajax({
					type: "POST",
					url: "checkpwd.php",
					data: { 
						password: $('#currentpassword').val(),
					},
					success: function(result) {
						if(result=="1"){
							document.form.submit();
						}else{
							$('#mpassworderr').show();
						}
					}
				});		
			
		}
	});
});

</script>
</div></body></html>