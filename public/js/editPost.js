// Add event listeners for edit post button and save changes button
document.addEventListener('DOMContentLoaded', () => {
    const editPostBtns = document.querySelectorAll('.edit-btn');
    const saveBtn = document.querySelector('.save-btn');
  
    editPostBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        toggleEditPostForm();
        const postId = btn.dataset.postId; // Assuming you have a data attribute to store post ID
        const title = btn.dataset.title; // Assuming you have a data attribute to store post title
        const content = btn.dataset.content; // Assuming you have a data attribute to store post content
  
        // Populate the edit form with post data
        document.getElementById('edit-title').value = title;
        document.getElementById('edit-content').value = content;
  
        // Set the form action to the correct post ID
        document.getElementById('edit-post-form').action = `/api/posts/${postId}`;
      });
    });
  
    saveBtn.addEventListener('click', async (e) => {
      e.preventDefault();
  
      const form = document.getElementById('edit-post-form');
      const formData = new FormData(form);
  
      try {
        const response = await fetch(form.action, {
          method: 'PUT',
          body: formData,
        });
  
        if (response.ok) {
          // Reload the page or show a success message
          window.location.reload(); // Example: reload the page after successful update
        } else {
          const errorData = await response.json();
          console.error('Error:', errorData.message);
          // Handle error response (e.g., display error message to the user)
        }
      } catch (err) {
        console.error('Error:', err);
        // Handle network errors
      }
    });
  });