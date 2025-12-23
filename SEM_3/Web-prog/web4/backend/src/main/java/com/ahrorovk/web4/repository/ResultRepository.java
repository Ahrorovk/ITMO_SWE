package com.ahrorovk.web4.repository;

import com.ahrorovk.web4.model.Result;
import com.ahrorovk.web4.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByUserOrderByTimeDesc(User user);
    Page<Result> findByUserOrderByTimeDesc(User user, Pageable pageable);
    void deleteByUser(User user);
}


