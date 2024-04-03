// show the edit-post-form when the edit-post-btn is clicked
// document.getElementById('edit-post-btn').addEventListener('click', () => {
//     const form = document.getElementById('edit-post-form');
//     if (form.style.display === 'none' || form.style.display === '') {
//       form.style.display = 'block';
//     } else {
//       form.style.display = 'none';
//     }
//   });

const toggleEditPostForm = () => {
  const editPostForm = document.getElementById('edit-post-form');
  if (editPostForm.style.display === 'none') {
    editPostForm.style.display = 'block';
  } else {
    editPostForm.style.display = 'none';
  }
};