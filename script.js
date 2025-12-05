const apiURL = 'https://www.googleapis.com/books/v1/volumes?q=';
const container = document.getElementById('container');
const searchInput = document.getElementById('ip');
const searchBtn = document.getElementById('btn');

async function fetchBooks(query) {
    if (!query) {
        container.innerHTML = '<p style="text-align:center;">Please enter a search term.</p>';
        return;
    }

    try {
        const response = await fetch(`${apiURL}${encodeURIComponent(query)}`);
        const data = await response.json();
        displayBooks(data.items);
    } catch (error) {
        console.error('Error fetching books:', error);
        container.innerHTML = '<p style="color:red; text-align:center;">Failed to fetch books. Please try again.</p>';
    }
}

function displayBooks(books) {
    container.innerHTML = '';
    if (!books || books.length === 0) {
        container.innerHTML = '<p style="text-align:center;">No books found.</p>';
        return;
    }

    books.forEach((book) => {
        const info = book.volumeInfo;
        const title = info.title || 'N/A';
        const authors = info.authors ? info.authors.join(', ') : 'N/A';
        const publisher = info.publisher || 'N/A';
        const publishedDate = info.publishedDate || 'N/A';
        const thumbnail = info.imageLinks ? info.imageLinks.thumbnail : 'https://via.placeholder.com/128x200?text=No+Image';
        const infoLink = info.infoLink || '#';

        const bookCard = document.createElement('div');
        bookCard.className = 'bookCard';

        bookCard.innerHTML = `
            <div class="img">
                <img src="${thumbnail}" alt="${title}">
            </div>
            <div class="data">
                <p><span>Title:</span> ${title}</p>
                <p><span>Author:</span> ${authors}</p>
                <p><span>Publisher:</span> ${publisher}</p>
                <p><span>Publish Date:</span> ${publishedDate}</p>
            </div>
        `;

        bookCard.style.cursor = 'pointer';
        bookCard.addEventListener('click', () => {
            window.open(infoLink, '_blank'); 
        });

        container.appendChild(bookCard);
    });
}

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) fetchBooks(query);
    else alert("Enter the book name!!");
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) fetchBooks(query);
    }
});

container.innerHTML = '';