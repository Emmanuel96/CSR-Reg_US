let applicationID = window.location.pathname.split('/').pop()
var docData = "";

const formfields = ['phil_other_information', 'phil_future_planning']

document.addEventListener('DOMContentLoaded', () => {
  formfields.forEach(field => {
    document.getElementById(field).addEventListener('input', (e) => {
      localStorage.setItem(field, e.target.value);
    });
  });
})

function getFurtherInfo() {
    console.log("get further information")
    axios
        .get(`/api/application_info/${applicationID}`)
        .then((result) => {
            docData = result.data;
        })
        .then(() => {
          document.getElementById('phil_other_information').value = localStorage.getItem('phil_other_information') ? localStorage.getItem('phil_other_information') : docData.phil_other_information
          document.getElementById('phil_future_planning').value = localStorage.getItem('phil_future_planning') ? localStorage.getItem('phil_future_planning') : docData.phil_future_planning
        });
}
getFurtherInfo();

function updateFurtherInfo(){
  event.preventDefault(); 

  let phil_other_information = document.getElementById('phil_other_information').value

  let phil_future_planning = document.getElementById('phil_future_planning').value

  var further_info_completed = true;

  let data = {
    phil_other_information,
    phil_future_planning,
    further_info_completed
  }

  if(!phil_other_information || !phil_future_planning){
    return Swal.fire({
      title: "Please complete all input fields",
      confirmButtonColor: '#00a19a'
    })
  }
  else {
    if (docData.finished){
      formfields.forEach(field => {
          localStorage.removeItem(field)
        })
    Swal.fire({
      title: "Thank You For completing your Application!",
      confirmButtonColor: '#00a19a'
    })
    axios.put(`/further_information/${applicationID}`, data)
  }
  else{
    formfields.forEach(field => {
          localStorage.removeItem(field)
        })
    Swal.fire({
      title: "You have successfully updated your application!",
      confirmButtonColor: "#00a19a",
    });
    axios.put(`/further_information/${ID}`, data)
  }
  }
}