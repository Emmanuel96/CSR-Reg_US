let applicationID = window.location.pathname.split('/').pop()
var docData = ""

const formfields = ['env_supply_chain']

document.addEventListener('DOMContentLoaded', () => {
  formfields.forEach(field => {
    document.getElementById(field).addEventListener('input', (e) => {
      localStorage.setItem(field, e.target.value);
    });
  });
})

function getEnvSupplyChain(){
  axios.get(`/api/application_info/${applicationID}`).then(result => {
    docData = result.data
  }).then(() => {
    document.getElementById('env_supply_chain').value = localStorage.getItem('env_supply_chain') ? localStorage.getItem('env_supply_chain') : docData.env_supply_chain_management
  })
}
getEnvSupplyChain()

function updateEnvironmentSupplyChain(){
  event.preventDefault(); 

  var env_supply_chain_management = document.getElementById('env_supply_chain').value;
  var env_supply_chain_management_completed = true

  if(!env_supply_chain_management){
    return Swal.fire({
      title: "Please complete text field",
      confirmButtonColor: '#00a19a'
    })
  }
  
  var data = {
    env_supply_chain_management,
    env_supply_chain_management_completed
  }

  document.getElementById('submit_btn').innerText = "Submitting"

  document.getElementById('submit_btn').disabled = true

  fetch(`/environment_supply_chain_management/${applicationID}`, {
      method: "PUT", 
      headers: {
          'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
      if(data.success){
        formfields.forEach(field => {
          localStorage.removeItem(field)
        })
        document.getElementById('submit_btn').innerText = "Submit"

        document.getElementById('submit_btn').disabled = false

        Swal.fire({
          title: "Successfully Saved Environment Supply Chain Management",
          confirmButtonColor: '#00a19a'
        }).then(function(){
          window.location.href = "/environment_waste"
        });
      }else{
        document.getElementById('submit_btn').innerText = "Submit"

        document.getElementById('submit_btn').disabled = false
        
        Swal.fire({
          title: "Failed to submit. Please try again",
          confirmButtonColor: '#00a19a'
        })              
      }
  })
}