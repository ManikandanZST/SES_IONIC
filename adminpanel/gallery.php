<? 
include_once('../lib/config.php'); 
$pagename="gallery.php";
$pagetitle="Gallery";
if($_SESSION['id']=="") 
{
header('Location:index.php');exit();
}
$table="lagallery";

if(!empty($_FILES['limage']['name'])) 
{
	$image = $_FILES['limage']['name'];
	$source = $_FILES['limage']['tmp_name'];
	$image = time().$image;
	$originalpath = "../webupload/original/gallery/".$image;
	$thumbnailpath = "../webupload/thumb/gallery/".$image;
	move_uploaded_file($source,$originalpath);

		if($width<330||$height<330)
	{
		$parts=explode(".",$image);
		$profile_image=$parts[0].".png";
		include_once('imgresize.php');
		resize($originalpath, $thumbnailpath, 330, 330);

	}
	else
	{
		include('resize.php');
		$objimg = new SimpleImage();
		$objimg -> load($originalpath);
		$objimg -> resize(330, 330);
		$objimg -> save($thumbnailpath);
	}
	
}
else
{
	$image=$_REQUEST['theValue'];
}

$field=array();	
$field['limage']=$image;
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
              <div class="box-body">	
								
              	<div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">Image<font color="red">*</font>:</label>
                  <div class="col-sm-10">
                  <input type="file" id="limage" name="limage" onChange="return vaildateimage();">
				  <input type="hidden" value="<?=$res_edit[0]['limage']?>" id="theValue" name="theValue">				  
					 <label for="limage" id="mfileerr" class="error" style="display:none;">Please upload image</label>
					<br/><font color="#090"><b>Allowed JPG/PNG Image with size 330x330 pixels.</b></font>
                 <? if($res_edit[0]['limage']!=''){ ?>    
                             <br/> <img src="image.php?width=100&amp;height=50&amp;cropratio=1.0:1.0&amp;image=<?=$sitepath?>webupload/thumb/gallery/<?=$res_edit[0]['limage']; ?>" border="0" class="imgborder"  style="vertical-align:top" alt="gallery"  />
				 <? } ?>
                  </div>
                </div>
      
              <div class="box-footer"> 
			  <input type="hidden" value="" id="hdnvalue" name="hdnvalue">
			<?php if($_REQUEST['action']=="add" ) {  ?>			  
                <button type="submit" id="add" name="add" class="btn btn-success"><i class="fa fa-plus-square"></i>&nbsp;&nbsp;Create</button>
				<?php } 
				else { ?>
				 <button type="submit" id="edit" name="edit" class="btn btn-success"><i class="fa fa-save"></i>&nbsp;&nbsp;Update</button>
				 <?php } ?>
				<button type="submit" class="btn btn-default" onclick='return homepage("<?=$pagename?>")'>Cancel</button>
              </div>
          </form>

          </div>
			<?}  else if($_REQUEST['action']=="view"){ 
			 $where="where lid ='".$sid."'";
			 $res_view=$sql->select_query($table,$where);	
			?>
			 <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title"><?=$pagetitle?> - View</h3>
            </div>
     
			<form name="form" id="pageform" class="form-horizontal pageform" enctype="multipart/form-data" method="post" action="">
			 <div class="box-body">  

				<div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">Image :</label>
                  <div class="col-xs-10 viewtext"> <img src="<?=$sitepath?>webupload/thumb/gallery/<?=$res_view[0]['limage']; ?>" border="0" class="imgborder"  style="vertical-align:top" alt="gallery"  /></div></div>

               <div class="form-group"> 
              	<label for="inputEmail3" class="col-sm-2 control-label"></label>
				<button type="submit" class="btn btn-default" onclick='return homepage("<?=$pagename?>")'><i class="fa  fa-backward"></i>&nbsp;&nbsp;Back</button>
              </div>

              </div>
		 

			  </form>
			  </div>
			<? } else { ?>
			
			 <div class="box">
            <div class="box-header">
              <h3 class="box-title"><?=$pagetitle?></h3>

			   <a href="<?=$pagename?>?action=add"><button type="submit" class="btn btn-success pull-right"><i class="fa fa-plus-square"></i>&nbsp;&nbsp;Add Image</button></a> 

	  </br/>

            </div>
    
               <div class="box-body">
			
              <table id="datatables" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>S.No</th>  
				  <th>Image</th>				  
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
					<?	
			        $where=" order by lid " ;
					$res=$sql->select_query($table,$where);	
					$cnt=count($res);
					if($cnt!='' || ($cnt!=0))			
					{ $a=1;				
					foreach($res as $res){						
						$emid=$res['lid'];							
					?>			
                <tr>
				
				  <td align="center"><?=$a?></td>     
				  	<td align="center"> 
					<img src="image.php?width=200&amp;height=70&amp;cropratio=2.0:0.7&amp;image=<?=$sitepath?>webupload/thumb/gallery/<?=$res['limage']; ?>" border="0"  />
				  </td>
				  
				  <td align="center"><a class="btn" href="<?=$pagename?>?action=view&mid=<?=$emid?>"><i class="fa fa-share"></i> View</a>				  
				  <a class="btn" href="<?=$pagename?>?action=edit&mid=<?=$emid?>"><i class="fa fa-pencil"></i> Edit</a>

				  <a class="btn" href="<?=$pagename?>?action=delete&mid=<?=$emid?>" onClick="return confirmDelete();"><i class="fa fa-trash-o"></i> Delete</a> 
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
    $("#datatables").DataTable(); 
   
	$("#pageform").validate({
			
		submitHandler: function() {		
			var content = $('#theValue').val();	
			var ext = $('#theValue').val().split('.').pop().toLowerCase();
			var file_ext=0;
			
			file_ext = $.inArray(ext, ['PNG','png','jpg','jpeg','JPG','JPEG']);
			
		if(content ==""){
			$('#mfileerr').show();
		}else if(file_ext == -1) {			
			$('#mfileerr').text("Please upload valid file");
			$('#mfileerr').show();
		}else{
			$('#mfileerr').hide();
			document.form.submit();
		}
		}
	});
});

function homepage(){
window.location.href ="<?=$pagename?>";
return false;
}
function vaildateimage()
{	
$('#theValue').val($('#limage').val());
return true;
}
function confirmDelete(){
	
		answer = confirm("Do you want to delete this item?")

		if (answer ==0) 
		{ 
			return false;
		} 	
}
</script>