#!/bin/sh

cd src/server/images/temp

echo "Cropping images... This might take a while"

convert texture_C1.png -crop 10800x21600+0+0 texture_C1_1.png
convert texture_C1.png -crop 10800x21600+10800+0 texture_C1_2.png

# rm texture_C1.png

echo "All done!"
