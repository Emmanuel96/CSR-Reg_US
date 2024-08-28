let applicationID = window.location.pathname.split('/').pop()

document.addEventListener('DOMContentLoaded', () => {
  axios
    .get(`/api/application_info/${applicationID}`)
    .then((result) => {
      docData = result.data;
    })
    .then(() => {
      if (docData.scores.length >= 2) {
        document.getElementById("nxt_btn").disabled = true;
      }
    })
})

function updateAssessments(){
  event.preventDefault(); 
  document.getElementById('nxt_btn').innerText = "Please wait..."

  document.getElementById('nxt_btn').disabled = true

  fetch(`/notes/${applicationID}`, {
    method: "PUT", 
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(() => {
    document.getElementById('nxt_btn').innerText = "Next"

    document.getElementById('nxt_btn').disabled = false
    
    window.location.href = `/application_introduction/${applicationID}`
  })
}