const activePage = window.location.pathname;
// const ID = sessionStorage.getItem("csra_user");
if (localStorage.getItem("active")){
  console.log(localStorage.getItem("active"))
  document.getElementById(localStorage.getItem("active")).classList.add("active")
  localStorage.removeItem("active")
}

const navLinks = document.querySelectorAll('[data-url]').forEach(data => {
  // console.log(data.dataset.url)
  // console.log(activePage);
  let current = data.dataset.url
  // console.log(current.localeCompare(activePage));
  if(current.localeCompare(activePage) == 0){
    data.classList.add("active")
    // link.classList.add('active');
  }
})
const navLink = document.querySelectorAll('[data-url]')
// console.log(navLink);
// const navLinks = document.querySelectorAll('nav a.block')
// // const navLinks = document.getElementsByClassName("px-2")
// for (var i = 0; i < navLinks.length; i++) {
//   navLinks[i].addEventListener("click", function(){
//     // var current = document.getElementsByClassName("active");
//     var current = document.getElementsByClassName("active");
//   if (current.length > 0) { 
//     current[0].className = current[0].className.includes(" active", "");
//   }
//   this.className += " active";
//   })
// }
// console.log(navLinks)
const gotoSubmenu = (url, mainmenu) => {
  localStorage.setItem('active', mainmenu);
  window.location.href = url
}



const userID = sessionStorage.getItem("csra_user");

//holds the application object data
let req_data = ""

//gets the application data of thelogged in user and sets the req_data variable to the returned object value
axios.get(`/api/application/${userID}`).then(result => {
  req_data = result.data
  console.log(req_data)
}).then(() => applicationStatus())

function applicationStatus() {
  let company_details_completed = req_data.company_details_completed
  let introduction_completed = req_data.introduction_completed
  let notes = req_data.notes

  let env_energy_completed = req_data.env_energy_completed
  let env_natural_resource_completed = req_data.env_natural_resource_completed
  let env_travel_completed = req_data.env_travel_completed
  let env_supply_chain_management_completed = req_data.env_supply_chain_management_completed
  let env_waste_completed = req_data.env_waste_completed
  let environment_completed = false

  let workplace_completed = req_data.workplace_completed
  console.log(workplace_completed)
  // let workplace_completed = false

  let community_completed = req_data.community_completed
  // let community_completed = false

  let philanthropy_completed = req_data.philanthropy_completed
  let philanthropyDoc = null

  let company_details_tick = document.getElementById("company_details_tick")

  //checks company details status and adds tick if true
  if(company_details_completed){
    company_details_tick.classList.remove("hidden");
  }

  let introduction_tick = document.getElementById("introduction_tick")

  //checks introduction status and adds tick if true
  if(introduction_completed){
    introduction_tick.classList.remove("hidden");
  }

  //checks if all environment pages are completed and adds tick to environment section
  if(
    env_energy_completed && env_natural_resource_completed && env_travel_completed && env_supply_chain_management_completed && env_waste_completed
  ){
    environment_completed = true

    let environment_tick = document.getElementById("environment_tick")

    environment_tick.classList.remove("hidden");
  }

  //checks if all workplace pages are completed and adds tick to workplace section
  if(
    workplace_completed
  ){

    let workplace_tick = document.getElementById("workplace_tick")

    workplace_tick.classList.remove("hidden")
  }

  //checks if all community pages are completed and adds tick to community section
  if(
    community_completed
  ){
    var community_tick = document.getElementById("community_tick")

    community_tick.classList.remove("hidden")
  }

  //checks if all philanthropy pages are completed and adds tick to philanthropy section
  if(
    philanthropy_completed
  ){
    var philanthropy_tick = document.getElementById("philanthropy_tick")

    philanthropy_tick.classList.remove("hidden")
  }

  var assessment_tick = document.getElementById("notes")

  //checks if asessment page is completed and adds tick
  if(notes){
    assessment_tick.classList.remove("hidden");
  }

  let finished_text = document.getElementById('finish_tick_text')
  //checks if all sections are true then adds tick to the finish button
  if(company_details_completed && introduction_completed && notes && environment_completed && workplace_completed && community_completed && philanthropy_completed){
    finish_tick.classList.remove("hidden");
    finished_text.classList.add('bg-gray-200')
  }
}

const confirmation = document.getElementById("finish_tick_text")
confirmation.addEventListener("click", (e) => {

  Swal.fire({
    title: 'Are you sure you want to submit your application?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    confirmButtonColor: '#00a19a',
    denyButtonText: 'No',
    customClass: {
      actions: 'my-actions',
      cancelButton: 'order-1 right-gap',
      confirmButton: 'order-2',
      denyButton: 'order-3',
    }
  }).then(result => {
    console.log(
      req_data.company_details_completed,
      req_data.introduction_completed,
      req_data.notes,
      req_data.env_energy_completed,
      req_data.env_natural_resource_completed,
      req_data.env_supply_chain_management_completed,
      req_data.env_travel_completed,
      req_data.env_waste_completed,
      req_data.workplace_completed,
      req_data.community_completed,
      req_data.philanthropy_completed
    )
    if (result.isConfirmed) {
      if (
        req_data.company_details_completed &&
        req_data.introduction_completed &&
        req_data.notes &&
        req_data.env_energy_completed &&
        req_data.env_natural_resource_completed &&
        req_data.env_supply_chain_management_completed &&
        req_data.env_travel_completed &&
        req_data.env_waste_completed &&
        req_data.workplace_completed &&
        req_data.community_completed &&
        req_data.philanthropy_completed
      ) {
        Swal.fire({
          title: "Thank You For completing Your Application!",
          confirmButtonColor: '#00a19a'
        });
        axios.put(`/application_finished/${userID}`);
        axios.post('/api/application/completed');
        window.location.href = "/submit";
      } else {
        Swal.fire({
          title: "Please Complete All Sections!",
          confirmButtonColor: '#00a19a'
        });
      }
    }
  });
});

