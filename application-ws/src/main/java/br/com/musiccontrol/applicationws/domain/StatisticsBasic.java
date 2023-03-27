package br.com.musiccontrol.applicationws.domain;

public class StatisticsBasic {

    private String field;
    private Integer value;

    public StatisticsBasic(String field, Integer value) {
        this.field = field;
        this.value = value;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }
}
