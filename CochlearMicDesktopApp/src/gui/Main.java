package gui;

import java.io.IOException;

import javax.swing.JLabel;
import javax.swing.JTextField;
import javax.swing.JToggleButton;

import ciTest.CITest;
import db.DatabaseController;
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
    	/*TODO - VALIDATION FOR CI INPUT
    	*	-No String
    	*	-Not empty
    	*	-Just numbers
    	*/
    	int ciNumber = Integer.parseInt(ciField.getText());

    	String ear = "";
    	if(right.isSelected()){
    		ear = "R";
    	}else if(left.isSelected()){
    		ear = "L";
    	}

    	if(ear.length() == 0){
    		this.setOutcomeText("Please select which implant you are testing (left/ right)");
    	}else{

    		double[] frcData = CITest.performTest();

    		DatabaseController dbc = new DatabaseController();
    		double[] initialTest = dbc.getInitialTestData(ciNumber);
    		if(initialTest == null) {
    			dbc.pushTestResult(ciNumber, frcData, -1, ear);
    			dbc.shutdown();
    			setOutcomeText("Intial test saved");
    		} else {
    			boolean testOutcome = CITest.compare(initialTest, frcData);
    			if(testOutcome) {
    				dbc.pushTestResult(ciNumber, frcData, 1, ear);
    				dbc.shutdown();
    				setOutcomeText("Test passed");
    			} else {
    				dbc.pushTestResult(ciNumber, frcData, 0, ear);
    				dbc.shutdown();
    				setOutcomeText("Test failed, please try again");
    			}
    		}
    	}
    	

    }
    
    
    public void setOutcomeText(String text){
    	outcomeLabel.setText(text);
    
    }

    public static void main(String[] args) {
        launch(args);
    }
}
