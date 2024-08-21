package com.business.analytics.api.repo;

import com.business.analytics.api.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Long> {
    // Custom query methods can be added here if needed
}

