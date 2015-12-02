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
$id = 0;

foreach($itemdivs as $div) {
	$name = $doc->query("span[@class='itemnaam']/a", $div)->item(0);

	$title = $name->nodeValue;
	$producturl = '//www.lobbes.nl/'.$name->getAttribute('href');
	$imgurl = $doc->query("a/img", $div)->item(0)->getAttribute('src');
	$available = $doc->query("div/form", $div)->length > 0;
	$dimensions = $doc->query("div[@class='afmeting']/div[@class='opt_afmetingen']", $div)->item(0)->nodeValue;
	
	$price = $doc->query("div[@class='prijs']", $div)->item(0)->nodeValue;
	if($price == null)
		$price = $doc->query("div[@class='actie_prijs']", $div)->item(0)->childNodes->item(1)->nodeValue;

	$id++;
	
	$product_object = array('id'=> $id, 'product'=>array('id'=> $id,'title'=>$title, 'available'=>$available, 'dimensions'=>$dimensions, 'price'=>$price, 'url'=>$producturl, 'imageUrl'=>$imgurl));
	$product_html = "<a href='$producturl'>Title: $title<br />Price: €$price<br />Dimensions: $dimensions<br />Available: ".($available?'true':'false')."<br /><img src='$imgurl' /></a><br /><hr />";

	if($displayhtml)
		echo $product_html;
	else
		array_push($products, $product_object);
}

$output = array('searchResults'=>$products);

if(!$displayhtml)
	echo json_encode($output);
?>
