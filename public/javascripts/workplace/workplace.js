let applicationID = window.location.pathname.split('/').pop()
var docData = ""

const formfields = ['wrk_training']

document.addEventListener('DOMContentLoaded', () => {
  formfields.forEach(field => {
    document.getElementById(field).addEventListener('input', (e) => {
      localStorage.setItem(field, e.target.value);
    });
  });
})

function getWrkTraining(){
  axios.get(`/api/application_info/${applicationID}`).then(result => {
    docData = result.data
  }).then(() => {
    document.getElementById('wrk_training').value = localStorage.getItem('wrk_training') ? localStorage.getItem('wrk_training') : docData.workplace
  })
}
getWrkTraining()

function updateWorkPlaceTraining(){
  event.preventDefault(); 

  var workplace = document.getElementById('wrk_training').value;
  var workplace_completed = true

  if(!workplace_completed){
    return Swal.fire({
      title: "Please complete text field",
      confirmButtonColor: '#00a19a'
    })
  }

  document.getElementById('submit_btn').innerText = "Submitting"

  document.getElementById('submit_btn').disabled = true
  
  var data = {
    workplace,
    workplace_completed
  }

  fetch(`/workplace/${applicationID}`, {
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
          title: "Successfully Saved Workplace",
          confirmButtonColor: '#00a19a'
        }).then(function(){
          window.location.href = `/workplace_supporting_documents/${applicationID}`
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