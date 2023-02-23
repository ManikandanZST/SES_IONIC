<? 
include_once('../lib/config.php');  
$pagename="setting.php";
$pagetitle="Settings";
if($_SESSION['id']=="")
{ 
header('Location:index.php');exit();
}
$table="lasetting"; 

$field=array();	
$field['lsite_title']=get_entity($_REQUEST['lsite_title']);	
$field['laddress']=get_entity($_REQUEST['laddress']);
$field['lbook_mail']=get_entity($_REQUEST['lbook_mail']);
$field['lcontact_mail']=get_entity($_REQUEST['lcontact_mail']);
$field['lmeta']=get_entity($_REQUEST['lmeta']);
$field['lmeta_key']=get_entity($_REQUEST['lmeta_key']); 
$sid = $_REQUEST["mid"];
		if($_REQUEST['action']!="")
		{					
			if($_REQUEST['hdnvalue'] =="" && $_SERVER['HTTP_REFERER'] != ""){
			if(isset($_REQUEST['add']))
			{	
			    					
			 	$res=$sql->add_query($field,$table);				
				
					if($res==true)
					{?>
					<script>window.location='<? echo $pagename."?msg=".$l_added?>';</script>
					<? }	
			}
			
			if(isset($_REQUEST['edit']))
			{	
			$where=" where lid=".$sid;	
			$res=$sql->update_query($field,$table,$where);
			if($res==true){	?>				
					<script>window.location='<? echo $pagename."?msg=".$l_updated?>';</script>
				<? }	
			}
			}			
			
			if($_REQUEST['action']=="delete")
			{
			$where=" where lid =".$sid." limit 1";		
			$res=$sql->delete_query($table,$where);
			if($res==true){?>
					<script>window.location='<? echo $pagename."?msg=".$l_deleted?>';</script>
			  <? }
			}					
		}
?>

