document.getElementById('fileInput').addEventListener('click', function(event) {
    const responseMessage = document.getElementById('responseMessage');
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        console.log(file);
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const img = document.getElementById('displayImage');
                img.src = e.target.result;
            }
            
            reader.readAsDataURL(file);
        }
        fetch('/api/data', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            responseMessage.textContent = JSON.stringify(data)
            console.log('Success:', data);
            alert('Data sent to the server!');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    input.click();
});

document.getElementById('resetButton').addEventListener('click', function() {
    const img = document.getElementById('displayImage');
    img.src = '/static/images/cartoon-yellow-chicken.jpg';
});