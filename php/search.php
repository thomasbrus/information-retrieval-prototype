<?php
/* Creates a DOMXPath parser for a given URL, if able.
Otherwise, show an error message and stop the application.*/
function getParser($url) {
	$page = file_get_contents($url) or die("Page $url is not reachable");

	$doc = new DOMDocument();
	$doc->loadHTML($page) or die('Page cannot be parsed');

	return new DOMXPath($doc);
}

/* The number of pages that should be retrieved from Lobbes for each request.
Since Lobbes by default displays 40 products per page, this results in 3 * 40 = 120 products.*/
define("PAGE_COUNT", 3);

$query = rawurlencode($_GET['q'])  or die('Query is not specified');
$pageurl = "http://www.lobbes.nl/zoek/$query/speelgoed";

$docs = array();
$i = 0;

/* Try to get PAGE_COUNT parsers for Lobbes product pages, and store them in $docs.
The URL of the next page is determined by the href attribute of the <link rel="next"> tag on the current page.
*/
while($i < PAGE_COUNT) {
	$doc = getParser($pageurl);
	array_push($docs, $doc);

	$next_link = $doc->query("//link[@rel='next']");
	if($next_link->length == 0)
		break;
	else {
		$pageurl = $next_link->item(0)->getAttribute('href');
		// Fix for incorrect <link rel="next" href> format on www.lobbes.nl/nieuwe-artikelen/speelgoed
		$pageurl = substr($pageurl, strrpos($pageurl, 'http://'));
		$i++;
	}
}

$products = array();

/* Use the parsers to retrieve product information such as name, URL and price, and store it in $products. */
foreach($docs as $doc) {
	$itemdivs = $doc->query("//div[@class='items_holder']/div/div[@class='portlet-content']");
	foreach($itemdivs as $div) {
		$name = $doc->query("span[@class='itemnaam']/a", $div)->item(0);

		$title = $name->nodeValue;
		$producturl = '//www.lobbes.nl/'.$name->getAttribute('href');
		$imgurl = $doc->query("a/img", $div)->item(0)->getAttribute('src');
		$available = $doc->query("div/form", $div)->length > 0;
		$dimensions = $doc->query("div[@class='afmeting']/div[@class='opt_afmetingen']", $div)->item(0)->nodeValue;
	
		$price = $doc->query("div[@class='prijs']", $div)->item(0)->nodeValue;
		// Sometimes, the price is stored in a different location
		if($price == null)
			$price = $doc->query("div[@class='actie_prijs']", $div)->item(0)->childNodes->item(1)->nodeValue;
		// Modify $price so that it is stored as a decimal number instead of a string.
		$price = str_replace(',', '.', $price);
		$price = (float) $price;

		// Create a unique identifier for this product, which is required by Ember.
		$id = md5($producturl);
	
		$product_object = array('id'=> $id, 'product'=>array('id'=> $id,'title'=>$title, 'available'=>$available, 'dimensions'=>$dimensions, 'price'=>$price, 'url'=>$producturl, 'imageUrl'=>$imgurl));
		array_push($products, $product_object);
	}
}

$output = array('searchResults'=>$products);

// Enable CORS, so that this page is accessible by applications with other origins
header("Access-Control-Allow-Origin: *");

// Output the product information as JSON
header('Content-Type: application/json');
echo json_encode($output);
?>
