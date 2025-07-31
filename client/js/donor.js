const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

if (!token || role !== 'donor') {
  alert('Access denied. Donor only.');
  window.location.href = 'login.html';
}

const apiUrl = 'http://localhost:5000/api/donor';

const donationForm = document.getElementById('donationForm');
donationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(donationForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch(`${apiUrl}/donate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (res.ok) {
      alert('Donation submitted!');
      donationForm.reset();
      loadDonations();
    } else {
      alert(result.message || 'Failed to donate');
    }
  } catch (err) {
    alert('Error: ' + err.message);
  }
});

async function loadDonations() {
  try {
    const res = await fetch(`${apiUrl}/history`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const donations = await res.json();
    const tbody = document.querySelector('#donationTable tbody');
    tbody.innerHTML = '';

    donations.forEach(d => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${new Date(d.date).toLocaleDateString()}</td>
        <td>${d.location}</td>
        <td>${d.bloodType}</td>
        <td>${d.units}</td>
        <td>${d.status}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}

loadDonations();

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}
