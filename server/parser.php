<?php
$cat = $_GET['category']  or die('Category is not specified');
$pageurl = "http://www.lobbes.nl/zoek/$cat/all";

$displayhtml = isset($_GET['displayhtml']);

$page = file_get_contents($pageurl) or die('Page is not reachable');

$doc = new DOMDocument();
$doc->loadHTML($page) or die('Page cannot be parsed');

$doc = new DOMXPath($doc);
$itemdivs = $doc->query("//div[@class='items_holder']/div");

$products = array();

foreach($itemdivs as $div) {
	$names = $doc->query("div[@class='portlet-content']/span[@class='itemnaam']/a", $div);
	if($names->length < 1)
		continue;
	$name = $names->item(0)->nodeValue;
	$producturl = '//www.lobbes.nl/'.$names->item(0)->getAttribute('href');

	$imgs = $doc->query("div[@class='portlet-content']/a/img", $div);
	if($imgs->length < 1)
		continue;
	$imgurl = $imgs->item(0)->getAttribute('src');

	if($displayhtml)
		echo "<a href='$producturl'>$name<br /><img src='$imgurl' /></a><br />";
	else
		array_push($products, array('name'=>$name, 'producturl'=>$producturl, 'imgurl'=>$imgurl));
}

if(!$displayhtml)
	echo json_encode($products);
?>
