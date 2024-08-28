let applicationID = window.location.pathname.split('/').pop()
var docData = ""

const formfields = ['charitable_inv']

document.addEventListener('DOMContentLoaded', () => {
  formfields.forEach(field => {
    document.getElementById(field).addEventListener('input', (e) => {
      localStorage.setItem(field, e.target.value);
    });
  });
})

function getPhilCharitable(){
  axios.get(`/api/application_info/${applicationID}`).then(result => {
    docData = result.data
  }).then(() => {
    console.log(docData)
    document.getElementById('charitable_inv').value = localStorage.getItem('charitable_inv') ? localStorage.getItem('charitable_inv') : docData.philanthropy

    if (docData.scores.length >= 2) {
        document.getElementById("submit_btn").disabled = true;
      }
  })
}
getPhilCharitable()

function updatePhilCharitableInv(){
  event.preventDefault(); 

  var philanthropy = document.getElementById('charitable_inv').value;
  var philanthropy_completed = true

  if(!philanthropy_completed){
    return Swal.fire({
      title: "Please complete text field",
      confirmButtonColor: '#00a19a'
    })
  }
  
  document.getElementById('submit_btn').innerText = "Submitting"

  document.getElementById('submit_btn').disabled = true

  var data = {
    philanthropy,
    philanthropy_completed
  }

  fetch(`/philanthropy/${applicationID}`, {
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
          title: "Successfully Saved Philanthropy",
          confirmButtonColor: '#00a19a'
        }).then(function(){
          window.location.href = `/philanthropy_supporting_documents/${applicationID}`
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