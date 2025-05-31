function signup() {
  const username = document.getElementById("signupUserName").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  if (username && password) {
    fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Success sign");
        } else {
          alert(data.message);
        }
      });
  }
  document.getElementById("signupUserName").value = "";
  document.getElementById("signupPassword").value = "";
}

function login() {
  const username = document.getElementById("loginUserName").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  if (username && password) {
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Success login");
        } else {
          alert(data.message);
        }
      });
  }
  document.getElementById("loginUserName").value = "";
  document.getElementById("loginPassword").value = "";
}
