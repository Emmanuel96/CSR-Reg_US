const ID = sessionStorage.getItem("csra_user");
let docData = ""

function getAppIntro(){
  axios.get(`/api/application/${ID}`).then(result => {
    docData = result.data
  }).then(() => {
    document.getElementById('introduction_textarea').value = docData.introduction
  })
}
getAppIntro()

function updateApplicationIntroduction(){
  event.preventDefault(); 

  var introduction = document.getElementById('introduction_textarea').value;
  var introduction_completed = true

  if(!introduction){
    return Swal.fire({
      title: "Please complete text field",
      confirmButtonColor: '#00a19a'
    })
  }
  
  document.getElementById('submit_btn').innerText = "Submitting"

  document.getElementById('submit_btn').disabled = true

  var data = {
    introduction,
    introduction_completed
  }

  fetch(`/application_introduction/${ID}`, {
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
          title: "Successfully submitted Introduction",
          confirmButtonColor: "#00a19a",
        }).then(() => {
          window.location.href = "/environment_energy";
        })
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

document.addEventListener("DOMContentLoaded", function() {
    const textarea = document.getElementById("introduction_textarea");
    const wordCountDisplay = document.getElementById("word_count");

    function updateWordCount() {
        const wordCount = textarea.value.trim().split(/\s+/).length;
        wordCountDisplay.textContent = `${wordCount}/500 words`;
    }

    textarea.addEventListener("input", updateWordCount);

    updateWordCount();
});