package br.com.musiccontrol.applicationws.domain;

public class StatisticsBasic {

    private String field;
    private Long value;

    public StatisticsBasic(String field, Long value) {
        this.field = field;
        this.value = value;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return String.format(
                "Statistic:\n" +
                        "field: %s\n" +
                        "value: %d\n",
                this.field, this.value
        );
    }
}
