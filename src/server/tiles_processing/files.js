export default [
  {
    sizeMB: 26,
    format: 'tif',
    type:'topo',
    quadrant: 'C1',
    name: 'topo_C1.tif',
    url: 'http://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73934/gebco_08_rev_elev_C1_grey_geo.tif',
  },
  {
    sizeMB: 421, // !
    format: 'png',
    type:'texture',
    quadrant: 'C1',
    name: 'texture_C1.png',
    url: 'http://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74167/world.200410.3x21600x21600.C1.png',
  },
];

export const quadrants = {
  C1: {
    upperLeftLon: 0,
    upperLeftLat: 90,
  }
};
export const quadrantSize = 90;
