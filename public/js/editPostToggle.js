const toggleEditPostForm = () => {
  const editPostForm = document.getElementById('edit-post-form');
  if (editPostForm.style.display === 'none') {
    editPostForm.style.display = 'block';
  } else {
    editPostForm.style.display = 'none';
  }
};