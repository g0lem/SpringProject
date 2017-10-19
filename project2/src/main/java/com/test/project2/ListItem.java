package com.test.project2;

public class ListItem {

    String value;
    Boolean checked;

    public ListItem(){ this.value = ""; this.checked = false;}

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Boolean getChecked() {
        return checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }


}
