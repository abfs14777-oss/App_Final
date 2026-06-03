const token = sessionStorage.getItem('token');
const user = JSON.parse(sessionStorage.getItem('user'));

if (!token || !user) {
    window.location.href = 'index.html';
} else {
    document.getElementById('welcomeMsg').textContent = `Hi, ${user.username}!`;
    document.getElementById('roleMsg').textContent = `Role: ${user.role}`;
}