let ID = sessionStorage.getItem("csra_user");

let docData = "";

const formfields = ['contact_person', 'organisation_name', 'organisation_address', 'organisation_nationality', 'postal_code', 'email_address', 'telephone_number', 'mobile_number', 'soleTraderMicro', 'charity']


document.addEventListener('DOMContentLoaded', () => {
  formfields.forEach(field => {
    document.getElementById(field).addEventListener('input', (e) => {
      localStorage.setItem(field, e.target.value);
    });
  });
})

function getCompanyDetails() {
  axios
    .get(`/api/application/${ID}`)
    .then((result) => {
      docData = result.data;
      console.log(docData.mobile_number, docData.telephone_number)
    })
    .then(() => {
      document.getElementById('contact_person').value = localStorage.getItem('contact_person') ? localStorage.getItem('contact_person') : docData.contact_person
      document.getElementById('organisation_name').value = localStorage.getItem('organisation_name') ? localStorage.getItem('organisation_name') : docData.organisation_name
      document.getElementById('organisation_address').value = localStorage.getItem('organisation_address') ? localStorage.getItem('organisation_address') : docData.organisation_address
      document.getElementById('telephone_number').value = localStorage.getItem('telephone_number') ? localStorage.getItem('telephone_number') : docData.telephone_number
      document.getElementById('organisation_nationality').value = localStorage.getItem('organisation_nationality') ? localStorage.getItem('organisation_nationality') : docData.organisation_nationality
      document.getElementById('postal_code').value = localStorage.getItem('postal_code') ? localStorage.getItem('postal_code') : docData.postal_code
      document.getElementById('email_address').value = localStorage.getItem('email_address') ? localStorage.getItem('email_address') : docData.email_address
      document.getElementById('mobile_number').value = localStorage.getItem('mobile_number') ? localStorage.getItem('mobile_number') : docData.mobile_number
      document.getElementById('soleTraderMicro').value = localStorage.getItem('soleTraderMicro') ? localStorage.getItem('soleTraderMicro') : docData.soleTraderMicro
      document.getElementById('charity').value = localStorage.getItem('charity') ? localStorage.getItem('charity') : docData.charity
    });
}
getCompanyDetails();


function updateCompanyDetails() {
  event.preventDefault();

  let contact_person = document.getElementById("contact_person").value;
  let organisation_name = document.getElementById("organisation_name").value;
  let organisation_address = document.getElementById(
    "organisation_address"
  ).value;
  let organisation_nationality = document.getElementById(
    "organisation_nationality"
  ).value;
  let telephone_number = document.getElementById("telephone_number").value;
  let postal_code = document.getElementById("postal_code").value;
  let email_address = document.getElementById("email_address").value;
  let mobile_number = document.getElementById("mobile_number").value;
  let soleTraderMicro = document.getElementById("soleTraderMicro").value;
  let charity = document.getElementById("charity").value;

  let company_details_completed = true;

  if (
    !contact_person ||
    !organisation_name ||
    !organisation_address ||
    !organisation_nationality ||
    !telephone_number ||
    !postal_code ||
    !email_address ||
    !mobile_number ||
    !charity ||
    !soleTraderMicro
  ) {
    return Swal.fire({
      title: "Please complete all input fields",
      confirmButtonColor: "#00a19a",
    });
  } else if (soleTraderMicro === "null") {
    return Swal.fire({
      title: "Please chose an option from 'Are You a Sole Trader/Micro (1 – 3 employees)'",
      confirmButtonColor: "#00a19a",
    });
  } else {
    document.getElementById("submit_btn").innerText = "Submitting";

    document.getElementById("submit_btn").disabled = true;

    let data = {
      contact_person,
      organisation_name,
      organisation_address,
      organisation_nationality,
      telephone_number,
      postal_code,
      email_address,
      mobile_number,
      soleTraderMicro,
      charity,
      company_details_completed,
    };
    console.log(data)

    fetch(`/company_details/${ID}`, {
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
            title: "Successfully submitted Organisation Details",
            confirmButtonColor: "#00a19a",
          }).then(function () {
            window.location.href = "/notes";
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
}

document.addEventListener("DOMContentLoaded", function() {
  // Get the select elements for charity and sole trader
  const charitySelect = document.getElementById("charity");
  const soleTraderSelect = document.getElementById("soleTraderMicro");

  // Add event listener to the charity select
  charitySelect.addEventListener("change", function() {
    if (charitySelect.value === "YES") {
      soleTraderSelect.value = "NO";
    } else {
      soleTraderSelect.value = "YES";
    }
  });

  // Add event listener to the sole trader select
  soleTraderSelect.addEventListener("change", function() {
    // If sole trader is selected as YES
    if (soleTraderSelect.value === "YES") {
      // Set the value of charity select to NO
      charitySelect.value = "NO";
    } else {
      // If sole trader is selected as NO
      // Set the value of charity select to YES
      charitySelect.value = "YES";
    }
  });
});
