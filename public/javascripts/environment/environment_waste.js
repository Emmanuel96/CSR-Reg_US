let applicationID = window.location.pathname.split('/').pop()
var docData = "";

const formfields = ['env_waste']

document.addEventListener('DOMContentLoaded', () => {
  formfields.forEach(field => {
    document.getElementById(field).addEventListener('input', (e) => {
      localStorage.setItem(field, e.target.value);
    });
  });
})

function getEnvWaste() {
  axios
    .get(`/api/application_info/${applicationID}`)
    .then((result) => {
      docData = result.data;
    })
    .then(() => {
      document.getElementById('env_waste').value = localStorage.getItem('env_waste') ? localStorage.getItem('env_waste') : docData.env_waste
    });
}
getEnvWaste();

function updateEnvironmentWaste() {
  event.preventDefault();

  var env_waste = document.getElementById("env_waste").value;
  var env_waste_completed = true;

  if (!env_waste) {
    return Swal.fire({
      title: "Please complete text field",
      confirmButtonColor: "#00a19a",
    });
  }

  document.getElementById("submit_btn").innerText = "Submitting";

  document.getElementById("submit_btn").disabled = true;

  var data = {
    env_waste,
    env_waste_completed,
  };

  fetch(`/environment_waste/${applicationID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        formfields.forEach(field => {
          localStorage.removeItem(field)
        })
        document.getElementById("submit_btn").innerText = "Submit";

        document.getElementById("submit_btn").disabled = false;

        Swal.fire({
          title: "Successfully Saved Environment Waste",
          confirmButtonColor: "#00a19a",
        }).then(function () {
          window.location.href = `/environment_supporting_documents/${applicationID}`;
        });
      } else {
        document.getElementById("submit_btn").innerText = "Submit";

        document.getElementById("submit_btn").disabled = false;

        Swal.fire({
          title: "Failed to submit. Please try again",
          confirmButtonColor: "#00a19a",
        });
      }
    });
}
