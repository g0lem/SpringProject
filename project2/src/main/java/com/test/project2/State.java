package com.test.project2;

import java.util.ArrayList;
import java.util.List;

public class State {

    String value;
    List<ListItem> list;

    public State() {
        this.value = "";
        this.list = new ArrayList<ListItem>();
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public List<ListItem> getList() {
        return list;
    }

    public void setList(List<ListItem> list) {
        this.list = list;
    }



}