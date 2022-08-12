package com.e_Ndrana.dao;

import com.e_Ndrana.beans.Lecteur;
import com.e_Ndrana.beans.Livre;

import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

public class LivreDAO {
    public static ArrayList<Livre> GetAllBook(){
        ArrayList<Livre> Books = new ArrayList<>();
        Connection connection = connectToDatabase.getInstance();
        String query = "SELECT * FROM Livre ORDER BY Id_Ouvrage desc";
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);
            Livre livre;
            while (resultSet.next()){
                livre = new Livre(resultSet.getInt("Id_Ouvrage"), resultSet.getString("Titre_Ouvrage"), resultSet.getString("Nom_Auteur"), resultSet.getDate("Date_Edition"), resultSet.getBoolean("Disponible"), resultSet.getInt("NbFoisPret"));
                Books.add(livre);
            }

        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
        return Books;
    }

    public static void ADDBOOK(String title, String nameAuthor, String _dateEdition){
        Connection connection = connectToDatabase.getInstance();
        String query = "INSERT INTO Livre(Titre_Ouvrage, Nom_Auteur, Date_Edition) VALUES(?,?,?)";

        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            PreparedStatement preparedStatement = connection.prepareStatement(query);

            //Convert String Date To Date SQL
            DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            java.util.Date date = dateFormat.parse(_dateEdition);
            java.sql.Date dateEdition = new Date(date.getTime());


            preparedStatement.setString(1, title);
            preparedStatement.setString(2, nameAuthor);
            preparedStatement.setDate(3, dateEdition);

            preparedStatement.executeUpdate();

            preparedStatement.close();
            statement.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    public static ArrayList<Livre> GetBookById(int IdOuvrage){
        ArrayList<Livre> Book = new ArrayList<>();
        Connection connection = connectToDatabase.getInstance();
        String query = "SELECT * FROM Livre WHERE Id_Ouvrage="+IdOuvrage;
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);

            if(resultSet.next()){
                Livre livre = new Livre(resultSet.getInt("Id_Ouvrage"), resultSet.getString("Titre_Ouvrage"), resultSet.getString("Nom_Auteur"), new java.util.Date(resultSet.getDate("Date_Edition").getTime()), resultSet.getBoolean("Disponible"), resultSet.getInt("NbFoisPret"));
                Book.add(livre);
            }
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
        return Book;
    }


    public static void UpdateBook(int IdBook, String TitleBook, String AuthorName, String _dateEdition){
        Connection connection = connectToDatabase.getInstance();
        String query = "UPDATE Livre SET Titre_Ouvrage = ?, Nom_Auteur = ?, Date_Edition = ?";
        query += " WHERE Id_Ouvrage="+IdBook+"";
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            PreparedStatement preparedStatement = connection.prepareStatement(query);

            //Convert String Date To Date SQL
            DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            java.util.Date date = dateFormat.parse(_dateEdition);
            java.sql.Date dateEdition = new Date(date.getTime());

            preparedStatement.setString(1, TitleBook);
            preparedStatement.setString(2, AuthorName);
            preparedStatement.setDate(3, dateEdition);

            preparedStatement.executeUpdate();

            preparedStatement.close();
            statement.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }


    public static void DeleteLivre(int IdBook){
        Connection connection = connectToDatabase.getInstance();
        String query = "DELETE FROM Livre WHERE Id_Ouvrage=?";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1 , IdBook);

            preparedStatement.executeUpdate();

            preparedStatement.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }



    public static ArrayList GetNbPretLivre(){
        ArrayList NbFoisPretBook = new ArrayList<>();
        Connection connection = connectToDatabase.getInstance();
        String query = "SELECT NbFoisPret FROM Livre WHERE NbFoisPret > 0 ORDER BY Id_Ouvrage asc";
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);

            while (resultSet.next()){
                NbFoisPretBook.add(resultSet.getInt("NbFoisPret"));
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return NbFoisPretBook;
    }

    public static ArrayList GetBookPrete(){
        ArrayList titleBooks = new ArrayList<>();
        Connection connection = connectToDatabase.getInstance();
        String query = "SELECT Titre_Ouvrage FROM Livre WHERE NbFoisPret > 0 ORDER BY Id_Ouvrage asc";
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);
            while(resultSet.next()){
                titleBooks.add(resultSet.getString("Titre_Ouvrage"));
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return titleBooks;
    }

    public static int GetTotalLivrePret(){

        String query = "SELECT SUM(NbFoisPret) as TotalLivrePret FROM Livre";

        int Total = 0;
        Connection connection = connectToDatabase.getInstance();

        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);

            if (resultSet.next()){
                Total = resultSet.getInt("TotalLivrePret");
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return Total;
    }

}
