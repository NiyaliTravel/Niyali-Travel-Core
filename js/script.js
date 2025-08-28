document.addEventListener('DOMContentLoaded', () => {
    const discoverButton = document.querySelector('#hero button');
    if (discoverButton) {
        discoverButton.addEventListener('click', () => {
            alert('Discovering more about Niyali Travel!');
            // In a real application, this would navigate to another page or scroll to a section.
        });
    }
});