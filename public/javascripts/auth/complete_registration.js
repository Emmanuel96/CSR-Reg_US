
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login_form");
    const emailInput = document.getElementById("input_email");
    const passwordInput = document.getElementById("input_password");
    const passwordConfirmInput = document.getElementById("input_password_confirm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get values from the form inputs
        const email = emailInput.value;
        const password = passwordInput.value;
        const passwordConfirm = passwordConfirmInput.value;

        console.log(email)
        console.log(password)
        console.log(passwordConfirm)

        // Compare passwords
        if (password !== passwordConfirm) {
            Swal.fire({
                title: "Password do not match",
                confirmButtonColor: "#00a19a",
            });
            return;
        }

        const endpoint = "/api/complete_registration";
        const requestData = {
            email,
            password,
        };

        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        title: `${data.response}`,
                        confirmButtonColor: "#00a19a",
                    }).then(() => window.location.href = '/login')
            }
                else {
                    Swal.fire({
                        title: `${data.response}`,
                        confirmButtonColor: "#00a19a",
                    })
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    });
});
