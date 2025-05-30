const form = document.getElementById('inquiryForm');
const modal = document.getElementById('successModal');
const closeBtn = document.getElementById('closeModal');

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    fetch(form.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } })
        .then(res => {
            if (res.ok) {
                modal.style.display = 'flex';
                return res.json().catch(() => null);
            }
            throw new Error('Network response was not ok');
        })
        .catch(err => {
            alert('There was a problem sending your inquiry.');
            console.error(err);
        });
});

closeBtn.addEventListener('click', () => { modal.style.display = 'none'; form.reset(); });
window.addEventListener('click', e => { if (e.target === modal) { modal.style.display = 'none'; form.reset(); } });
