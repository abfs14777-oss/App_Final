const token = sessionStorage.getItem('token');
const user = JSON.parse(sessionStorage.getItem('user'));

if (!token || !user) {
    window.location.href = 'index.html';
} else {
    document.getElementById('welcomeMsg').textContent = DOMPurify.sanitize(`Hi, ${user.username}!`);
    document.getElementById('roleMsg').textContent = DOMPurify.sanitize(`Role: ${user.role}`);

    if (user.role === 'admin') {
        document.getElementById('actionArea').innerHTML = `
            <button id="actionBtn">View All Users</button>
            <div id="result"></div>
        `;
        document.getElementById('actionBtn').addEventListener('click', () => {
            fetch('/api/users/all-users', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(data => {
                const result = document.getElementById('result');
                result.innerHTML = '<h3>All Users:</h3>';
                data.users.forEach(u => {
                    const p = document.createElement('p');
                    p.textContent = DOMPurify.sanitize(`ID: ${u._id} | Role: ${u.role} | Joined: ${new Date(u.createdAt).toLocaleDateString()}`);
                    result.appendChild(p);
                });
            });
        });

    } else {
        document.getElementById('actionArea').innerHTML = `
            <button id="actionBtn">View My Profile</button>
            <div id="result"></div>
        `;
        document.getElementById('actionBtn').addEventListener('click', () => {
            fetch('/api/users/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(data => {
                const result = document.getElementById('result');
                result.innerHTML = DOMPurify.sanitize(`<p>ID: ${data.id}</p><p>Role: ${data.role}</p>`);
            });
        });
    }
}