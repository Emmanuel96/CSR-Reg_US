const ID = sessionStorage.getItem("csra_user");
var docData = ""

function getEnvTravel(){
  axios.get(`/api/application/${ID}`).then(result => {
    docData = result.data
  }).then(() => {
    document.getElementById('env_travel').value = docData.env_travel
  })
}
getEnvTravel()

function updateEnvironmentTravel(){
  event.preventDefault(); 

  var env_travel = document.getElementById('env_travel').value;
  var env_travel_completed = true

  if(!env_travel){
    return Swal.fire({
      title: "Please complete text field",
      confirmButtonColor: '#00a19a'
    })
  }

  document.getElementById('submit_btn').innerText = "Submitting"

  document.getElementById('submit_btn').disabled = true
  
  var data = {
    env_travel,
    env_travel_completed
  }

  fetch(`/environment_travel/${ID}`, {
      method: "PUT", 
      headers: {
          'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
      if(data.success){
        document.getElementById('submit_btn').innerText = "Submit"

        document.getElementById('submit_btn').disabled = false

        Swal.fire({
          title: "Successfully Saved Environment Travel",
          confirmButtonColor: '#00a19a'
        }).then(function(){
          window.location.href = "/environment_supply_chain_management"
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