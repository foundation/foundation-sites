<!DOCTYPE html>

<!-- PHP Browser Targeting Code -->

<?
	// Determine the page name
	$page_name = $_SERVER['SCRIPT_FILENAME'];
	// $page_name = $_SERVER['PATH_TRANSLATED'];
	$page_name = strrchr($page_name, '/');
	$page_name = ereg_replace('.php', '', $page_name);
	$page_name = ereg_replace('/', ' ', $page_name);
	$page_name = ereg_replace('_', ' ', $page_name);
/* 	$page_name = ereg_replace('-', ' ', $page_name); */
	$page_name = ereg_replace('\.', ' ', $page_name);
/* 	$page_name = ucwords($page_name); */
	$page_name = ereg_replace(' ', '', $page_name);
/* 	$page_name = strtolower(substr($page_name, 0, 1)) . substr($page_name, 1);; */
	
	// Figure out which browser the user is using
	$user_agent = $_SERVER['HTTP_USER_AGENT'];
	if (preg_match('/Firefox.2/i', $user_agent)){
		$browser = "ff ff2";
	} else if (preg_match('/Firefox.3/i', $user_agent)) {
		$browser = "ff ff3";
	} else if (preg_match('/MSIE.8/i', $user_agent)) {
		$browser = "ie ie8";
	} else if (preg_match('/MSIE.7/i', $user_agent)) {
		$browser = "ie ie7";
	} else if (preg_match('/MSIE.6/i', $user_agent)) {
		$browser = "ie ie6";
	} else if (preg_match('/Chrome/i', $user_agent)) {
		$browser = "chrome";
	} else if (preg_match('/Safari/i', $user_agent)) {
		$browser = "safari";
	} else {
		$browser = "in_unknown";
	}
	
	if(!(isset($page_title))) {
		$page_title = "Foundation";
	}
	if(isset($title)) {
		$page_title = $page_title.": ".$title;
	}
		
?>
<html>
<head>
	<meta charset="utf-8" />
	
	<!-- Uncomment to make IE8 render like IE7 -->
	<!-- <meta http-equiv="X-UA-Compatible" content="IE=7" /> -->
	
	<!-- Set the viewport width to device width for mobile -->
	<meta name="viewport" content="width=device-width" />
	
	<title><?= $page_title ?></title>
  
	<!-- Included CSS Files -->
	<? include_once("_css.php"); ?>
	
	<!-- Included JS Files  -->
	<? include_once("_js.php"); ?>

</head>
<body id="<?= $page_name ?>-page" class="<?=$browser?>">