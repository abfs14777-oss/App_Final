const token = sessionStorage.getItem('token');
const user = JSON.parse(sessionStorage.getItem('user'));

if (!token || !user) {
    window.location.href = 'index.html';
} else {
    document.getElementById('welcomeMsg').textContent = DOMPurify.sanitize(`Hi, ${user.username}!`);
    
    if (user.role === 'admin') {
        document.getElementById('roleMsg').textContent = 'You are an Admin';
    } else if (user.role === 'manager') {
        document.getElementById('roleMsg').textContent = 'You are a Manager';
    } else {
        document.getElementById('roleMsg').textContent = 'You are a User';
    }
}