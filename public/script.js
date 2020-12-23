const weatherForm = document.querySelector('form');
const searchField = document.querySelector('input');
const m1 = document.querySelector('#m1');
const m2 = document.querySelector('#m2');
weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
    const address = searchField.value;
    m1.textContent='Loading....'
    m2.textContent = '';

	fetch(`http://localhost:3000/weather?address=${address}`).then((resp) => {
		resp.json().then((data) => {
			if (data.error) {
				return (m1.textContent = data.error);
			}
			m1.textContent = data.forecast;
			m2.textContent = data.location;
		});
	});
});
