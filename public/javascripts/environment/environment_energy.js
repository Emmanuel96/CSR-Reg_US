let applicationID = window.location.pathname.split('/').pop()
var docData = "";

const formfields = ['env_energy_textarea']

document.addEventListener('DOMContentLoaded', () => {
  formfields.forEach(field => {
    document.getElementById(field).addEventListener('input', (e) => {
      localStorage.setItem(field, e.target.value);
    });
  });
})

function getEnvEnergy() {
  axios
    .get(`/api/application_info/${applicationID}`)
    .then((result) => {
      docData = result.data;
    })
    .then(() => {
      document.getElementById('env_energy_textarea').value = localStorage.getItem('env_energy_textarea') ? localStorage.getItem('env_energy_textarea') : docData.env_energy
    });
}
getEnvEnergy();

function updateEnvironmentEnergy() {
  event.preventDefault();

  var env_energy = document.getElementById("env_energy_textarea").value;
  var env_energy_completed = true;

  if (!env_energy) {
    return Swal.fire({
      title: "Please complete text field",
      confirmButtonColor: "#00a19a",
    });
  }

  document.getElementById("submit_btn").innerText = "Submitting";

  document.getElementById("submit_btn").disabled = true;

  var data = {
    env_energy,
    env_energy_completed,
  };

  fetch(`/environment_energy/${applicationID}`, {
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
          title: "Successfully Saved Environment Energy",
          confirmButtonColor: "#00a19a",
        }).then(function () {
          window.location.href = `/environment_natural_resource/${applicationID}`;
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
