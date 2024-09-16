package adaptive_competency_management_system.controller;

import adaptive_competency_management_system.model.Document;
import adaptive_competency_management_system.model.Employee;
import adaptive_competency_management_system.repo.DocumentRepo;
import adaptive_competency_management_system.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/documents")
@CrossOrigin
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @Autowired
    private DocumentRepo documentRepo;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadDocument(@RequestBody MultipartFile file, String documentType, Long employeeId) {

        System.out.println("file = " + file);
        try {
            // Assuming you have a method to find an employee by ID
            Employee employee = new Employee(); // Retrieve the actual employee from your service or repository
            // employee = employeeRepository.findById(employeeId).orElseThrow(() -> new RuntimeException("Employee not found"));
            employee.setEmployeeId(employeeId);
            documentService.uploadDocument(file,documentType, employee);
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Document> getDocument(@PathVariable Long id) {
        return documentRepo.findById(id)
                .map(document -> ResponseEntity.ok().body(document))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/file/{id}")
    public ResponseEntity<byte[]> getFileOnly(@PathVariable Long id) {
        return documentRepo.findById(id)
                .map(document -> ResponseEntity.ok().body(document.getFileData()))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Document>> getAllDocuments() {
        List<Document> documents = documentService.getAllDocuments();
        return ResponseEntity.ok(documents);
    }

    @GetMapping("/files/{employeeId}")
    public ResponseEntity<List<Document>> getDocumentsByEmployeeId(@PathVariable Long employeeId) {
        List<Document> documents = documentService.getDocumentsByEmployeeId(employeeId);
        if (documents.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(documents);
        }
        return ResponseEntity.ok(documents);
    }
}
