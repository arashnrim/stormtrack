import fs from "fs";

const URL = "https://api.data.gov.sg/v1/environment/rainfall";

const getStations = async () => {
  const response = await fetch(URL);
  const data = await response.json();

  return data.metadata.stations;
};

const writeToStationsJSON = async () => {
  const stations = await getStations();

  fs.writeFile("../stations.json", JSON.stringify(stations), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Stations file has been created. Check root directory.");
  });
};

writeToStationsJSON();
