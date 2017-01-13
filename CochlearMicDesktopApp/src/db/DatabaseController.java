package db;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.*;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class DatabaseController {
 
	private MongoClientURI connectionString;
	private MongoClient mongoClient;
	private MongoDatabase database;
	private MongoCollection<Document> collection;
	
	//Initialise connection to database
	public DatabaseController(){
		connectionString = new MongoClientURI("mongodb://se6g13:gdp18@ds163758.mlab.com:63758/gdp");
		mongoClient = new MongoClient(connectionString);
		database = mongoClient.getDatabase("gdp");
		collection = database.getCollection("CITests");
	}
	
	
	//NEVER RUN THIS BEFORE GETTING THE INITIAL TEST DATA
	public void pushTestResult(int ciNumber, double[] testData, int outcome){

		
		if(collection.find(eq("_id", ciNumber)).first() == null){
			//No document found relating to this CI number, insert a new document for this CI
			
			//This makes sense to me. Good luck anyone else.
			Document newDoc = new Document();
			newDoc.append("_id", ciNumber);
			
			List<Document> testInfo = new ArrayList<Document>();
			Document testInfoDocument = new Document();
			testInfoDocument.append("date", Calendar.getInstance().getTime());
			testInfoDocument.append("frc", convertArrayToList(testData));
			testInfoDocument.append("outcome", outcome);
			testInfo.add(testInfoDocument);
			
			newDoc.append("tests", testInfo);
			collection.insertOne(newDoc);
		}else{
			//If there is an entry for this CI number, append to the existing test data
			collection.updateOne(new Document("_id", ciNumber), 
					new Document("$push", 
							new Document("tests", new Document("date", Calendar.getInstance().getTime())
									.append("frc", convertArrayToList(testData))
									.append("outcome", outcome))));
       }
	}
	
	public double[] getInitialTestData(int ciNumber){
		Document ciEntry = collection.find(eq("_id", ciNumber)).first();
		if(ciEntry == null){
			return null;
		}else{
			//Theres so much that could go wrong here...
			List<Document> dataList = (List<Document>) ciEntry.get("tests");
			return convertListToArray((List<Double>) dataList.get(0).get("frc"));
		}
	}
	
	
	public void shutdown(){
		mongoClient.close();
	}
	
	//Needed to store data in mongodb
	private List<Double> convertArrayToList(double[] data){
		List<Double> newData = new ArrayList<Double>();
		for(double d : data){
			newData.add(d);
		}
		return newData;
	}
	
	//Eugh...
	private double[] convertListToArray(List<Double> data){
		double[] newData = new double[data.size()];
		for(int i=0; i < newData.length; i++){
			newData[i] = data.get(i);
		}
		return newData;
	}
	
	
}
