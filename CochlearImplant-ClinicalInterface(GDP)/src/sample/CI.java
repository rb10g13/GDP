package sample;

import javafx.beans.property.SimpleStringProperty;

public class CI {

    public SimpleStringProperty ci;
    public SimpleStringProperty right;

    public CI(String ci, String right) {
        this.ci = new SimpleStringProperty(ci);
        this.right = new SimpleStringProperty(right);
    }


    //represents the CI Number
    public String getLeft() {
        return this.ci.get();
    }

    //represents the Faulty implant
    public String getRight() {
        return this.right.get();
    }
}
