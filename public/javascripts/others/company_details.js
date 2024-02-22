let ID = sessionStorage.getItem("csra_user");

let docData = "";

function getCompanyDetails() {
  axios
    .get(`/api/application/${ID}`)
    .then((result) => {
      docData = result.data;
    })
    .then(() => {
      document.getElementById("contact_person").value = docData.contact_person;
      document.getElementById("organisation_name").value =
        docData.organisation_name;
      document.getElementById("organisation_address").value =
        docData.organisation_address;
      document.getElementById("industry_sector").value =
        docData.industry_sector;
      document.getElementById("organisation_nationality").value =
        docData.organisation_nationality;
      document.getElementById("postal_code").value = docData.postal_code;
      document.getElementById("email_address").value = docData.email_address;
      document.getElementById("contact_number").value = docData.contact_number;
      document.getElementById("thirdparty_org").value = docData.thirdparty_org;

      let orgSizeRadios = document.getElementsByName("orgSize");

      for (let radio of orgSizeRadios) {
        if (radio.value === docData.organisation_size) {
          radio.checked = true;
        }
      }
      // if (docData.company_details_completed) {
      //   document.getElementById("submit_btn").disabled = true;
      // }
    });
}
getCompanyDetails();

// function getSelectedOption(select) {
//   var opt;
//   for ( var i = 0, len = select.options.length; i < len; i++ ) {
//       opt = select.options[i];
//       if ( opt.selected === true ) {
//           break;
//       }
//   }
//   return opt;
// }

// console.log(
//   getSelectedOption(document.getElementsByName('thirdparty_org'))
// )

function updateCompanyDetails() {
  event.preventDefault();

  let orgSizeRadios = document.getElementsByName("orgSize");
  let orgSizeVal = "";
  for (let radio of orgSizeRadios) {
    if (radio.checked) {
      orgSizeVal = radio.value;
    }
  }

  let contact_person = document.getElementById("contact_person").value;
  let organisation_name = document.getElementById("organisation_name").value;
  let organisation_address = document.getElementById(
    "organisation_address"
  ).value;
  let organisation_nationality = document.getElementById(
    "organisation_nationality"
  ).value;
  let industry_sector = document.getElementById("industry_sector").value;
  let postal_code = document.getElementById("postal_code").value;
  let email_address = document.getElementById("email_address").value;
  let contact_number = document.getElementById("contact_number").value;
  let thirdparty_org = document.getElementById("thirdparty_org").value;
  let reaccreditation = document.getElementById("reapplying").value;

  let organisation_size = orgSizeVal;
  let company_details_completed = true;

  if (
    !contact_person ||
    !organisation_name ||
    !organisation_address ||
    !organisation_nationality ||
    !industry_sector ||
    !postal_code ||
    !email_address ||
    !contact_number ||
    !organisation_size ||
    !reaccreditation
  ) {
    return Swal.fire({
      title: "Please complete all input fields",
      confirmButtonColor: "#00a19a",
    });
  } else if (thirdparty_org === "null") {
    return Swal.fire({
      title: "Please chose an option from 'Third Sector Organisation'",
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
      industry_sector,
      postal_code,
      email_address,
      contact_number,
      organisation_size,
      thirdparty_org,
      reaccreditation,
      company_details_completed,
    };

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
          // fetch(`/api/application/completed`, {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          // });

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
