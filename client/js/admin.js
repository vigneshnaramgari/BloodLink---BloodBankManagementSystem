const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
const apiUrl = 'https://bloodlink-f53w.onrender.com/api/admin';

if (!token || role !== 'admin') {
  alert('Access denied. Admin privileges required.');
  window.location.href = 'login.html';
}

let currentAction = null;
let currentId = null;

window.onload = () => {
  loadDashboardStats();
  loadRequests();
};

async function loadDashboardStats() {
  try {
    const res = await fetch(`${apiUrl}/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const stats = await res.json();
    
    document.getElementById('totalUsers').textContent = stats.totalUsers;
    document.getElementById('totalDonors').textContent = stats.totalDonors;
    document.getElementById('totalRecipients').textContent = stats.totalRecipients;
    document.getElementById('pendingRequests').textContent = stats.pendingRequests;
    document.getElementById('pendingDonations').textContent = stats.pendingDonations;
    document.getElementById('totalInventory').textContent = stats.totalInventory;
  } catch (err) {
    console.error('Failed to load stats:', err);
  }
}

async function loadRequests() {
  try {
    const res = await fetch(`${apiUrl}/requests`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const requests = await res.json();
    const table = document.getElementById('requestList');
    table.innerHTML = '';

    requests.forEach(req => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${req.recipient ? req.recipient.name : 'Unknown'}</td>
        <td><span class="status-badge status-${req.status}">${req.bloodType}</span></td>
        <td>${req.units} ml</td>
        <td>${req.location}</td>
        <td><span class="status-badge status-${req.status}">${req.status}</span></td>
        <td>
          ${req.status === 'pending' ? `
            <button class="action-btn approve-btn" onclick="confirmAction('approveRequest', '${req._id}')">
              <i class="fas fa-check"></i> Approve
            </button>
            <button class="action-btn reject-btn" onclick="confirmAction('rejectRequest', '${req._id}')">
              <i class="fas fa-times"></i> Reject
            </button>
          ` : 'No actions available'}
        </td>
      `;
      table.appendChild(row);
    });
  } catch (err) {
    console.error('Failed to load requests:', err);
  }
}

async function loadDonations() {
  try {
    console.log('Fetching donations...');
    const res = await fetch(`${apiUrl}/donations`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const donations = await res.json();
    console.log('Donations received:', donations);

    const table = document.getElementById('donationList');
    if (!table) {
      console.error('donationList table not found in DOM');
      return;
    }
    
    table.innerHTML = '';

    if (!Array.isArray(donations) || donations.length === 0) {
      table.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #666;">No donations available</td></tr>';
      return;
    }

    donations.forEach(d => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${d.donor?.name || 'Unknown'}</td>
        <td>${new Date(d.date).toLocaleDateString()}</td>
        <td>${d.location || 'N/A'}</td>
        <td><span class="status-badge status-${d.status}">${d.bloodType}</span></td>
        <td>${d.units || 0} ml</td>
        <td><span class="status-badge status-${d.status}">${d.status}</span></td>
        <td>
          ${d.status === 'pending' ? `
            <button class="action-btn approve-btn" onclick="confirmAction('approveDonation', '${d._id}')">
              <i class="fas fa-check"></i> Approve
            </button>
            <button class="action-btn reject-btn" onclick="confirmAction('rejectDonation', '${d._id}')">
              <i class="fas fa-times"></i> Reject
            </button>
          ` : 'No actions available'}
        </td>
      `;
      table.appendChild(row);
    });
  } catch (err) {
    console.error('Failed to load donations:', err);
    const table = document.getElementById('donationList');
    if (table) {
      table.innerHTML = '<tr><td colspan="7" style="text-align: center; color: red;">Error loading donations: ' + err.message + '</td></tr>';
    }
  }
}

async function loadInventory() {
  try {
    const res = await fetch(`${apiUrl}/inventory`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const inventory = await res.json();
    const table = document.getElementById('inventoryList');
    table.innerHTML = '';

    if (inventory.length === 0) {
      table.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #666;">No inventory data available</td></tr>';
      return;
    }

    inventory.forEach(item => {
      const status = item.units > 0 ? 'Available' : 'Out of Stock';
      const statusClass = item.units > 0 ? 'status-approved' : 'status-rejected';
      
      const row = `<tr>
        <td><span class="status-badge status-approved">${item.bloodType}</span></td>
        <td>${item.units} ml</td>
        <td><span class="status-badge ${statusClass}">${status}</span></td>
      </tr>`;
      table.innerHTML += row;
    });
  } catch (err) {
    console.error('Failed to load inventory:', err);
  }
}

async function loadUsers() {
  try {
    const res = await fetch(`${apiUrl}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const users = await res.json();
    const table = document.getElementById('userList');
    table.innerHTML = '';

    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td><span class="status-badge status-${user.role}">${user.role}</span></td>
        <td>${user.bloodType || 'N/A'}</td>
        <td>${user.location || 'N/A'}</td>
        <td>
          <button class="action-btn delete-btn" onclick="confirmAction('deleteUser', '${user._id}')">
            <i class="fas fa-trash"></i> Delete
          </button>
        </td>
      `;
      table.appendChild(row);
    });
  } catch (err) {
    console.error('Failed to load users:', err);
  }
}

async function updateRequest(id, status) {
  try {
    const res = await fetch(`${apiUrl}/requests/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });

    if (res.ok) {
      alert(`Request ${status} successfully!`);
      loadRequests();
      loadDashboardStats();
    } else {
      alert('Failed to update request status');
    }
  } catch (err) {
    console.error('Error updating request:', err);
    alert('Error updating request status');
  }
}

