package sample;

import db.DatabaseController;
import javafx.application.Application;
import javafx.beans.property.ReadOnlyStringWrapper;
import javafx.beans.value.ObservableValue;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.chart.LineChart;
import javafx.scene.chart.NumberAxis;
import javafx.scene.chart.XYChart;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.Pane;
import javafx.scene.layout.VBox;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;
import javafx.util.Callback;

public class Main extends Application {

    @FXML
    Pane initialRecording;
    @FXML
    Pane currentRecording;
    @FXML
    VBox content;

    private static Stage primaryStage;
    private int counter = 0;
    ObservableList<CI> data = FXCollections.observableArrayList();


    @Override
    public void start(Stage primaryStage) throws Exception{
        Parent root = FXMLLoader.load(getClass().getResource("home-page.fxml"));
        Scene mainScene = new Scene(root, 982, 687);
        this.primaryStage = primaryStage;
        primaryStage.setTitle("Cochlear Implant - Clinical Application");
        primaryStage.setScene(mainScene);
        primaryStage.show();
    }


    public static void main(String[] args) {
        launch(args);
    }

    public void createChart() throws Exception{

        final NumberAxis xAxis = new NumberAxis("Some Data annotation", 200, 8000, 10.5);
        xAxis.setTickLabelRotation(90d);
        xAxis.setAnimated(true);
        final NumberAxis yAxis = new NumberAxis();

        //creating the chart
        final LineChart<Number,Number> lineChart =
                new LineChart<Number,Number>(xAxis,yAxis);

        lineChart.setTitle("Recordings");
        //612 428
        lineChart.setMinHeight(558);
        lineChart.setMaxHeight(558);
        lineChart.setMinWidth(630);
        lineChart.setMaxWidth(630);
        //defining a series
        XYChart.Series series = new XYChart.Series();
        XYChart.Series series2 = new XYChart.Series();
        series.setName("Initial recording");
        series2.setName("Current recording");
        lineChart.setStyle(".default-color0.chart-series-line { -fx-stroke: #e9967a; }");
        //populating the series with data


        DatabaseController db = new DatabaseController();

        for(Integer CI_number: db.getFaulty()) {
            double[] initialArr = db.getInitialTestData(CI_number);
            double[] lastArr = db.getLastTest(CI_number);
            for(int i=0; i<initialArr.length; i++) {
                series.getData().add(new XYChart.Data(200+i, initialArr[i]));
                series2.getData().add(new XYChart.Data(200+i, lastArr[i]));
            }
        }
        db.shutdown();

        this.initialRecording.getChildren().add(lineChart);
        lineChart.getData().add(series);
        lineChart.getData().add(series2);
        lineChart.setCreateSymbols(false);
    }

    public void generateRecordings() {
        if(!data.isEmpty()) {
            return;
        }
        DatabaseController db = new DatabaseController();
        System.out.print(db.getFaulty().size());
        for(Integer CI_number: db.getFaulty()) {
            double[] initialArr = db.getInitialTestData(CI_number);
            double[] lastArr = db.getLastTest(CI_number);
            for (int i = 0; i < initialArr.length; i++) {
                CI current = new CI(CI_number.toString(), "L");
                data.add(current);
            }
        }
        TableView<CI> table = new TableView<CI>();
        TableColumn firstNameCol = new TableColumn("CI");
        TableColumn firstNameCol2 = new TableColumn("Faulty");
        TableColumn firstNameCol3 = new TableColumn("Test3");
        firstNameCol.prefWidthProperty().bind(table.widthProperty().multiply(0.41));
        firstNameCol2.prefWidthProperty().bind(table.widthProperty().multiply(0.5));



        //CI number = left
        firstNameCol.setCellValueFactory(new PropertyValueFactory<CI, String>("left"));

        //Faulty implant = right
        firstNameCol2.setCellValueFactory(new PropertyValueFactory<CI, String>("right"));


        table.getColumns().addAll(firstNameCol, firstNameCol2);
        table.setItems(data);
        content.getChildren().add(table);

        table.getSelectionModel().selectedItemProperty().addListener((observable, oldValue, newValue) -> {
            if(newValue == null) {
                return;
            }
            System.out.println(" <-> " + newValue.getLeft());
            try {
                this.createChart();
            } catch (Exception e) {

            }
        });
    }
}
