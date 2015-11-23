<?php
$query = rawurlencode($_GET['q'])  or die('Query is not specified');
$pageurl = "http://www.lobbes.nl/zoek/$query/all";

$displayhtml = isset($_GET['displayhtml']);

$page = file_get_contents($pageurl) or die('Page is not reachable');

$doc = new DOMDocument();
$doc->loadHTML($page) or die('Page cannot be parsed');

$doc = new DOMXPath($doc);
$itemdivs = $doc->query("//div[@class='items_holder']/div/div[@class='portlet-content']");

$products = array();

foreach($itemdivs as $div) {
	$name = $doc->query("span[@class='itemnaam']/a", $div)->item(0);

	$title = $name->nodeValue;
	$producturl = '//www.lobbes.nl/'.$name->getAttribute('href');
	$price = $doc->query("div[@class='prijs']", $div)->item(0)->nodeValue;
	$imgurl = $doc->query("a/img", $div)->item(0)->getAttribute('src');
	$available = $doc->query("div/form", $div)->length > 0;
	$dimensions = $doc->query("div[@class='afmeting']/span[@class='opt_afmeting']", $div)->item(0)->nodeValue;

	if($displayhtml)
		echo 	"<a href='$producturl'>Title: $title<br />Price: €$price<br />Dimensions: $dimensions<br />Available: ".($available?'true':'false').
			"<br /><img src='$imgurl' /></a><br /><hr />";
	else
		array_push($products, array('title'=>$title, 'available'=>$available, 'dimensions'=>$dimensions, 'price'=>$price, 'url'=>$producturl, 'image'=>$imgurl));
}

if(!$displayhtml)
	echo json_encode($products);
?>
