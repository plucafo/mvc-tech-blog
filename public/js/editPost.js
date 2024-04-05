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