// unit system:: time: ms, distance: m
const aDay = 24 * 3600000;
const earthRadius = 6371000;
const distanceScale = 100 / earthRadius;

export default { 
  
  distanceScale,
  timeScale: 0.001,
  
  // Celestial bodies:
  
  sunRadius: 696342000 * distanceScale,
  earthRadius: earthRadius * distanceScale,
  moonRadius: 1737400 * distanceScale,
  
  earthSegments: Math.pow(2, 7),
  
  sunEarthDistance: 149597870000 * distanceScale, // AU (UA in French)
  earthMoonDistance: 384467000 * distanceScale,
  sunEarthDistanceScale: 0.2,
  earthMoonDistanceScale: 0.15,
  
  sunSiderealDay: 27.28 * aDay,// a "sun day" ie rotation period (npi)
  earthSiderealDay: aDay,
  moonSiderealDay: 27.321582 * aDay, 
  
  earthRevolutionPeriod: 365.25696 * aDay,
  moonRevolutionPeriod: 27.321582 * aDay,
};
