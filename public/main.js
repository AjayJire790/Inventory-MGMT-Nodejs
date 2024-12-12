function deleteProduct(id) {
  const result = confirm("Are you sure you want to delete this product?");
  if (result) {
    fetch("/delete-product" + id, { method: "post" }).then((res) => {
      if (res.ok) {
        location.reload();
      }
    });
  }
}
function logout() {
  const result = confirm("Are you sure you want to log out?");
  if (result) {
    fetch("/logout", { method: "post" })
      .then((res) => {
        if (res.ok) {
          window.location.href = "/login";
        } else {
          alert("Failed to logout, Please try again.");
        }
      })
      .catch((err) => {
        console.log("Error during logout:" + err);
        alert("An error occurred. Please try again.");
      });
  }
}
