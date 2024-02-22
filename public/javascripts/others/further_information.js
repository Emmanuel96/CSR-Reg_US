const ID = sessionStorage.getItem("csra_user");
var docData = "";

function getFurtherInfo() {
    console.log("get further information")
    axios
        .get(`/api/application/${ID}`)
        .then((result) => {
            docData = result.data;
        })
        .then(() => {
            document.getElementById("phil_other_information").value =
                docData.phil_other_information;
            document.getElementById("phil_future_planning").value =
                docData.phil_future_planning;
        });
}
getFurtherInfo();

axios.get(`/api/application/${ID}`).then(result => {
  appData = result.data
}).then(() => {
  document.getElementById('phil_other_information').value = appData.phil_other_information

  document.getElementById('phil_future_planning').value = appData.phil_future_planning
})

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
    if (appData.finished){
    Swal.fire({
      title: "Thank You For completing your Application!",
      confirmButtonColor: '#00a19a'
    })
    axios.put(`/further_information/${ID}`, data)
  }
  else{
    Swal.fire({
      title: "You have successfully updated your application!",
      confirmButtonColor: "#00a19a",
    });
    axios.put(`/further_information/${ID}`, data)
  }
  }
}