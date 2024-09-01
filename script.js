document.addEventListener("DOMContentLoaded", function () {

  showIFrame('stack-code',"stack-C++", "stack-button-C++");
  showIFrame('selection-code',"selection-C++", "selection-button-C++");
  showIFrame('insertion-code',"insertion-C++", "insertion-button-C++");
  showIFrame('merge-code',"merge-C++", "merge-button-C++");
  showIFrame('bubble-code',"bubble-C++", "bubble-button-C++");

  const logoDiv = document.querySelector(".logo");
  const originalText = "Algo Visualizer";
  const characters = originalText.split("");

  function scrambleText() {
    const scrambled = characters
      .map((c) => c)
      .sort(() => Math.random() - 0.5)
      .join("");
    logoDiv.textContent = scrambled;
  }

  function unscrambleText() {
    logoDiv.classList.add("scrambled"); // Add scrambling effect styles
    const totalCharacters = characters.length;
    const timePerLetter = 1000 / totalCharacters; // Time to show each letter

    let index = 0;
    const intervalId = setInterval(() => {
      if (index < totalCharacters) {
        const currentScrambledText = logoDiv.textContent;
        const newText =
          originalText.slice(0, index + 1) +
          currentScrambledText.slice(index + 1);
        logoDiv.textContent = newText;
        index++;
      } else {
        clearInterval(intervalId);
        setTimeout(() => {
          logoDiv.classList.remove("scrambled"); // Remove scrambling effect styles
          logoDiv.classList.add("blink"); // Add blink effect
          setTimeout(() => {
            logoDiv.classList.remove("blink"); // Remove blink effect after 500ms
          }, 100); // Blink duration
        }, 200); // Delay before ending effect
      }
    }, timePerLetter);
  }

  scrambleText(); // Start with scrambled text
  setTimeout(() => {
    unscrambleText();
  }, 150); // Delay before starting unscramble animation

  const hamburger = document.querySelector(".hamburger");
  const hamburger_menu = document.querySelector(".hamburger-menu");
  const menuItems = document.querySelectorAll(".hamburger-menu ul li");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
    hamburger_menu.classList.toggle("is-active");
  });
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const subUl = document.querySelector(".sub-ul");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const targetId = item.id;
      const targetElement = document.querySelector(`.${targetId}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });

        hamburger.classList.remove("is-active");
        hamburger_menu.classList.remove("is-active");
        subUl.style.display = "none";
      }
    });
  });
  dropdownMenu.addEventListener("click", function () {
    // Toggle the display of the sub-ul
    if (subUl.style.display === "none" || subUl.style.display === "") {
      subUl.style.display = "block";
    } else {
      subUl.style.display = "none";
    }
  });
});

// code-examples buttons
function showIFrame(algo, iframeId, buttonId) {
  // Hide all iframes
  const algoContainer = document.querySelector(`.${algo}`);
  const iframes = algoContainer.querySelectorAll("iframe");
  iframes.forEach((iframe) => (iframe.style.display = "none"));

  // Show the selected iframe
  const selectedIframe = algoContainer.querySelector(`#${CSS.escape(iframeId)}`);
  selectedIframe.style.display = "block";
  if (selectedIframe) {
  }

  // Remove the 'selected' class from all buttons
  const buttons = algoContainer.querySelectorAll(".lang-buttons button");
  buttons.forEach((btn) => btn.classList.remove("selected"));

  // Add the 'selected' class to the clicked button
  const selectedButton = algoContainer.querySelector(`#${CSS.escape(buttonId)}`);
  if (selectedButton) {
    selectedButton.classList.add("selected");
  }
}


