package com.supplychainmanagement.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.supplychainmanagement.model.PurchaseOrders;

@Repository
public interface PurchaseOrdersRepo extends JpaRepository<PurchaseOrders, Long>{

}