
  document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('invitation-form');
  const resultDiv = document.getElementById('invitation-result');

  button.addEventListener('click', async () => {
    try {
      const response = await axios.post('/create-read-only-link', {
        daysValid: 7
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      const data = response.data;

      if (data.success) {
        const readOnlyLink = data.readOnlyLinks.company_details;

        resultDiv.innerHTML = `
          <p class="invitation-link bg-yellow-100 text-red-600 px-4 py-3 rounded">
            <a href="${readOnlyLink}" target="_blank" class="break-words">${readOnlyLink}</a>
            <button 
              class="copy-button px-2 py-1 font-semibold bg-gray-200 rounded mt-2"
              onclick="copyLink('${readOnlyLink}')"
            >
              Copy Link
            </button>
          </p>
          <p class="text-xs font-semibold mt-1">Share this link for read-only.</p>
        `;
      } else {
        resultDiv.innerHTML = `<p class="text-red-600 text-xs">${data.error || 'Failed to generate read-only link'}</p>`;
      }
    } catch (err) {
      console.error('Error generating read-only link:', err);
      resultDiv.innerHTML = `<p class="text-red-600 text-xs">Error: ${err.response?.data?.error || err.message}</p>`;
    }
  });
});

function copyLink(link) {
  navigator.clipboard.writeText(link)
    .then(() => alert('Link copied to clipboard!'))
    .catch(err => alert('Failed to copy link: ' + err.message));
}
