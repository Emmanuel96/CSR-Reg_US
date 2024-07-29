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

  try {
    const findEmailResponse = await fetch(`/user/find/?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const findEmailResult = await findEmailResponse.json();

    if (findEmailResult.application === true) {
      const result = await Swal.fire({
        title: "You do not have a Small Business Application?",
        text: "Do you want to create one now?",
        icon: "question",
        confirmButtonText: "Yes",
        confirmButtonColor: "#00a19a",
        cancelButtonText: "No",
        cancelButtonColor: "black",
        showCancelButton: true,
      });

      if (result.isConfirmed) {
        const createAppResponse = await fetch(`/createApplication/?email=${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const createAppResult = await createAppResponse.json();

        if (createAppResult.created) {
          Swal.fire({
            title: "Successful",
            icon: "success",
            confirmButtonColor: "#00a19a",
          });
          setTimeout(() => {
            console.log("3 seconds passed. You can add your code here.");
          }, 3000)
        }
      }
    }

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
    window.location.href = "/company_details";
  } catch (error) {
    console.error(error);
    signInButton.innerText = "Sign In";
    signInButton.disabled = false;
    Swal.fire({
      title: "Email or password is incorrect",
      confirmButtonColor: "#00a19a",
    });
  }
}


var login_form = $("#login_form");
$("#login_form").on("submit", loginSubmit);