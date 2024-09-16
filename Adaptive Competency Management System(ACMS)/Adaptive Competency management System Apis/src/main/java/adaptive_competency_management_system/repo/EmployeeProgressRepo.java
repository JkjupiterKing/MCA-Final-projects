package adaptive_competency_management_system.repo;

import adaptive_competency_management_system.model.EmployeeProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeProgressRepo extends JpaRepository<EmployeeProgress, Long> {
}
