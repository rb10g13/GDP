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
import javafx.scene.paint.Color;
import javafx.scene.text.TextAlignment;
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
        int ciNumber;

    	try {
    	    ciNumber = Integer.parseInt(ciField.getText());
    	    
    	    //Checks if input is negative
    	    if(Math.signum(ciNumber) < 0){
                this.setOutcomeText("Your CI number must be positive. Please try again (Numbers(0-9) can be used only).");
    	    }
        } catch(NumberFormatException e) {
            this.setOutcomeText("Your CI number is of incorrect format. Please try again (Numbers(0-9) can be used only).");
            return;
        }

    	String ear = "";
    	if(right.isSelected()){
    		ear = "R";
    	}else if(left.isSelected()){
    		ear = "L";
    	}

    	if(ear.length() == 0){
    		this.setOutcomeText("Please select the implant you are testing (left/right)");
    	}else{

    		double[] frcData = CITest.performTest();

    		DatabaseController dbc = new DatabaseController();
    		double[] initialTest = dbc.getInitialTestData(ciNumber);
    		if(initialTest == null) {
    			dbc.pushTestResult(ciNumber, frcData, -1, ear);
    			dbc.shutdown();
    			setOutcomeText("Initial test saved. You can now close this window. Thank you!");
    		} else {
    			boolean testOutcome = CITest.compare(initialTest, frcData);
    			if(testOutcome) {
    				dbc.pushTestResult(ciNumber, frcData, 1, ear);
    				dbc.shutdown();
    				setOutcomeText("Test passed. You can now close this window. Thank you!");
    			} else {
    				dbc.pushTestResult(ciNumber, frcData, 0, ear);
    				dbc.shutdown();
    				setOutcomeText("Test failed. Your Clinic will contact you shortly. You can now close this window. Thank you!");
    			}
    		}
    	}
    }
    
    
    public void setOutcomeText(String text){
    	outcomeLabel.setText(text);
        outcomeLabel.setWrapText(true);
        outcomeLabel.setTextAlignment(TextAlignment.CENTER);
        outcomeLabel.setTextFill(Color.RED);


    }

    public static void main(String[] args) {
        launch(args);
    }
}