async function updateDonation(id, status) {
  try {
    const res = await fetch(`${apiUrl}/donations/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });

    if (res.ok) {
      alert(`Donation ${status} successfully!`);
      loadDonations();
      loadInventory();
      loadDashboardStats();
    } else {
      alert('Failed to update donation status');
    }
  } catch (err) {
    console.error('Error updating donation:', err);
    alert('Error updating donation status');
  }
}

async function deleteUser(id) {
  try {
    const res = await fetch(`${apiUrl}/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      alert('User deleted successfully!');
      loadUsers();
      loadDashboardStats();
    } else {
      alert('Failed to delete user');
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    alert('Error deleting user');
  }
}

function confirmAction(action, id) {
  currentAction = action;
  currentId = id;
  const modal = document.getElementById('confirmModal');
  const message = document.getElementById('modalMessage');
  
  switch(action) {
    case 'approveRequest':
      message.textContent = 'Are you sure you want to approve this blood request?';
      break;
    case 'rejectRequest':
      message.textContent = 'Are you sure you want to reject this blood request?';
      break;
    case 'approveDonation':
      message.textContent = 'Are you sure you want to approve this donation?';
      break;
    case 'rejectDonation':
      message.textContent = 'Are you sure you want to reject this donation?';
      break;
    case 'deleteUser':
      message.textContent = 'Are you sure you want to delete this user? This action cannot be undone.';
      break;
  }
  
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('confirmModal');
  modal.style.display = 'none';
  currentAction = null;
  currentId = null;
}

async function executeAction() {
  if (!currentAction || !currentId) return;
  
  try {
    switch(currentAction) {
      case 'approveRequest':
        await updateRequest(currentId, 'approved');
        break;
      case 'rejectRequest':
        await updateRequest(currentId, 'rejected');
        break;
      case 'approveDonation':
        await updateDonation(currentId, 'approved');
        break;
      case 'rejectDonation':
        await updateDonation(currentId, 'rejected');
        break;
      case 'deleteUser':
        await deleteUser(currentId);
        break;
    }
    closeModal();
  } catch (err) {
    console.error('Error executing action:', err);
    alert('Error executing action. Please try again.');
  }
}

window.onclick = function(event) {
  const modal = document.getElementById('confirmModal');
  if (event.target === modal) {
    closeModal();
  }
}

function showTab(tabName, event) {
  event.preventDefault();
  console.log(`Switching to tab: ${tabName}`);
  
  const panels = document.querySelectorAll('.tab-panel');
  panels.forEach(panel => {
    panel.classList.remove('active');
    console.log(`Removed active from: ${panel.id}`);
  });

  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  const selectedPanel = document.getElementById(`${tabName}-tab`);
  if (selectedPanel) {
    selectedPanel.classList.add('active');
    console.log(`Added active to: ${tabName}-tab`);
    
    switch(tabName) {
      case 'requests':
        loadRequests();
        break;
      case 'donations':
        loadDonations();
        break;
      case 'inventory':
        loadInventory();
        break;
      case 'users':
        loadUsers();
        break;
    }
  }

  if (event?.currentTarget) {
    event.currentTarget.classList.add('active');
  }
}

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}
