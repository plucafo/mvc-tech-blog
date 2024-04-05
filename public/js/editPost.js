async function saveChanges(postId) {
  const editTitleInput = document.getElementById(`edit-title-${postId}`);
  const editContentTextarea = document.getElementById(`edit-content-${postId}`);

  const updatedTitle = editTitleInput.value.trim();
  const updatedContent = editContentTextarea.value.trim();

  // Perform validation if needed
  if (!updatedTitle || !updatedContent) {
    alert('Please enter both title and content.');
    return;
  }

  const postData = {
    title: updatedTitle,
    content: updatedContent
  };

  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    console.log('Post updated successfully:', data);
    window.location.reload();
  } catch (error) {
    console.error('There was a problem updating the post:', error);
    // Handle errors or display a message to the user
  }
}