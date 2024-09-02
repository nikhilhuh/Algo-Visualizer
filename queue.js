document.addEventListener("DOMContentLoaded", () => {
    // Variable Declaration
    const enqueue = document.getElementById("enqueue")
    const dequeue = document.getElementById("dequeue")
    const peek = document.getElementById("peek")
    const isEmpty = document.getElementById("isEmpty")
    const size = document.getElementById("size")
    const message = document.getElementById("queue-result")
    const container = document.querySelector(".queue-frame")
    const MAXSIZE = 6;
    const queue = [];
    let isAnimating = false; // Flag to track animation state
  
    // enqueue function
    function queueEnqueue(e) {
      // Check for overflow
      if (queue.length >= MAXSIZE) {
        message.textContent = "Queue Overflow";
        return;
      } else {
        queue.push(e);
        const element = document.createElement("div");
        element.className = "frame";
        element.innerHTML = e;
        element.style.animationName = "comeInPlace";
        const height = e*20
        element.style.height = `${height}px`
        container.appendChild(element);
        message.textContent = `Enqueued : ${e}`;
      }
    }
  
    // dequeue function
    function queueDequeue() {
        if (queue.length == 0) {
            message.textContent = "Queue Underflow";
            return;
        }

        if (isAnimating) return; // Prevent another dequeue if an animation is running

        const e = queue.shift(); // Dequeue the first element
        const firstElement = container.firstChild; // Get the first element in the container
        firstElement.style.animationName = "outFromPlace"; // Apply the animation to the first element
        message.textContent = `Dequeued: ${e}`;
        isAnimating = true; // Set the flag to indicate an animation is running

        setTimeout(() => {
            container.removeChild(firstElement); // Remove the first element after the animation
            isAnimating = false; // Reset the flag to allow the next dequeue
        }, 1000); // The timeout duration should match the animation duration
    }

    //  peek function
      function queuePeek(){
        if (queue.length == 0) {
            message.textContent = "No Elements in Queue";
            return;
          }
        else {
            message.textContent = `First Element: ${queue[0]}`
        }  
      }

    // isEmpty function
    function queueisEmpty(){
        if(queue.length == 0)
            message.textContent = `isEmpty: True`
        else
            message.textContent = `isEmpty: False`
    }  
    // queue size function
    function queueSize(){
        const size = queue.length
        if(size == 0)
            message.textContent = `Queue is Empty`
        else
            message.textContent = `Size: ${size}`
    }
    // Event listeners for buttons
    enqueue.addEventListener("click", function () {
      buttonDisable()
      const element = Math.floor(Math.random() * 10) + 1; 
      queueEnqueue(element);
      buttonEnable()
    });
  
    dequeue.addEventListener("click", function () {
      buttonDisable()
      queueDequeue();
      buttonEnable()
    });
    peek.addEventListener("click", function () {
        buttonDisable()
        queuePeek();
        buttonEnable()
      });

    isEmpty.addEventListener("click",function(){
        buttonDisable()
        queueisEmpty()
        buttonEnable()
    })
    size.addEventListener("click",function(){
        buttonDisable()
        queueSize()
        buttonEnable()
    })
  
    // Disable all buttons
    const buttonDisable = () => {
      enqueue.disabled = true;
      dequeue.disabled = true;
      peek.disabled = true
      isEmpty.disabled = true
      size.disabled = true
    };
  
    // Enable all buttons
    const buttonEnable = () => {
      enqueue.disabled = false;
      dequeue.disabled = false;
      peek.disabled = false
      isEmpty.disabled = false
      size.disabled = false
    };  
  
  });
  