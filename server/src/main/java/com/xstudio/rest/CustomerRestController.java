package com.xstudio.rest;

import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.xstudio.config.security.SecurityContextUtil;
import com.xstudio.crm.model.Customer;
import com.xstudio.crm.service.ICustomerService;
import com.xstudio.rest.vo.CustomerPool;
import com.xstudio.rest.vo.CustomerVo;
import com.xstudio.spring.mybatis.ant.PageRequest;
import com.xstudio.spring.mybatis.ant.PageResponse;
import com.xstudio.spring.mybatis.rest.AbstractMybatisPaginatorRestController;
import com.xstudio.tool.enums.EnError;
import com.xstudio.tool.service.IAbstractService;
import com.xstudio.tool.utils.BeanMapper;
import com.xstudio.tool.utils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("api/customer")
public class CustomerRestController extends AbstractMybatisPaginatorRestController<CustomerVo, Long> {
    @Autowired
    private ICustomerService customerService;

    @Override
    public Msg<PageResponse<CustomerVo>> table(CustomerVo record, PageRequest pageRequest, HttpServletRequest request, HttpServletResponse response) {
        record.setPrincipalId(SecurityContextUtil.userId());
        return super.table(record, pageRequest, request, response);
    }

    @PreAuthorize("hasRole('admin')")
    @Override
    public Msg<Boolean> delete(Long id, HttpServletRequest request, HttpServletResponse response) {
        return super.delete(id, request, response);
    }

    @PreAuthorize("hasRole('admin')")
    @Override
    public Msg<Integer> delete(CustomerVo object) {
        return super.delete(object);
    }

    /**
     * 公海
     *
     * @param object
     * @param pageRequest
     * @param request
     * @param response
     * @return
     */
    @GetMapping(value = {"pool"})
    public Msg<PageResponse<CustomerPool>> pool(CustomerVo object, PageRequest pageRequest, HttpServletRequest request, HttpServletResponse response) {
        Msg<PageResponse<CustomerPool>> msg = new Msg<>();
        PageRequest webRequest = new PageRequest(pageRequest);
        object.setPrincipalId(0L);
        Msg<? extends List<Customer>> list = customerService.fuzzySearchByPager(object, webRequest.getPageBounds());
        if (!list.getSuccess()) {
            msg.setResult(EnError.NO_MATCH);
            return msg;
        }

        PageResponse<CustomerPool> pageResponse = new PageResponse<>();
        List<CustomerPool> customerVos = BeanMapper.mapList(list.getData(), CustomerPool.class);
        pageResponse.setList(customerVos);
        msg.setData(pageResponse);
        return msg;
    }

    /**
     * 领取
     *
     * @param record
     * @return
     */
    @PostMapping(value = {"lingqu"})
    public Msg<String> lingqu(@RequestBody CustomerVo record) {
        return customerService.lingqu(record.getCustomerId(), SecurityContextUtil.userId());
    }

    /**
     * 本周待跟进
     *
     * @return
     */
    @GetMapping("thisweek")
    public Msg<PageResponse<Customer>> thisWeek(PageRequest request) {
        Msg<PageResponse<Customer>> msg = new Msg<>();
        Msg<PageList<Customer>> list = customerService.thisWeekNeedFollowup(SecurityContextUtil.userId(), request.getPageBounds());
        if (!list.getSuccess()) {
            msg.setResult(EnError.NO_MATCH);
            return msg;
        }

        PageResponse<Customer> pageResponse = new PageResponse<>();
        pageResponse.setList(list.getData());
        msg.setData(pageResponse);
        return msg;
    }

    /**
     * 本周待跟进
     *
     * @return
     */
    @GetMapping("nonFollowup")
    public Msg<PageResponse<Customer>> longTimeNoFollowup(Integer month, PageRequest request) {
        if (null == month) {
            month = 1;
        }
        Msg<PageResponse<Customer>> msg = new Msg<>();
        Msg<PageList<Customer>> list = customerService.longTimeNoFollowupByMonth(SecurityContextUtil.userId(), month, request.getPageBounds());
        if (!list.getSuccess()) {
            msg.setResult(EnError.NO_MATCH);
            return msg;
        }

        PageResponse<Customer> pageResponse = new PageResponse<>();
        pageResponse.setList(list.getData());
        msg.setData(pageResponse);
        return msg;
    }

    @Override
    public IAbstractService getService() {
        return customerService;
    }
}

