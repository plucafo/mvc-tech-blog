// script to show the new-post-form when the new-post-btn is clicked MOVE TO JS FOLDER
document.getElementById("new-post-btn").addEventListener("click", () => {
  const form = document.getElementById("new-post-form");
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
});

// show the edit-post-form when the edit-post-btn is clicked
document.getElementById('edit-btn').addEventListener('click', () => {
  const form = document.getElementById('edit-form');
  if (form.style.display === 'none' || form.style.display === '') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
})