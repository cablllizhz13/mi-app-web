document.getElementById('dataForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        if (response.ok) {
            document.getElementById('message').innerText = 'Datos enviados exitosamente!';
        } else {
            document.getElementById('message').innerText = 'Error al enviar los datos.';
        }
    } catch (error) {
        document.getElementById('message').innerText = 'Error en la conexión.';
    }
});
