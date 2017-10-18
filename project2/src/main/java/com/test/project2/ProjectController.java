package com.test.project2;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjectController {

    @RequestMapping("/")
    public String something(){

        return "merge";

    }


}
