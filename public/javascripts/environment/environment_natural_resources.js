const ID = sessionStorage.getItem("csra_user");
var docData = ""

const formfields = ['env_natural_resource']

document.addEventListener('DOMContentLoaded', () => {
  formfields.forEach(field => {
    document.getElementById(field).addEventListener('input', (e) => {
      localStorage.setItem(field, e.target.value);
    });
  });
})

function getEnvNatural(){
  axios.get(`/api/application/${ID}`).then(result => {
    docData = result.data
  }).then(() => {
    document.getElementById('env_natural_resource').value = localStorage.getItem('env_natural_resource') ? localStorage.getItem('env_natural_resource') : docData.env_natural_resource
  })
}
getEnvNatural()

function updateEnvironmentNaturalResource(){
  event.preventDefault(); 

  var env_natural_resource = document.getElementById('env_natural_resource').value;
  var env_natural_resource_completed = true

  if(!env_natural_resource){
    return Swal.fire({
      title: "Please complete text field",
      confirmButtonColor: '#00a19a'
    })
  }

  document.getElementById('submit_btn').innerText = "Submitting"

  document.getElementById('submit_btn').disabled = true
  
  var data = {
    env_natural_resource,
    env_natural_resource_completed
  }

  fetch(`/environment_natural_resource/${ID}`, {
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
          title: "Successfully Saved Environment Natural Resources",
          confirmButtonColor: '#00a19a'
        }).then(function(){
          window.location.href = "/environment_travel"
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