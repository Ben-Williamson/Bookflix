import React, { useState } from "react";
import "./MapPage.css";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function MapPage() {
  const [points, setPoints] = useState([]);
  const [zoom, setZoom] = useState(5);

  return (
    <div id="mapPage">
      <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" // dark mode: https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png
        />
        <Polyline positions={points} color={"#4361ee88"} />
      </MapContainer>

      <div id="details">
        <h1>Last Night's Run</h1>

        <h3>Harry ran 13km towards London!</h3>

        <div className="progressOuter">
          <div className="progressInner"></div>
        </div>

        <button
          onClick={function () {
            fetch(
              "https://routing.openstreetmap.de/routed-bike/route/v1/driving/-0.1276474,51.5073219;37.6173,55.7558?overview=full&geometries=geojson"
            )
              .then((data) => data.json())
              .then((result) => {
                console.log(result);
                var route = result.routes[0].geometry.coordinates;

                route.forEach((element) => {
                  element.reverse();
                });

                setPoints(route);
              });
          }}
        >
          Load path
        </button>

        this should be scaled to hamster step length
      </div>
    </div>
  );
}

export default MapPage;

{
  /* <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={13}>
  <TileLayer
    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" // dark mode: https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png
  />
  <Polyline
    positions={[
      [51.5, -0.09],
      [37.781719, -122.404637],
    ]}
    color={"red"}
  />
</MapContainer>; */
}

// .leaflet-container {
//   width: 100%;
//   height: 100vh;
// }
