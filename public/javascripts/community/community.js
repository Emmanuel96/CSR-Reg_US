let applicationID = window.location.pathname.split('/').pop()
var docData = ""


const formfields = ['com_engagement_textarea']

document.addEventListener('DOMContentLoaded', () => {
  formfields.forEach(field => {
    document.getElementById(field).addEventListener('input', (e) => {
      localStorage.setItem(field, e.target.value);
    });
  });
})

function getComEngagement(){
  axios.get(`/api/application_info/${applicationID}`).then(result => {
    docData = result.data
  }).then(() => {
    document.getElementById('com_engagement_textarea').value = localStorage.getItem('com_engagement_textarea') ? localStorage.getItem('com_engagement_textarea') : docData.community
  })
}
getComEngagement()

function updateCommunityEngagement(){
  event.preventDefault(); 

  var community = document.getElementById('com_engagement_textarea').value;
  var community_completed = true

  if(!community_completed){
    return Swal.fire({
      title: "Please complete text field",
      confirmButtonColor: '#00a19a'
    })
  }

  document.getElementById('submit_btn').innerText = "Submitting"

  document.getElementById('submit_btn').disabled = true
  
  var data = {
    community,
    community_completed
  }

  fetch(`/community/${applicationID}`, {
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
          title: "Successfully Saved Community",
          confirmButtonColor: '#00a19a'
        }).then(function(){
          window.location.href = `/community_supporting_documents/${applicationID}`
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