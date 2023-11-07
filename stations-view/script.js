mapboxgl.accessToken = "MAPBOX_TOKEN_HERE";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [103.8198, 1.3521],
  zoom: 11,
});

const loadStations = async () => {
  const response = await fetch("stations.json");
  const stations = await response.json();

  return stations;
};

const addMarkers = async () => {
  const stations = await loadStations();
  stations.forEach((station) => {
    new mapboxgl.Marker()
      .setLngLat([station.location.longitude, station.location.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${station.name}</h3><p>${station.id}</p>`
        )
      )
      .addTo(map);
  });
};
addMarkers();
