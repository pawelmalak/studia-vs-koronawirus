const fetch = require('node-fetch');
const parser = require('ua-parser-js');

const getUserDetails = async (ipAddress, client, device) => {

  const request = await fetch(`http://ip-api.com/json/${ipAddress}`);
  const response = await request.json();
  const ua = parser(device); 

  const visit = {
    visit_ip: ipAddress,
    visit_isp: response.isp,
    visit_isp_name: response.org,
    visit_location_x: response.lat,
    visit_location_y: response.lon,
    visit_location_name: response.city,
    visit_location_country: response.country,
    visit_theme: parseInt(client.theme),
    visit_screen_width: parseInt(client.width),
    visit_screen_height: parseInt(client.height),
    visit_browser_name: ua.browser.name,
    visit_browser_version: ua.browser.version,
    visit_engine_name: ua.engine.name,
    visit_engine_version: ua.engine.version,
    visit_os_name: ua.os.name,
    visit_os_version: parseInt(ua.os.version)
  };

  return visit;

}

module.exports = getUserDetails;