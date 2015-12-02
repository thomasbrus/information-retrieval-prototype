<?php
function getParser($url) {
	$page = file_get_contents($url) or die("Page $url is not reachable");

	$doc = new DOMDocument();
	$doc->loadHTML($page) or die('Page cannot be parsed');

	return new DOMXPath($doc);
}

$pageurl = $_GET['url']  or die('URL is not specified');

$displayhtml = isset($_GET['displayhtml']);

$docs = array();
while(true) {
	$doc = getParser($pageurl);
	array_push($docs, $doc);

	$next_link = $doc->query("//link[@rel='next']");
	if($next_link->length == 0)
		break;

	$pageurl = $next_link->item(0)->getAttribute('href');
	// Fix for incorrect <link rel> on www.lobbes.nl/nieuwe-artikelen/speelgoed
	$pageurl = substr($pageurl, strrpos($pageurl, 'http://'));
}

$products = array();

foreach($docs as $doc){
	$itemdivs = $doc->query("//div[@class='items_holder']/div/div[@class='portlet-content']");

	foreach($itemdivs as $div) {
		$name = $doc->query("span[@class='itemnaam']/a", $div)->item(0);

		$title = $name->nodeValue;
		$producturl = 'http://www.lobbes.nl/'.$name->getAttribute('href');
		$price = $doc->query("div[@class='prijs']", $div)->item(0)->nodeValue;
		$imgurl = $doc->query("a/img", $div)->item(0)->getAttribute('src');
		$available = $doc->query("div/form", $div)->length > 0;
		$dimensions = $doc->query("div[@class='afmeting']/span[@class='opt_afmeting']", $div)->item(0)->nodeValue;

		$product_doc = getParser($producturl);

		$description_lines = $product_doc->query("//span[@itemprop='description']")->item(0)->childNodes;
		$description = '';
		for($i=0; $i<$description_lines->length-1; $i++)
			$description .= $description_lines->item($i)->nodeValue;

		$category_lines = $product_doc->query("//div[@class='categorieen']/ul")->item(0)->childNodes;
		$categories = array();
		foreach($category_lines as $line)
			array_push($categories,$line->nodeValue);

		if($displayhtml)
			echo 	"<a href='$producturl'>Title: $title<br />Price: €$price<br />Dimensions: $dimensions<br />Available: ".($available?'true':'false').
				"<br /><img src='$imgurl' /></a><br />Categories:<br/>".implode('<br />', $categories)."<br />Description:<br />$description<br /><hr />";
		else
			array_push($products, array('title'=>$title, 'categories'=>$categories, 'description'=>$description, 'available'=>$available, 
				'dimensions'=>$dimensions, 'price'=>$price, 'url'=>$producturl, 'image'=>$imgurl));
	}
}

if(!$displayhtml)
	echo json_encode($products);
?>
