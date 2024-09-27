document.addEventListener("DOMContentLoaded", function () {
  // Mock data (in a real scenario, this could come from an API or localStorage)
  const urlParams = new URLSearchParams(window.location.search);
  const studentName = urlParams.get("studentName") || "John Doe";
  const courseName = urlParams.get("courseName") || "JavaScript Basics";
  const completionDate =
    urlParams.get("completionDate") || new Date().toLocaleDateString();

  // Set the values in the certificate
  document.getElementById("studentName").textContent = studentName;
  document.getElementById("courseName").textContent = courseName;
  document.getElementById("completionDate").textContent = completionDate;

  // Print functionality
  document.getElementById("printButton").addEventListener("click", function () {
    window.print();
  });
});
