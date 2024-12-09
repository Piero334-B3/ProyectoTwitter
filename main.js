// main.js
window.onload = function() {
    // Código actual al cargar la página
    console.log("Página cargada");
    
    // Recuperar el nombre de usuario e imagen de perfil al cargar la página
    const savedUsername = localStorage.getItem('username');
    const savedProfileImage = localStorage.getItem('profileImage');
    
    if (savedUsername && savedProfileImage) {
        document.getElementById('usernameDisplay').textContent = savedUsername;
        document.getElementById('profileImageDisplay').src = savedProfileImage;
    }
};



// Verificar si el usuario está autenticado
function verificarAutenticacion() {
    const email = localStorage.getItem('usuarioAutenticado');
    if (!email) {
        // Redirigir a la página de registro si no hay usuario autenticado
        window.location.href = '../registro.html'; // Cambia la ruta si es necesario
    }
}

// Llamar a la función al cargar la página
verificarAutenticacion();

document.querySelector('.tweet-box button').addEventListener('click', function() {
    const tweetText = document.querySelector('.tweet-box textarea').value;

    if (tweetText) {
        const tweet = document.createElement('div');
        tweet.classList.add('tweet');
        
        tweet.innerHTML = `
            <h3>Username</h3>
            <p>${tweetText}</p>
        `;

        document.querySelector('.feed').appendChild(tweet);
        document.querySelector('.tweet-box textarea').value = '';  // Limpia el campo
    }
});

// Código actual de tweets
console.log("Tweets cargados");

// Funcionalidad para agregar comentarios a tweets
document.getElementById('commentButton').addEventListener('click', function() {
    const commentText = document.getElementById('commentInput').value;
    const tweetId = this.getAttribute('data-tweet-id');  // Asumiendo que el botón de comentar tiene el ID del tweet
    let comments = JSON.parse(localStorage.getItem('comments')) || {};
    
    if (!comments[tweetId]) {
        comments[tweetId] = [];
    }
    comments[tweetId].push(commentText);
    
    localStorage.setItem('comments', JSON.stringify(comments));
    
    displayComments(tweetId);
});

function displayComments(tweetId) {
    const comments = JSON.parse(localStorage.getItem('comments')) || {};
    const commentSection = document.getElementById(`commentSection-${tweetId}`);
    
    commentSection.innerHTML = '';
    if (comments[tweetId]) {
        comments[tweetId].forEach(comment => {
            const commentElement = document.createElement('p');
            commentElement.textContent = comment;
            commentSection.appendChild(commentElement);
        });
    }
}

