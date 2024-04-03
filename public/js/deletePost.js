function deletePost(postId) {
    if (confirm("Are you sure you want to delete this post?")) {
      // Send a DELETE request using fetch API
      fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: postId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete post");
          }
          return response.json();
        })
        .then((data) => {
          // Post deleted successfully, you can handle the UI update here
          console.log("Post deleted successfully");
          // For example, you can remove the card from the UI
          document.getElementById(`delete-form-${postId}`).parentElement.parentElement.remove();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed to delete post");
        });
    }
  }