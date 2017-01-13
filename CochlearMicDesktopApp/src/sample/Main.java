package sample;

import ciTest.CITest;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class Main extends Application {

    private static Stage primaryStage;
    private int ciNumber;
    private int outcome;

    @Override
    public void start(Stage primaryStage) throws Exception{
        this.primaryStage = primaryStage;
        Parent root = FXMLLoader.load(getClass().getResource("home-page.fxml"));
        primaryStage.setTitle("Hello World");
        primaryStage.setScene(new Scene(root, 500, 475));
        primaryStage.show();

    }

    public void setUpPage() throws Exception{
        Parent root = FXMLLoader.load(getClass().getResource("set-up-page.fxml"));
        primaryStage.setScene(new Scene(root, 500, 475));
    }

    public void beginPage() throws Exception{
        Parent root = FXMLLoader.load(getClass().getResource("begin-test-page.fxml"));
        primaryStage.setScene(new Scene(root, 500, 475));
    }

    public void progressPage() throws Exception{
        Parent root = FXMLLoader.load(getClass().getResource("progress-page.fxml"));
        primaryStage.setScene(new Scene(root, 500, 475));
    }

    public void outComePage() throws Exception{
        Parent root = FXMLLoader.load(getClass().getResource("success-page.fxml"));
        primaryStage.setScene(new Scene(root, 500, 475));
    }

    public void beginTest() throws Exception{
        progressPage();
        outcome = CITest.performTest(ciNumber);
    }

    public static void main(String[] args) {
        launch(args);
    }
}
