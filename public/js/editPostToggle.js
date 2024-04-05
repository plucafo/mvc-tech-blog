// const toggleEditPostForm = () => {
//   const editPostForm = document.getElementById('edit-post-form');
//   if (editPostForm.style.display === 'none') {
//     editPostForm.style.display = 'block';
//   } else {
//     editPostForm.style.display = 'none';
//   }
// };

const toggleEditPostForm = (postId) => {
  const editPostForm = document.getElementById(`edit-post-form-${postId}`);
  if (editPostForm) {
    if (editPostForm.style.display === 'none') {
      editPostForm.style.display = 'block';
    } else {
      editPostForm.style.display = 'none';
    }
  }
};