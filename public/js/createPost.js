document.getElementById('create-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('new-post-content').value.trim();

    if (title && content) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        document.location.reload(); // Reload the page after successful submission
      } else {
        alert('Failed to create post');
      }
    } else {
      alert('Please fill in all fields');
    }
  });