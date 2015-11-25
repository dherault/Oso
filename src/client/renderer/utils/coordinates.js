/*
syteme de coordonnées sphériques
https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Spherical_Coordinates_%28Latitude%2C_Longitude%29.svg/220px-Spherical_Coordinates_%28Latitude%2C_Longitude%29.svg.png
(rayon-longitude-latitude)
*/

const { sqrt, cos, sin, atan, asin } = Math;

export const xyzToRll = (x, y, z) => {
  const r = sqrt(x*x + y*y + z*z);
  return [r, atan(x/y), asin(z/r)];
};

export const rllToxyz = (r, lo, la) => {
  const cosla = cos(la);
  return [r * cos(lo) * cosla, r * sin(lo) * cosla, r * sin(la)];
};
