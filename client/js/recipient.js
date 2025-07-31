const token = localStorage.getItem('token');
const apiUrl = 'http://localhost:5000/api/recipient';

if (!token || localStorage.getItem('role') !== 'recipient') {
  alert('Unauthorized access');
  window.location.href = 'login.html';
}

const requestForm = document.getElementById('requestForm');
if (requestForm) {
  requestForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(requestForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${apiUrl}/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (res.ok) {
        alert('Blood request submitted');
        requestForm.reset();
        loadRequestHistory();
      } else {
        alert(result.message || 'Failed to request');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });
}

async function loadRequestHistory() {
  try {
    const res = await fetch(`${apiUrl}/my-requests`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const requests = await res.json();

    const tbody = document.getElementById('requestHistory');
    tbody.innerHTML = '';

    requests.forEach(r => {
      const row = `<tr>
        <td>${r.bloodType}</td>
        <td>${r.units}</td>
        <td>${r.location}</td>
        <td>${r.status}</td>
      </tr>`;
      tbody.innerHTML += row;
    });
  } catch (err) {
    alert('Failed to load request history');
  }
}

loadRequestHistory();

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}
