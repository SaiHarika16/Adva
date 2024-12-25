// Fun facts about oceans
const facts = {
    pacific: "The Pacific Ocean is the largest and deepest ocean on Earth!",
    atlantic: "The Atlantic Ocean covers about 20% of the Earth's surface!",
    indian: "The Indian Ocean is the warmest ocean in the world.",
    southern: "The Southern Ocean surrounds Antarctica and is the coldest ocean.",
    arctic: "The Arctic Ocean is the smallest and shallowest of the world's oceans."
  };
  
  // Function to update the fact box with the clicked ocean's fun fact
  function showFact(oceanId) {
    const factBox = document.getElementById("factBox");
    factBox.textContent = facts[oceanId] || "No fact available for this ocean.";
  }
  
  // Add event listeners to each ocean region
  document.getElementById("pacific").addEventListener("click", function() {
    showFact("pacific");
  });
  
  document.getElementById("atlantic").addEventListener("click", function() {
    showFact("atlantic");
  });
  
  document.getElementById("indian").addEventListener("click", function() {
    showFact("indian");
  });
  
  document.getElementById("southern").addEventListener("click", function() {
    showFact("southern");
  });
  
  document.getElementById("arctic").addEventListener("click", function() {
    showFact("arctic");
  });
  