let applicationID = window.location.pathname.split('/').pop()

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