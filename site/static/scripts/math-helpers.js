/**
 * Converts a value from degrees to radians.
 *
 * @param {number} value in degrees
 * @return {number} same value converted to radians
 */
export function ToRadians(degrees) {
    return degrees * Math.PI / 180;
}

/**
 * Computes the distance between two locations on a sphere using the
 * harvesine formula.
 *
 * https://en.wikipedia.org/wiki/Haversine_formula
 *
 * @param {number} latitude of the first location
 * @param {number} longitude of the first location
 * @param {number} latitude of the second location
 * @param {number} longitude of the second location
 * @return {number} distance between the locations
 */
export function GetGreatCircleDistance(lat1, lon1, lat2, lon2) {
    const φ1 = ToRadians(lat1);
    const φ2 = ToRadians(lat2);

    const Δφ = ToRadians(lat2 - lat1);
    const Δλ = ToRadians(lon2 - lon1);

    // Harvesine
    const h = Math.pow(Math.sin(Δφ / 2), 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.pow(Math.sin(Δλ/2), 2);

    // Solve for distance
    const d = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));

    return d
}
