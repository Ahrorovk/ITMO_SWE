package com.ahrorovk.managment.lazy;

import com.ahrorovk.database.model.Result;
import com.ahrorovk.database.service.ResultService;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import org.primefaces.model.FilterMeta;
import org.primefaces.model.LazyDataModel;
import org.primefaces.model.SortMeta;

import java.util.List;
import java.util.Map;

@Named("attemptsList")
@SessionScoped
public class ResultLazyDataModel extends LazyDataModel<Result> {
    private final ResultService resultService = ResultService.getInstance();
    
    @PostConstruct
    public void init() {
        // Устанавливаем общее количество записей
        this.setRowCount(resultService.count());
    }
    
    @Override
    public int count(Map<String, FilterMeta> filterBy) {
        return resultService.count();
    }

    @Override
    public List<Result> load(int first, int pageSize, Map<String, SortMeta> sortBy, Map<String, FilterMeta> filterBy) {
        // Обновляем количество записей перед загрузкой
        this.setRowCount(resultService.count());
        return resultService.findRange(first, pageSize);
    }
    
    // Метод для получения всех результатов (для не-lazy таблицы)
    public List<Result> getAllResults() {
        return resultService.findAll();
    }
}
