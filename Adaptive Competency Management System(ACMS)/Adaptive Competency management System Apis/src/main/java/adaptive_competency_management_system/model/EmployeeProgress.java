package adaptive_competency_management_system.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Entity
@Table(name = "employee_progress")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class EmployeeProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "progress_id")
    private Long progressId;

    @ManyToOne
    @JoinColumn(name = "enrollment_id")
    private Enrollment enrollment;
    
    @Column(name = "completion_status")
    private Boolean completionStatus;

    @Column(name = "completion_date")
    private Date completionDate;

}

