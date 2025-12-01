package com.ahrorovk.managment.lazy;

import com.ahrorovk.database.model.Result;
import com.ahrorovk.database.service.ResultService;
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
    @Override
    public int count(Map<String, FilterMeta> filterBy) {
        return ResultService.getInstance().count();
    }

    @Override
    public List<Result> load(int first, int pageSize, Map<String, SortMeta> sortBy, Map<String, FilterMeta> filterBy) {
        return ResultService.getInstance().findRange(first, pageSize);
    }
}
