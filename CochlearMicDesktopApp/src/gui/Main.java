package gui;

import java.io.IOException;

import javax.swing.JLabel;
import javax.swing.JTextField;
import javax.swing.JToggleButton;

import ciTest.CITest;
import javafx.application.Application;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.control.ToggleButton;
import javafx.scene.control.ToggleGroup;
import javafx.stage.Stage;


public class Main extends Application {

	@FXML
	private Label outcomeLabel;
	@FXML
	private ToggleGroup tg1;
	@FXML
	private ToggleButton left;
	@FXML
	private ToggleButton right;
	@FXML
	private TextField ciField;

    @Override
    public void start(Stage primaryStage){
		try {
			Parent root = FXMLLoader.load(getClass().getResource("home.fxml"));
			primaryStage.setTitle("Implant Testing");
	        primaryStage.setScene(new Scene(root));
	        primaryStage.show();
		} catch (IOException e) {
			// TODO not happening
			System.out.println("OH MY GOD SOMETHING TERRIBLE HAS HAPPENED");
			e.printStackTrace();
		}
        

    }

    public void beginTest() {
    	//int ciNumber = Integer.parseInt(ciField.getText());

    	String ear = "";
		if(right.isSelected()){
    		ear = "R";
		}else if(left.isSelected()){
			ear = "L";
		}
    	
		if(ear.length() == 0){
    		this.setOutcomeText("Please select which implant you are testing (left/ right)");
		}else{
        	//int outcome = CITest.performTest(ciNumber);
            //System.out.println("outcome of test: "+outcome);
		}
    	

    }
    
    
    public void setOutcomeText(String text){
    	outcomeLabel.setText(text);
    
    }

    public static void main(String[] args) {
        launch(args);
    }
}
