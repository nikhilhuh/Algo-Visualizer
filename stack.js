document.addEventListener("DOMContentLoaded", () => {
  // Variable Declaration
  const push = document.getElementById("push");
  const pop = document.getElementById("pop");
  const reset = document.getElementById("reset");
  const container = document.querySelector(".container");
  const input = document.getElementById("stack-input");
  const topElement = document.getElementById("top");
  const lastPushed = document.getElementById("last-pushed");
  const lastPopped = document.getElementById("last-popped");
  const message = document.getElementById("message")
  const MAXSIZE = 6;
  const stack = [];

  // push function
  function stackPush(e) {
    input.value = "";
    // Check for overflow
    if (stack.length >= MAXSIZE) {
      message.textContent = "Stack Overflow";
      setTimeout(()=>{
        message.textContent = ""
      },3500)
      return;
    } else {
      stack.push(e);
      updateElementHeight()
      const element = document.createElement("div");
      element.className = "elements";
      element.innerHTML = e;
      element.style.animationName = "fallInPlace";
      topElement.textContent = e;
      lastPushed.textContent = e;
      message.textContent = `Item ${e} is pushed into Stack`;
      setTimeout(()=>{
        message.textContent = ""
      },3500)
      container.appendChild(element);
    }
  }

  // pop function
  function stackPop() {
    // Check for underflow
    if (stack.length === 0) {
      message.textContent = "Stack Underflow";
      setTimeout(()=>{
        message.textContent = ""
      },3500)
      return;
    } else {
      let popElement = stack.pop();
      updateElementHeight()
      const lastElement = container.lastChild
      lastPopped.textContent = popElement;
      lastElement.style.animationName = "riseBeforeRemove";
      message.textContent = `Item ${popElement} is popped from Stack`;
      setTimeout(()=>{
        message.textContent = ""
      },4500)
      setTimeout(()=>{
        container.removeChild(container.lastChild);
      },1000)

      if (stack.length === 0) {
        topElement.textContent = "";
      } else {
        topElement.textContent = stack[stack.length - 1];
      }
    }
  }

  // reset function
  function stackReset() {
    // Clear stack and UI
    stack.length = 0;
    container.innerHTML = ""; // Clear all elements from container
    topElement.textContent = "";
    lastPopped.textContent = "";
    lastPushed.textContent = "";
    message.textContent = "Stack is reset";
    setTimeout(()=>{
        message.textContent = ""
      },3500)
  }

  // Event listeners for buttons
  push.addEventListener("click", function () {
    buttonDisable()
    const element = input.value.trim();
    if (element === "") {
      message.textContent = "Enter a value to be pushed";
      setTimeout(()=>{
        message.textContent = ""
      },3500)
    } else {
      stackPush(element);
    }
    buttonEnable()
  });

  pop.addEventListener("click", function () {
    buttonDisable()
    stackPop();
    buttonEnable()
  });

  reset.addEventListener("click", function () {
    buttonDisable()
    stackReset();
    buttonEnable()
  });

  // Disable all buttons
  const buttonDisable = () => {
    push.disabled = true;
    pop.disabled = true;
    reset.disabled = true;
    input.disabled = true;
  };

  // Enable all buttons
  const buttonEnable = () => {
    push.disabled = false;
    pop.disabled = false;
    reset.disabled = false;
    input.disabled = false;
  };

  function updateElementHeight() {
    const root = document.documentElement;
    // Set the height in pixels, appending 'px' to the value
    root.style.setProperty('--elements-height', `${stack.length * 50}px`);    
    
}


});
