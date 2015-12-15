#!/bin/sh

cd src/server/images/temp

echo "Downloading images... This might take a while"

wget http://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73934/gebco_08_rev_elev_C1_grey_geo.tif -O topo_C1.tif
wget http://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74167/world.200410.3x21600x21600.C1.png -O texture_C1.png

echo "All done!"
