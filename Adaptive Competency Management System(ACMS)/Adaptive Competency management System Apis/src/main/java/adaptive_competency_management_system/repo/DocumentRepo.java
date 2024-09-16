package adaptive_competency_management_system.repo;

import adaptive_competency_management_system.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepo extends JpaRepository<Document, Long> {
    List<Document> findByEmployeeEmployeeId(Long employeeId);
}

