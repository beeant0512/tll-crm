package com.xstudio;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author xiaobiao
 * @version 2019/6/6
 */
@Controller
public class AppWebIndexController {
    @RequestMapping("")
    public String index(){
        return "index";
    }
}
