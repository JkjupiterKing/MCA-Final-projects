package adaptive_competency_management_system.service;

import adaptive_competency_management_system.model.Document;
import adaptive_competency_management_system.model.Employee;
import adaptive_competency_management_system.repo.DocumentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepo documentRepo;

    public void uploadDocument(MultipartFile file, String documentType, Employee employee) throws IOException {

        Document document = new Document();
        document.setDocumentType(documentType);
        document.setFileName(file.getOriginalFilename());
        document.setFileType(file.getContentType());
        document.setUploadDate(new Date());
        document.setEmployee(employee);
        document.setFileData(file.getBytes());

        documentRepo.save(document);
    }

    public List<Document> getDocumentsByEmployeeId(Long employeeId) {
        return documentRepo.findByEmployeeEmployeeId(employeeId);
    }

    public List<Document> getAllDocuments() {
        return documentRepo.findAll();
    }
}
