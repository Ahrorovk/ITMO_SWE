package com.ahrorovk.database.service;

import com.ahrorovk.database.model.Result;
import com.ahrorovk.database.repository.ResultRepository;
import com.ahrorovk.database.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class ResultService implements ResultRepository {
    private static ResultService instance;

    private ResultService() {
    }

    public static ResultService getInstance() {
        return instance == null ? instance = new ResultService() : instance;
    }

    @Override
    public List<Result> findAll() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            List<Result> results = session.createQuery("from Result", Result.class).list();
            transaction.commit();
            return results;
        }
    }

    @Override
    public Result save(Result result) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.persist(result);
            transaction.commit();
            return result;
        }
    }

    @Override
    public void clear() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.createQuery("delete from Result").executeUpdate();
            transaction.commit();
        }
    }

    @Override
    public List<Result> findRange(int first, int pageSize) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            List<Result> results = session.createQuery("from Result", Result.class)
                    .setFirstResult(first)
                    .setMaxResults(pageSize)
                    .list();
            transaction.commit();
            return results;
        }
    }

    @Override
    public int count() {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            Long count = session.createQuery("select count(r) from Result r", Long.class).uniqueResult();
            transaction.commit();
            return count.intValue();
        }
    }
}
