<? 
include_once('../lib/config.php'); 
$pagename="dashboard.php";
$pagetitle="Dashboard";
if($_SESSION['id']=="")
{
header('Location:index.php');exit();
}
?>

<!DOCTYPE html>
<html>
<head>
	<title>Admin Dashboard | <?=$pagetitle?></title>
	<? include_once('header.php');?>
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper"><? include_once('menu.php');?>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>Dashboard</h1>
      <ol class="breadcrumb">
        <li><a href="dashboard.php"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active"><?=$pagetitle?></li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <h4 class="msg_style">Welcome to Admin Panel....Adminae...!<br/>

                               Handle With Care..!</h4>

      
    </section>
    <!-- /.content -->
  </div>

 <? 
  include_once('footer.php');
  ?>
</html>