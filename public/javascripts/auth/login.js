async function loginSubmit(event) {
  event.preventDefault();

  const email = $("#input_email").val();
  const password = $("#input_password").val();

  if (!email || !password) {
    return Swal.fire({
      title: "Please enter email and password",
      confirmButtonColor: "#00a19a",
    });
  }

  const signInButton = document.getElementById("sign_in");
  signInButton.innerText = "Signing in...";
  signInButton.disabled = true;

  const data = { email, password };

  const loginResponse = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const loginResult = await loginResponse.json();

    signInButton.innerText = "Signing in...";
    const id = loginResult.userID;
    sessionStorage.setItem("csra_user", id);
    localStorage.setItem("csra_user", id);
    window.location.href = "/view-application";
}


var login_form = $("#login_form");
$("#login_form").on("submit", loginSubmit);