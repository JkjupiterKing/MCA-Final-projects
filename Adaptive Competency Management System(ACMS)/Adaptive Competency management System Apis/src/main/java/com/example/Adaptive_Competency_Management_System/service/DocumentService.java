package com.example.Adaptive_Competency_Management_System.service;

import com.example.Adaptive_Competency_Management_System.model.Document;
import com.example.Adaptive_Competency_Management_System.model.employee;
import com.example.Adaptive_Competency_Management_System.repo.documentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class DocumentService {

    @Autowired
    private documentRepo documentRepo;

    public void uploadDocument(MultipartFile file, String documentType, employee employee) throws IOException {

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
