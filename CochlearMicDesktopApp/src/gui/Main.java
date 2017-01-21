package gui;

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
        Parent root = FXMLLoader.load(getClass().getResource("home.fxml"));
        primaryStage.setTitle("Implant Testing");
        primaryStage.setScene(new Scene(root));
        primaryStage.show();

    }

    public void setUpPage() throws Exception{
        Parent root = FXMLLoader.load(getClass().getResource("setup.fxml"));
        primaryStage.setScene(new Scene(root));
    }

    public void outComePage() throws Exception{
    	Parent root;
    	if(this.outcome == 1){
    		//Test passed
            root = FXMLLoader.load(getClass().getResource("success.fxml"));
    	}else if(this.outcome == 0){
    		//Test failed
            root = FXMLLoader.load(getClass().getResource("fail.fxml"));
    	}else if(this.outcome == -1){
    		//Initial test
            root = FXMLLoader.load(getClass().getResource("initStored.fxml"));
    	}else{
    		//Error
            root = FXMLLoader.load(getClass().getResource("tryAgain.fxml"));
    	}
        primaryStage.setScene(new Scene(root));
    }
    
    public void restart() throws Exception{
        Parent root = FXMLLoader.load(getClass().getResource("home.fxml"));
        primaryStage.setScene(new Scene(root));
    }

    public void beginTest() throws Exception{
        outcome = CITest.performTest(ciNumber);
        System.out.println("outcome of test: "+outcome);
    }

    public static void main(String[] args) {
        launch(args);
    }
}
