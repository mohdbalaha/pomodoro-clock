window.onload = function () {
  let minSession = 25;
  let minBreak = 5;
  let min = minSession;
  let sec = 0;
  //session/break
  let isInSession = true;
  //start/stop
  let isWorking = false;
  let isChanged = false;
  let myInterval;

  document.getElementById("session").addEventListener("click", session);

  document.getElementById("minus1").addEventListener("click", function () {
    if (minSession > 1) {
      minSession--;
      if (isInSession) {
        isChanged = true;
        document.getElementById("timer").innerText = minSession;
      }
    }
    document.getElementById("val1").innerText = ' ' + minSession + ' ';
  });

  document.getElementById("plus1").addEventListener("click", function () {
    if (minSession < 59) {
      minSession++;

      if (isInSession) {
        isChanged = true;
        document.getElementById("timer").innerText = minSession;
      }
    }
    document.getElementById("val1").innerText = ' ' + minSession + ' ';
  });

  document.getElementById("minus2").addEventListener("click", function () {
    if (minBreak > 1) {
      minBreak--;

      if (!isInSession) {
        isChanged = true;
        document.getElementById("timer").innerText = minBreak;
      }
    }
    document.getElementById("val2").innerText = ' ' + minBreak + ' ';
  });

  document.getElementById("plus2").addEventListener("click", function () {
    if (minBreak < 59) {
      minBreak++;

      if (!isInSession) {
        isChanged = true;
        document.getElementById("timer").innerText = minBreak;
      }
    }
    document.getElementById("val2").innerText = ' ' + minBreak + ' ';
  });

  function session() {
    if (!isWorking) {
      start();
    } else {
      stop();
    }

    function start() {
      if (!isWorking) {
        myInterval = setInterval(timer, 1000);
        isWorking = true;
        document.getElementById("minus1").setAttribute("disabled", "true");
        document.getElementById("minus2").setAttribute("disabled", "true");
        document.getElementById("plus1").setAttribute("disabled", "true");
        document.getElementById("plus2").setAttribute("disabled", "true");
        if (isInSession && isChanged) {
          min = minSession;
          sec = 0;
          document.getElementById("timer").innerText = minSession;
        } else if (!isInSession && isChanged) {
          min = minBreak;
          sec = 0;
          document.getElementById("timer").innerText = minBreak;
        }
      }
    }

    function stop() {
      if (isWorking) {
        clearInterval(myInterval);
        isWorking = false;
        document.getElementById("minus1").removeAttribute("disabled", "true");
        document.getElementById("minus2").removeAttribute("disabled", "true");
        document.getElementById("plus1").removeAttribute("disabled", "true");
        document.getElementById("plus2").removeAttribute("disabled", "true");
        isChanged = false;
      }
    }

    function timer() {
      if (min <= 0 && sec <= 0) {
        if (isInSession) {
          inBreak();
        } else {
          inSession()
        }
      } else {
        if (sec <= 0) {
          min--;
          sec = 60;
        }
        sec--;
      }
      document.getElementById("timer").innerText = zero(min) + ":" + zero(sec);
    }

    function inBreak() {
      min = minBreak;
      document.getElementById("title").innerText = "Break!";
      isInSession = false;
    }

    function inSession() {
      document.getElementById("title").innerText = "Session";
      min = minSession;
      isInSession = true;
    }

    function zero(num) {
      if (num < 10) {
        return "0" + num;
      } else {
        return num;
      }
    }
  }


}