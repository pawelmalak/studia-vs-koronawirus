const fetch = require('node-fetch');

const getUserDetails = async (ipAddress, theme) => {

  const request = await fetch(`http://ip-api.com/json/${ipAddress}`);
  const response = await request.json();

  const visit = {
    visit_ip: ipAddress,
    visit_isp: response.isp,
    visit_isp_name: response.org,
    visit_location_x: response.lat,
    visit_location_y: response.lon,
    visit_location_name: response.city,
    visit_location_country: response.country,
    visit_theme: parseInt(theme)
  };

  return visit;

}

module.exports = getUserDetails;