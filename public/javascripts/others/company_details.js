let ID = sessionStorage.getItem("csra_user");

let docData = "";

function getCompanyDetails() {
  axios
    .get(`/api/application/${ID}`)
    .then((result) => {
      docData = result.data;
      console.log(docData.mobile_number, docData.telephone_number)
    })
    .then(() => {
      document.getElementById("contact_person").value = docData.contact_person;
      document.getElementById("organisation_name").value =
        docData.organisation_name;
      document.getElementById("organisation_address").value =
        docData.organisation_address;
      document.getElementById("telephone_number").value =
        docData.telephone_number;
      document.getElementById("organisation_nationality").value =
        docData.organisation_nationality;
      document.getElementById("postal_code").value = docData.postal_code;
      document.getElementById("email_address").value = docData.email_address;
      document.getElementById("mobile_number").value = docData.mobile_number;
      document.getElementById("soleTraderMicro").value = docData.soleTraderMicro;
      document.getElementById("charity").value = docData.charity;
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
          document.getElementById("submit_btn").innerText = "Submit";

          document.getElementById("submit_btn").disabled = false;

          Swal.fire({
            title: "Successfully submitted Organisation Details",
            confirmButtonColor: "#00a19a",
          }).then(function () {
            window.location.href = "/assessment_and_tips";
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
