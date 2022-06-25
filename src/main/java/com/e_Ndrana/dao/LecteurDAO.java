package com.e_Ndrana.dao;


import com.e_Ndrana.beans.Lecteur;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public class LecteurDAO {
    public static ArrayList<Lecteur> getAllLecteur(){
        ArrayList<Lecteur> allLecteur = new ArrayList<>();
        Connection connection = connectToDatabase.getInstance();
        String query = "SELECT * from Lecteur ORDER BY Id desc";
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);
            Lecteur lecteur;
            while (resultSet.next()){
                lecteur = new Lecteur(resultSet.getInt("Id"), resultSet.getString("Nom_Lecteur"), resultSet.getString("Fonction"), resultSet.getString("Email"), resultSet.getString("Mobile"), resultSet.getInt("NbPretEnCours"), resultSet.getInt("NbFoisPret"), resultSet.getInt("Amende_Lecteur"));
                allLecteur.add(lecteur);
            }
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
        return allLecteur;
    }

    public static ArrayList<Lecteur> GetLecteurById(int Id){
        ArrayList<Lecteur> Lecteur = new ArrayList<>();
        Connection connection = connectToDatabase.getInstance();
        String query = "SELECT * FROM Lecteur WHERE id="+Id;
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);

            if(resultSet.next()){
                Lecteur lecteur = new Lecteur(resultSet.getInt("Id"), resultSet.getString("Nom_Lecteur"), resultSet.getString("Fonction"), resultSet.getString("Email"), resultSet.getString("Mobile"), resultSet.getInt("NbPretEnCours"), resultSet.getInt("NbFoisPret"), resultSet.getInt("Amende_Lecteur"));
                Lecteur.add(lecteur);
            }
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }

        return Lecteur;
    }


    public static void AddLecteur(String nomLecteur, String emailLecteur, String fonctionLecteur, String mobileLecteur){
        Connection connection = connectToDatabase.getInstance();
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            String query = "INSERT INTO Lecteur(Nom_Lecteur, Fonction, Email, Mobile) VALUES(?,?,?,?)";
            PreparedStatement preparedStatement = connection.prepareStatement(query);

            //set Value to Prestatement
            preparedStatement.setString(1, nomLecteur);
            preparedStatement.setString(2, fonctionLecteur);
            preparedStatement.setString(3, emailLecteur);
            preparedStatement.setString(4, mobileLecteur);

            //execute Insert

            preparedStatement.executeUpdate();

            preparedStatement.close();
            statement.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }


    public static void updateLecteur(int idLecteur, String nomLecteur, String emailLecteur, String fonctionLecteur, String mobileLecteur){
        Connection connection = connectToDatabase.getInstance();
        String query = "UPDATE Lecteur set Nom_Lecteur=?,Fonction=?, Email=?, Mobile=?";
        query += " WHERE Id="+idLecteur+"";
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            PreparedStatement preparedStatement = connection.prepareStatement(query);

            preparedStatement.setString(1, nomLecteur);
            preparedStatement.setString(2, fonctionLecteur);
            preparedStatement.setString(3, emailLecteur);
            preparedStatement.setString(4, mobileLecteur);

            preparedStatement.executeUpdate();

            preparedStatement.close();
            statement.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }


    public static void deletelecteurItem(int id){
        Connection connection = connectToDatabase.getInstance();
        String query = "DELETE FROM Lecteur WHERE Id=?";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, id);

            preparedStatement.executeUpdate();
            preparedStatement.close();
        }

        catch (Exception e){
            e.printStackTrace();
        }
    }


    public static int GetTotalLecteur(){

        String query = "SELECT COUNT(Id) as TotalLecteur FROM Lecteur";

        int Total = 0;
        Connection connection = connectToDatabase.getInstance();

        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);

            if (resultSet.next()){
                Total = resultSet.getInt("TotalLecteur");
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return Total;
    }

}
