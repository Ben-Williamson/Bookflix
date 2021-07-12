function loadingScreen(message) {
    document.getElementById("loadingMessage").innerText = message;
    document.getElementById("form").style.display = "none";
    document.getElementById("loading").style.display = "block";
  }

  function showForm() {
    document.getElementById("form").style.display = "block";
    document.getElementById("loading").style.display = "none";
    document.getElementById("success").style.display = "none";
  }

  function successMessage(message) {
    document.getElementById("successMessage").innerText = message;
    document.getElementById("form").style.display = "none";
    document.getElementById("loading").style.display = "none";
    document.getElementById("success").style.display = "block";
  }

  function addToDropdown(name) {
    var x = document.getElementById("ssid");
    var option = document.createElement("option");
    option.text = name;
    x.add(option);
  }

  function showError(message) {
    document.getElementById("errorMessage").innerText = message;
    document.getElementById("errorMessage").style.display = "block";
  }

  loadingScreen("Scanning for networks");
  fetch("/scan")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.ssids);
      data.ssids.forEach((ssid) => {
        addToDropdown(ssid);
      });
      showForm();
    });

  let form = document.getElementById("connect");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    ssid = form.elements["ssid"].value;
    password = form.elements["password"].value;

    loadingScreen("Connecting to " + ssid);

    fetch("/connect?ssid=" + ssid + "&password=" + password);

    var attempts = 0;
    function testConnection() {
      fetch("/connectionStatus")
        .then((response) => response.json())
        .then((data) => {
          if (data.connected == true) {
            clearInterval(test);
            successMessage("Connected to " + ssid);
            console.log("success");

            fetch("/closeServer");
          } else {
            attempts += 1;
          }
        });
      console.log(attempts);

      if (attempts > 10) {
        clearInterval(test);
        showError("Failed to connect.");
        showForm();
      }
    }

    test = setInterval(testConnection, 1000);
  });