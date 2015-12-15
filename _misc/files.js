export const toBeDownloaded = [
  {
    name: 'topo_C1.tif',
    url: 'http://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73934/gebco_08_rev_elev_C1_grey_geo.tif',
  },
  {
    name: 'texture_C1.png',
    url: 'http://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74167/world.200410.3x21600x21600.C1.png',
  },
];

export const toBeProcessed = [
  {
    name: 'topo_C1.tif',
    tilePrefix: 'topo',
    quadrant: {
      upperLeftLon: 0,
      upperLeftLat: 90,
      quadrantWidth: 90,
    },
  },
  {
    name: 'texture_C1_1.png',
    tilePrefix: 'texture',
    quadrant: {
      upperLeftLon: 0,
      upperLeftLat: 90,
      quadrantWidth: 45,
    },
  },
  {
    name: 'texture_C1_2.png',
    tilePrefix: 'texture',
    quadrant: {
      upperLeftLon: 45,
      upperLeftLat: 90,
      quadrantWidth: 45,
    },
  },
];
