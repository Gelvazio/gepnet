<?php
/* CAT:Mathematical */

/* pChart library inclusions */
include("../class/pData.class.php");
include("../class/pDraw.class.php");
include("../class/pImage.class.php");

/* Create and populate the pData object */
$MyData = new pData();
for ($i = 0; $i <= 20; $i++) {
    $MyData->addPoints(rand(10, 30) + $i, "Probe 1");
}
$MyData->setAxisName(0, "Temperatures");
$MyData->setAbscissaName("Samples");

/* Create the pChart object */
$myPicture = new pImage(700, 230, $MyData);

/* Turn of Antialiasing */
$myPicture->Antialias = false;

/* Add a border to the picture */
$myPicture->drawRectangle(0, 0, 699, 229, array("R" => 0, "G" => 0, "B" => 0));

/* Write the chart title */
$myPicture->setFontProperties(array("FontName" => "../fonts/Forgotte.ttf", "FontSize" => 11));
$myPicture->drawText(150, 35, "Average temperature", array("FontSize" => 20, "Align" => TEXT_ALIGN_BOTTOMMIDDLE));

/* Set the default font */
$myPicture->setFontProperties(array("FontName" => "../fonts/pf_arma_five.ttf", "FontSize" => 6));

/* Define the chart area */
$myPicture->setGraphArea(60, 40, 680, 200);

/* Draw the scale */
$scaleSettings = array(
    "XMargin" => 10,
    "YMargin" => 10,
    "Floating" => true,
    "GridR" => 200,
    "GridG" => 200,
    "GridB" => 200,
    "DrawSubTicks" => true,
    "CycleBackground" => true
);
$myPicture->drawScale($scaleSettings);

/* Turn on Antialiasing */
$myPicture->Antialias = true;

/* Turn on shadows */
$myPicture->setShadow(true, array("X" => 1, "Y" => 1, "R" => 0, "G" => 0, "B" => 0, "Alpha" => 10));

/* Draw the line chart */
$myPicture->drawPlotChart();

/* Draw the standard mean and the geometric one */
$Mean = $MyData->getSerieAverage("Probe 1");
$GeometricMean = $MyData->getGeometricMean("Probe 1");
$myPicture->drawThreshold($GeometricMean, array("WriteCaption" => true, "Caption" => "Geometric mean"));
$myPicture->drawThreshold($Mean,
    array("WriteCaption" => true, "Caption" => "Mean", "CaptionAlign" => CAPTION_RIGHT_BOTTOM));

/* Write the computed values */
$myPicture->drawText(550, 20, "Arithmetic average : " . round($Mean, 2));
$myPicture->drawText(550, 30, "Geometric Mean : " . round($GeometricMean, 2));

/* Render the picture (choose the best way) */
$myPicture->autoOutput("pictures/example.geometricMean.png");
?>