<!DOCTYPE html>
<html>
<head>
<title>Localad Admin | <?=$pagetitle?></title>
<? include_once('header.php');?>
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">
<? include_once('menu.php');?>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>
        Site Setting Management
      </h1>	 
      <ol class="breadcrumb">
        <li><a href="dashboard.php"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active"><?=$pagetitle?></li>
      </ol>
    </section>

    <section class="content">
	<? if ($_REQUEST["msg"]== "added"){ ?>
	<div class="alert alert-success alert-dismissible">
		<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
		<i class="icon fa fa-check"></i> Content created successfully!!!
	  </div>
	<? } elseif ($_REQUEST["msg"]== "updated"){ ?>
	<div class="alert alert-success alert-dismissible">
		<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
		<i class="icon fa fa-check"></i> Content updated successfully!!!
	  </div>
	<? } elseif ($_REQUEST["msg"]== "deleted") { ?>
		<div class="alert alert-success alert-dismissible">
		<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
		<i class="icon fa fa-check"></i> Content deleted successfully!!!
	  </div>
	<? } ?>
	  <div class="row">
        <div class="col-xs-12">
		<? if(($_REQUEST['action']=="add") || ($_REQUEST['action']=="edit"))
			{ 
			 		 if($_REQUEST['action']=="edit")
					  {
						$where=" where lid ='".$sid."'";
						$res_edit = $sql->select_query($table,$where);	
					  } 
					  if($_REQUEST['action']=="add"){ 						  
						  $var="Add";						  
					  } else if($_REQUEST['action']=="edit"){ 					  
						$var="Edit";
					  }
			?>
     
   			 <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title"><?=$pagetitle?> - <?=$var?></h3>
            </div>

			<form name="form" id="pageform" class="form-horizontal pageform" enctype="multipart/form-data" method="post" action="">
            

              <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">Site Title<font color="red">*</font> :</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control col-sm-7" id="lsite_title" name="lsite_title" placeholder="Site Title" value="<?=get_symbol($res_edit[0]["lsite_title"])?>" >
                  </div>
              </div>

              <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">Address<font color="red">*</font>:</label>
                  <div class="col-sm-10">
                   <textarea id="laddress" name="laddress" placeholder="Address" class="col-sm-7 form-control" rows="3" cols="83" style=" border: 1px solid #ccc;"><?=get_symbol($res_edit[0]["laddress"])?></textarea>
					<label for="econtent" id="mcontenterrr" class="error" style="display:none;">Please enter address</label>
                  </div>
                </div> 

              <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">Booking Email<font color="red">*</font> :</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control col-sm-7" id="lbook_mail" name="lbook_mail" placeholder="Booking Email" value="<?=get_symbol($res_edit[0]["lbook_mail"])?>" >
                  </div>
              </div>


              <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">Contact Email<font color="red">*</font> :</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control col-sm-7" id="lcontact_mail" name="lcontact_mail" placeholder="Contact Email" value="<?=get_symbol($res_edit[0]["lcontact_mail"])?>">
                  </div>
              </div>

              <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">Meta Description<font color="red">*</font>:</label>
                  <div class="col-sm-10">
                   <textarea id="lmeta" class="form-control col-sm-7" name="lmeta" placeholder="Description"  rows="7" cols="83" style=" border: 1px solid #ccc;"><?=get_symbol($res_edit[0]["lmeta"])?></textarea>
					<label for="econtent" id="mcontenterrr" class="error" style="display:none;">Please enter description</label>
                  </div>
                </div> 

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">Meta Keywords<font color="red">*</font>:</label>
                  <div class="col-sm-10">
                   <textarea id="lmeta_key" class="form-control col-sm-7" name="lmeta_key" placeholder="Key Words"  rows="7" cols="83" style=" border: 1px solid #ccc;"><?=get_symbol($res_edit[0]["lmeta_key"])?></textarea>
					<label for="econtent" id="mcontenterrr" class="error" style="display:none;">Please enter description</label>
                  </div>
                </div> 

              <div class="form-group">  
              <label for="inputEmail3" class="col-sm-2 control-label"></label> 
			  <input type="hidden" value="" id="hdnvalue" name="hdnvalue">
			<?php if($_REQUEST['action']=="add" ) {  ?>			  
                <button type="submit" id="add" name="add" class="btn btn-success"><i class="fa fa-plus-square"></i>&nbsp;&nbsp;Create</button>
				<?php } else { ?>
				 <button type="submit" id="edit" name="edit" class="btn btn-success"><i class="fa fa-save"></i>&nbsp;&nbsp;Update</button>
				 <?php } ?>
				<button type="submit" class="btn btn-default" onclick='return homepage("<?=$pagename?>")'>Cancel</button>
             
              </form>
          </div>
			<? }  else if($_REQUEST['action']=="view"){ 
			 $where="where lid ='".$sid."'";
			 $res_view=$sql->select_query($table,$where);	
			?>
			    <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title"><?=$pagetitle?> - View</h3>
            </div>

			<form name="form" id="pageform" class="form-horizontal pageform" enctype="multipart/form-data" method="post" action="">
				   

                 <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">Site Title</label>
                  <div class="col-xs-10 viewtext"><?=get_symbol($res_view[0]["lsite_title"])?></div>  
                 </div>

                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">Address</label>
                  <div class="col-xs-10 viewtext"><?=get_symbol($res_view[0]["laddress"])?></div>  
				</div>

				<div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">Booking Email</label>
                  <div class="col-xs-10 viewtext"><a href="mailto:<?=get_symbol($res_view[0]["lbook_mail"])?>"><?=get_symbol($res_view[0]["lbook_mail"])?></a></div>  
				</div>

				<div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">Contact Email</label>
                  <div class="col-xs-10 viewtext"><a href="mailto:<?=get_symbol($res_view[0]["lcontact_mail"])?>"><?=get_symbol($res_view[0]["lcontact_mail"])?></a></div>  
				</div>

				<div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">Meta Description</label>
                  <div class="col-xs-10 viewtext"><?=get_symbol($res_view[0]["lmeta"])?></div>  
				</div>

				<div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">Meta Keywords</label>
                  <div class="col-xs-10 viewtext"><?=get_symbol($res_view[0]["lmeta_key"])?></div>  
				</div>

			  <div class="form-group"> 
			  	<label for="inputEmail3" class="col-sm-2 control-label"></label>
				<button type="submit" class="btn btn-default" onclick='return homepage("<?=$pagename?>")'><i class="fa  fa-backward"></i>&nbsp;&nbsp;Back</button>            
              </div>

             
			  </form>
			   </div>
			<? } else { ?>
			
			 <div class="box">
            <div class="box-header">
        <h3 class="box-title"><?=$pagetitle?></h3>

	<!--	<a href="<?=$pagename?>?action=add"><button type="submit" class="btn btn-success pull-right"><i class="fa fa-plus-square"></i>&nbsp;&nbsp;Add Link</button></a> -->
	  	</br/>
            </div>

            <div class="box-body">
			
              <table id="datatables" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>S.No</th>                  
                  <th>Site Title</th>	
                  <th>Address</th>
            </tr>
                </thead>
                <tbody>
				<?							
					$where="order by lid asc";
					$res=$sql->select_query($table,$where);	
					$cnt=count($res);
					if($cnt!='' || ($cnt!=0))			
					{ $a=1;				
					foreach($res as $res){						
						$emid=$res['lid'];						
					?>
                <tr>
				 <td align="center"><?=$a?></td>      
		
                 <td align="center"><?=get_symbol($res['lsite_title'])?></td>	

                 <td align="center"><? if(strlen($res['laddress']) > 40){ echo strip_tags(substr(get_symbol($res['laddress']),0,40)."...");}else{echo strip_tags(get_symbol($res['laddress']));}?></td>	

				  <td align="center"><a class="btn" href="<?=$pagename?>?action=view&mid=<?=$emid?>"><i class="fa fa-share"></i> View</a>				  
				  <a class="btn" href="<?=$pagename?>?action=edit&mid=<?=$emid?>"><i class="fa fa-eyedropper"></i> Edit</a>
			<!--	  <a class="btn" href="<?=$pagename?>?action=delete&mid=<?=$emid?>"><i class="fa fa-trash-o"></i> Delete</a> -->
                  
				  </td>
                </tr><? $a++; } } ?>
                </tfoot>
              </table>
            </div>
          </div>
			<? } ?>
		</div>
      </div>
    </section>
  </div>
  
<? include_once('footer.php');?>
<script type="text/javascript">
$(function () {
	//Data Table
    $("#datatables").DataTable(); 
   
   //form  
	$("#pageform").validate({
		rules: {			
			lsite_title:  {
            required: true,
            },
            lform_mail:  {
            required: true,
            email: true,
			},
			lcontact_mail:  {
            required: true,
            email: true,
			},
			laddress: {
				required: true,
			}   	  		 			
		},
		messages: {	
			lsite_title: {
				required: "Please enter sitetitle",
            },
            lform_mail:{
                required: "Please enter valid email",
            },
            lcontact_mail:{
                required: "Please enter valid email",
            },
            laddress: {
            	required: "Please enter address",
            }
		},			
		submitHandler: function() {		
		
			$('#mfileerr').hide();
			document.form.submit();
		}
		
	});
});

function homepage(){
window.location.href ="<?=$pagename?>";
return false;
}

</script>

