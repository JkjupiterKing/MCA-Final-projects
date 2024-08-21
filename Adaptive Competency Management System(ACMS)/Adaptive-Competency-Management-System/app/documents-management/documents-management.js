$('#mySidenav').load('../common/sidenav.html');

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('documentUploadForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission

      var formData = new FormData();
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      if (currentUser && currentUser.employeeId) {
          // Retrieve values from form inputs
          const documentType = document.getElementById('select').value; // Select element for document type
          const documentFile = document.getElementById('documentFile').files[0]; // File input for document file

          // Check if both documentType and documentFile are provided
          if (documentType && documentFile) {
              formData.append('file', documentFile); // Key should match the backend expectation
              formData.append('documentType', documentType);
              formData.append('employeeId', currentUser.employeeId);

              // Log the form data for debugging
              console.log('Form Data:');
              for (var pair of formData.entries()) {
                  console.log(pair[0] + ': ' + pair[1]);
              }

              // Make API request to upload the document
              var xhr = new XMLHttpRequest();
              xhr.open('POST', 'http://localhost:8080/documents/upload', true);

              xhr.onload = function() {
                  if (xhr.status === 200) {
                      alert('Document uploaded successfully!');
                      fetchUploadedDocuments(); // Refresh the list of uploaded documents
                      // window.location.reload(); // Removed to avoid unnecessary reload
                  } else {
                      console.error('Error uploading document:', xhr.statusText);
                      alert('Failed to upload document. Server responded with: ' + xhr.statusText);
                  }
              };

              xhr.onerror = function() {
                  console.error('Network error while uploading document.');
                  alert('Failed to upload document. Please check the console for details.');
              };

              xhr.send(formData);
          } else {
              alert('Please select a document type and file.');
          }
      } else {
          console.error('No employee ID found in localStorage.');
          alert('Failed to upload document. No employee ID found.');
      }
  });

  function fetchUploadedDocuments() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const employeeId = currentUser ? currentUser.employeeId : null;
    const documentsList = document.getElementById('documentsList');

    // Set the initial message
    documentsList.innerHTML = '<p>Loading documents...</p>';

    if (!employeeId) {
        console.error('No employee ID found in localStorage.');
        documentsList.innerHTML = '<p>No employee ID found in localStorage.</p>';
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:8080/documents/files/${employeeId}`, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                // Parse the JSON response to get the list of documents
                var response = JSON.parse(xhr.responseText);

                if (response.length === 0) {
                    documentsList.innerHTML = '<p>No documents found for this employee.</p>';
                } else {
                    documentsList.innerHTML = ''; // Clear existing content

                    response.forEach(function(document) {
                        const fileData = document.fileData; // Base64 encoded string
                        const fileName = document.fileName || 'document';
                        const documentType = document.documentType || 'application/octet-stream'; // Default MIME type

                        // Create document preview HTML
                        let documentHtml = '';
                        if (documentType.startsWith('image/')) {
                            // If it's an image, display it as an image tag
                            documentHtml = `
                                <div class="col-md-4 mb-4">
                                    <div class="card">
                                        <img src="data:${documentType};base64,${fileData}" class="card-img-top" alt="${fileName}" style="width:100%; height:auto;">
                                        <div class="card-body">
                                            <h5 class="card-title">${fileName}</h5>
                                            <p class="card-text">${documentType}</p>
                                            
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else if (documentType === 'application/pdf') {
                            // If it's a PDF, display it in an iframe
                            documentHtml = `
                                <div class="col-md-4 mb-4">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">${fileName}</h5>
                                            <p class="card-text">${documentType}</p>
                                            
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else {
                            // For other types, provide a generic view or download link
                            documentHtml = `
                                <div class="col-md-4 mb-4">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">${fileName}</h5>
                                            <p class="card-text">${documentType}</p>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }

                        documentsList.innerHTML += documentHtml;
                    });
                }
            } catch (e) {
                console.error('Error parsing documents response:', e);
                documentsList.innerHTML = '<p>Error parsing documents response.</p>';
            }
        } else {
            console.error('Error fetching documents:', xhr.statusText);
            documentsList.innerHTML = '<p>No documnets found</p>';
        }
    };

    xhr.onerror = function() {
        console.error('Network error while fetching documents.');
        documentsList.innerHTML = '<p>Network error while fetching documents. Please check the console for details.</p>';
    };

    xhr.onabort = function() {
        console.error('Request aborted.');
        documentsList.innerHTML = '<p>Request aborted.</p>';
    };

    xhr.ontimeout = function() {
        console.error('Request timed out.');
        documentsList.innerHTML = '<p>Request timed out.</p>';
    };

    xhr.timeout = 5000; // Set a timeout for the request (e.g., 5 seconds)

    xhr.send();
}

function viewDocument(base64Data, documentType) {
  // Decode base64 data
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Create a Blob from the byteArray
  const blob = new Blob([byteArray], { type: documentType });
  const blobUrl = URL.createObjectURL(blob);

  // Open the Blob URL in a new tab
  window.open(blobUrl, '_blank');
}

  // Fetch and display documents when the page loads
  fetchUploadedDocuments();
});

