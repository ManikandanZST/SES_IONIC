<?  
$currentFile = $_SERVER["SCRIPT_NAME"]; 
$parts = Explode('/', $currentFile);
$currentFile = $parts[count($parts) - 1];
if($currentFile=="dashboard.php"){ $dashboard ='active'; } else{$dashboard='';}
if($currentFile=="banner.php"){ $banner ='class="active"'; } else{$banner='';}
if($currentFile=="gallery.php"){ $gallery ='class="active"'; } else{$gallery='';}
if($currentFile=="content.php"){ $content ='class="active"'; } else{$content='';}
if($currentFile=="setting.php"){ $setting ='class="active"'; } else{$setting='';}
if(($currentFile=="contact_form.php")|| ($currentFile=="book_form.php")){ $form ='active'; } else{$form='';}
if($currentFile=="book_form.php"){ $book_form ='class="active"'; } else{$book_form='';}
if($currentFile=="contact_form.php"){ $contact_form ='class="active"'; } else{$contact_form='';}

?>


<header class="main-header">
    <a href="index.php" class="logo"><img src="<?=OUR_LOGO?>" width="132px" height="61px" alt="Logo"/></a>
    <nav class="navbar navbar-static-top">
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button"></a> 
	<ul class="nav navbar-nav mpadding pull-right">
	<li><a href="change_password.php"><i class="fa fa-unlock-alt"></i>&nbsp;&nbsp;Change Password</a></li>
	<li><a href="logout.php"><i class="fa fa-power-off"></i>&nbsp;&nbsp;Logout</a></li></ul>	  
    </nav>
  </header>
  <aside class="main-sidebar">
    <section class="sidebar">
      <ul class="sidebar-menu" data-widget="tree">
        <li class="<?=$dashboard?>">
          <a href="dashboard.php">
            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
            <span class="pull-right-container">
            </span>
          </a>
       </li>

        <li <?=$banner?>>
          <a href="banner.php">
            <i class="fa fa-files-o"></i>
            <span>Banner Management</span>
            <span class="pull-right-container">
            </span>
          </a>         
        </li> 

        <li class="treeview <?=$content?>">        
           <a href="#">
            <i class="fa fa-rss-square"></i> <span>Content Management</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a> 
          <ul class="treeview-menu">
          <li <?=$book_form?>><a href="content.php"><i class="fa  fa-tags"></i>Latest News</a></li>
            <li <?=$book_form?>><a href="book_form.php"><i class="fa  fa-rss"></i>Latest Post</a></li>
            <li <?=$contact_form?>><a href="contact_form.php"><i class="fa fa-tags"></i>Forum</a></li>
          </ul>   
        </li>

        <li <?=$gallery?>>
          <a href="gallery.php">
            <i class="fa fa-caret-square-o-right"></i>
            <span>Gallery Management</span>
            <span class="pull-right-container">
            </span>
          </a>         
        </li>

        <li <?=$gallery?>>
          <a href="gallery.php">
            <i class="fa fa-caret-square-o-right"></i>
            <span>Gallery Management</span>
            <span class="pull-right-container">
            </span>
          </a>         
        </li>

        <li <?=$setting?>>
          <a href="setting.php">
            <i class="fa fa-cog"></i>
            <span>Site Settings Management</span>
            <span class="pull-right-container">
            </span></a>         
        </li> 

    </ul>
    </section>
  </aside>