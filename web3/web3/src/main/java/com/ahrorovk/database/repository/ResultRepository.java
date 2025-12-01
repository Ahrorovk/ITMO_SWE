package com.ahrorovk.database.repository;

import com.ahrorovk.database.model.Result;

import java.util.List;

public interface ResultRepository {
    List<Result> findAll();
    Result save(Result result);
    void clear();

    List<Result> findRange(int first, int pageSize);

    int count();
}