document.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const options = {
    docId: urlParams.get("docId"),
    vizId: urlParams.get("vizId"),
    selections: JSON.parse(urlParams.get("selections")),
    width: parseInt(urlParams.get("width")),
    height: parseInt(urlParams.get("height")),
  }

  const container = document.getElementById("container");

  // Do some async work, for example, load an image into the DOM
  const img = document.createElement("img");
  img.src = `https://via.placeholder.com/${options.width}x${options.height}`
  container.appendChild(img);

  img.onload = function () {
    // Handle visualization completed by calling injected function completedVizLoad()
    if (typeof window.completedVizLoad === "function") {
      window.completedVizLoad();
    }
  };
  
  img.onerror = function () {
    // Handle visualization error by calling injected function vizLoadError(message)
    if (typeof window.vizLoadError === "function") {
      window.vizLoadError("Failed due to xyz");
    }
  };
});
