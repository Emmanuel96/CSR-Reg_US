let ID = sessionStorage.getItem("csra_user");

axios.get(`/api/view-applications/${ID}`)
    .then(res => {
        console.log(res.data)
        if (Array.isArray(res.data) && res.data.length > 0) {
            renderAssessedApplications(res.data, "container");
        } else {
            document.getElementById('empty_state').innerHTML = 'NO Small Business Application';
        }
    })
    .catch(error => {
        console.error('Error fetching assessed applications:', error);
        document.getElementById('empty_state').innerHTML = 'Error fetching assessed applications. Please try again later.';
    });

function renderAssessedApplications(applications, section) {
    const container = document.getElementById(section);
    container.innerHTML = ''; // Clear previous content
    applications.forEach(application => {
        const applicationDiv = document.createElement('div');
        applicationDiv.classList.add('flex-2', 'col-span-4', 'rounded-md', 'border-2', 'shadow-md', 'p-5', 'text-center');

        // Create a parent div for nameHeading, emailPara, and countryPara
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('mb-5'); // Add margin bottom to separate from buttons

        const nameHeading = document.createElement('h1');
        nameHeading.classList.add('font-semibold', 'text-[#585856]', 'text-xl');
        nameHeading.textContent = application.organisation_name;

        const emailPara = document.createElement('p');
        emailPara.classList.add('mt-2', 'text-[#585856]');
        emailPara.textContent = application.email_address;

        const countryPara = document.createElement('p');
        countryPara.classList.add('mt-2', 'text-[#00A19A]', 'text-xl');
        countryPara.textContent = application.country;

        // Append nameHeading, emailPara, and countryPara to infoDiv
        infoDiv.appendChild(countryPara);
        infoDiv.appendChild(nameHeading);
        infoDiv.appendChild(emailPara);

        const buttonContainer = document.createElement('div'); // New div for buttons
        buttonContainer.classList.add('flex', 'justify-center', 'my-3'); // Centering the button

        const viewAppButton = document.createElement('button');
        viewAppButton.classList.add('text-sm', 'rounded-md', 'text-white', 'bg-[#00A19A]', 'py-1', 'px-3', 'hover:bg-[#068882]', 'hover:shadow-md');
        viewAppButton.textContent = 'View';
        viewAppButton.addEventListener('click', () => {
            window.location.href = `/company_details/${application._id}`;
            localStorage.setItem("ApplicationId", application._id)
        });

        buttonContainer.appendChild(viewAppButton);

        applicationDiv.appendChild(infoDiv);
        applicationDiv.appendChild(buttonContainer); // Append buttonContainer directly
        container.appendChild(applicationDiv);
    });
}




// function deleteApplication(id, name, flag=0) {
//     let url = '/api/application'
//     Swal.fire({
//         title: `Are you sure you want to delete ${name}?`,
//         showDenyButton: true,
//         confirmButtonText: 'Yes',
//         confirmButtonColor: '#00a19a',
//         denyButtonText: 'No',
//     }).then((result) => {
//         if (result.isConfirmed) {
//             if (flag != 0) url = '/api/small_application'
//             axios.delete(`${url}/${id}`)
//                 .then(() => {
//                     window.location.reload();
//                 })
//                 .catch(error => {
//                     console.error('Error deleting assessor:', error);
//                 });
//         }
//     });
// }

