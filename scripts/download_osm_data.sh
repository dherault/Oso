#!/bin/sh

[ -z "$1" ] && echo "No argument supplied" && exit 1

wget -O $1/planet-latest.osm.pbf http://ftp5.gwdg.de/pub/misc/openstreetmap/planet.openstreetmap.org/pbf/planet-latest.osm.pbf
