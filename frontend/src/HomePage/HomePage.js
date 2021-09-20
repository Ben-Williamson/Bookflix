import { appState } from "../store";
import { useStore } from "react-stores";
import { Line } from "react-chartjs-2";
import "./homePage.css";

function HomePage(props) {
  const state = useStore(appState);

  const days = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  // var width = 0;
  // var height = 0;

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgb(25, 34, 61)");
    gradient.addColorStop(1, "rgba(25, 34, 61, 0.2)");

    return {
      labels: days,
      datasets: [
        {
          label: "Distance Run",
          backgroundColor: gradient,
          cubicInterpolationMode: "monotone",
          fill: true,
          data: [
            25.0, 32.4, 22.2, 39.4, 34.2, 22.0, 23.2, 24.1, 20.0, 18.4, 19.1,
            17.4,
          ],
        },
      ],
    };
  };

  var options = {
    responsive: true,
    datasetStrokeWidth: 3,
    pointDotStrokeWidth: 4,
  };

  return (
    <div id="homePage">




      <h1>Hi, {state.userData.firstname}</h1>


      <div className="left">
        <h2>Latest Activity</h2>
      <div id="statContainer">
        <div className="stat">
                      <h3>Total Distance</h3>
          <h1>24<span className="unit">km</span></h1>

        </div>

        <div className="stat">
          <h3>Max Speed</h3>
          <h1>4<span className="unit">kph</span></h1>
        </div>
        
        <div className="stat">
          <h3>Start Time</h3>
          <h1>2:30<span className="unit">am</span></h1>
        </div>
      </div>

      <br></br>
      <h2>This Year</h2>
      <div id="graph">
      <Line data={data} options={options} />
      </div>
      </div>
      
      <div className="activiesContainer">
        <h2>Past Activity</h2>
        <div className="activity">
          <p>Monday 21st August</p>
          <p className="stat">
            20km
          </p>
        </div>

        <div className="activity">
          <p>Sunday 20st August</p>
          <p className="stat">
            20km
          </p>
        </div>

        <div className="activity">
          <p>Saturday 19st August</p>
          <p className="stat">
            20km
          </p>
        </div>

        <button id="seeMore">See More</button>
      </div>








      {/* <h1 id="welcome">Welcome {state.username}</h1> */}

      {/* <div id="userInfoContainer">
        <div id="userInfo">
          <ion-icon name="person-outline"></ion-icon>
          <h1>
            {state.userDetails.forename + " " + state.userDetails.surname}
          </h1>
          <p>{state.userDetails.email}</p>
          <p>
            Member since{" "}
            {
              days[
                parseInt(
                  state.userDetails.created.split("T")[0].split("-")[1]
                ) - 1
              ]
            }{" "}
            {state.userDetails.created.split("T")[0].split("-")[0]}
          </p>

          <Logout />
        </div>
      </div>

      <div className="grid-container">
        <div className="grid-item">1</div>
        <div className="grid-item">2</div>
        <div className="grid-item">
          <Line data={data} options={options} />
        </div>
        <div className="grid-item">4</div>
        <div className="grid-item">5</div>
        <div className="grid-item">6</div>
        <div className="grid-item">7</div>
        <div className="grid-item">8</div>
      </div> */}
    </div> 
  );
}

export default HomePage;
