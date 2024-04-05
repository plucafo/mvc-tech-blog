// handle edit buttons in user posts forms
document.addEventListener('DOMContentLoaded', () => {
  const editButtons = document.querySelectorAll('.edit-btn');

  editButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const postId = button.dataset.postId;

      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch post data');
        }

        const postData = await response.json();
        
        // Extract title and content from postData
        const { title, content } = postData;

        // Log title and content separately
        console.log("Post Title:", title);
        console.log("Post Content:", content);
        document.getElementById('edit-title').value = title;
        document.getElementById('edit-content').value = content;
        toggleEditPostForm();
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    });
  });
});


// handle save changed button in edit form
document.addEventListener('DOMContentLoaded', () => {
  const editForm = document.getElementById('edit-post-form');
  const postId = editForm.dataset.postId;

  editForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const editTitle = document.getElementById('edit-title').value;
    const editContent = document.getElementById('edit-content').value;

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ editTitle, editContent })
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      // Optionally handle success or redirect to another page
      console.log('Post updated successfully');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  });
});