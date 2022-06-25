package com.e_Ndrana.dao;

import com.e_Ndrana.beans.Lecteur;
import com.e_Ndrana.beans.Livre;
import com.e_Ndrana.beans.Pret;

import java.sql.*;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

public class PretDAO {

    public static ArrayList get_readerNameSuggestion(){
        ArrayList _readerNameList = new ArrayList();
        Connection connection = connectToDatabase.getInstance();
        String query = "SELECT * FROM Lecteur";
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);
            while (resultSet.next()){
                _readerNameList.add(resultSet.getString("Nom_Lecteur"));
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return _readerNameList;
    }

    public static ArrayList get_titleBookSuggestion(){
        ArrayList _titleBook = new ArrayList();
        Connection connection = connectToDatabase.getInstance();
        String query = "SELECT * FROM Livre WHERE Disponible = TRUE";
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);
            while (resultSet.next()){
                _titleBook.add(resultSet.getString("Titre_Ouvrage"));
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return _titleBook;
    }


    public static ArrayList<Pret> GetAllPret(){
        ArrayList<Pret> AllPret = new ArrayList<>();
        Connection connection = connectToDatabase.getInstance();

        String query = "SELECT lecteur.Nom_Lecteur, livre.Titre_Ouvrage, pret.Id_Pret, pret.Id_Lecteur, pret.Id_Ouvrage, pret.DateDebPret, pret.DateFinPret, pret.NbJourPret, pret.Etat, pret.Amende";
        query += " FROM Pret pret JOIN Lecteur lecteur ON (pret.Id_Lecteur = lecteur.Id) JOIN Livre livre ON (pret.Id_Ouvrage = livre.Id_Ouvrage)";
        query += " ORDER BY pret.Id_Pret desc";

        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);

            while (resultSet.next()){
                Pret pret = new Pret(resultSet.getInt("Id_Pret") , resultSet.getInt("Id_Lecteur"), resultSet.getInt("Id_Ouvrage"), resultSet.getString("Nom_Lecteur") , resultSet.getString("Titre_Ouvrage"), resultSet.getDate("DateDebPret"), resultSet.getDate("DateFinPret"), resultSet.getInt("NbJourPret") , resultSet.getBoolean("Etat") , resultSet.getInt("Amende"));
                AllPret.add(pret);
            }
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }

        return AllPret;
    }


    public static ArrayList<Pret> GetPretById(int IdPret){
        ArrayList<Pret> Pret = new ArrayList<>();
        Connection connection = connectToDatabase.getInstance();

        String query = "SELECT lecteur.Nom_Lecteur, livre.Titre_Ouvrage, pret.Id_Pret, pret.Id_Lecteur, pret.Id_Ouvrage, pret.DateDebPret, pret.DateFinPret, pret.NbJourPret, pret.Etat, pret.Amende";
        query += " FROM Pret pret JOIN Lecteur lecteur ON (pret.Id_Lecteur = lecteur.Id) JOIN Livre livre ON (pret.Id_Ouvrage = livre.Id_Ouvrage)";
        query += " WHERE Id_Pret="+IdPret;

        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);

            while (resultSet.next()){
                Pret pret = new Pret(resultSet.getInt("Id_Pret") , resultSet.getInt("Id_Lecteur"), resultSet.getInt("Id_Ouvrage"), resultSet.getString("Nom_Lecteur") , resultSet.getString("Titre_Ouvrage"), new java.util.Date(resultSet.getDate("DateDebPret").getTime()), new java.util.Date(resultSet.getDate("DateFinPret").getTime()), resultSet.getInt("NbJourPret") , resultSet.getBoolean("Etat") , resultSet.getInt("Amende"));
                Pret.add(pret);
            }
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }

        return Pret;
    }



    public static void InitEffectuerPretAction(String _readerName, String _titleBook, String _datedeb, String _datefin, int _nbJour){
        int IdLecteur = GetIdLecteur(_readerName);
        int IdOuvrage = GetIdOuvrage(_titleBook);

        //Convert String Date To Date SQL
        Date datedeb = formatedDate(_datedeb);
        Date datefin = formatedDate(_datefin);

        if (_nbJour<=7){
            EffectuerPretAction(IdLecteur, IdOuvrage, datedeb, datefin, _nbJour);
        }
        else{
            int Amende = 5000;
            EffectuerPretAction(IdLecteur, IdOuvrage, datedeb, datefin, _nbJour, Amende);
        }
    }



    //Nb jour Pret<7
    public static void EffectuerPretAction(int _IdLecteur, int _IdBook, java.sql.Date _dateDebPret, java.sql.Date _dateFinPret, int _nbJourPret){
        Connection connection = connectToDatabase.getInstance();
        String query = "INSERT INTO Pret(Id_Lecteur, Id_Ouvrage, DateDebPret, DateFinPret, NbJourPret) VALUES(?,?,?,?,?)";
        try{
            PreparedStatement preparedStatement = connection.prepareStatement(query);

            preparedStatement.setInt(1, _IdLecteur);
            preparedStatement.setInt(2, _IdBook);
            preparedStatement.setDate(3, _dateDebPret);
            preparedStatement.setDate(4, _dateFinPret);
            preparedStatement.setInt(5, _nbJourPret);

            preparedStatement.executeUpdate();

            preparedStatement.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }

        UpdateLecteurTable(_IdLecteur, 0);
        UpdateLivreTable(_IdBook);
    }

    //Nb jour Pret>7
    public static void EffectuerPretAction(int _IdLecteur, int _IdBook, java.sql.Date _dateDebPret, Date _dateFinPret, int _nbJourPret, int _amende){
        Connection connection = connectToDatabase.getInstance();
        String query = "INSERT INTO Pret(Id_Lecteur, Id_Ouvrage, DateDebPret, DateFinPret, NbJourPret, Amende) VALUES(?,?,?,?,?,?)";
        try{
            PreparedStatement preparedStatement = connection.prepareStatement(query);

            preparedStatement.setInt(1, _IdLecteur);
            preparedStatement.setInt(2, _IdBook);
            preparedStatement.setDate(3, _dateDebPret);
            preparedStatement.setDate(4, _dateFinPret);
            preparedStatement.setInt(5, _nbJourPret);
            preparedStatement.setInt(6, _amende);

            preparedStatement.executeUpdate();

            preparedStatement.close();
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }

        UpdateLecteurTable(_IdLecteur, _amende);
        UpdateLivreTable(_IdBook);
    }

    public static void UpdateLecteurTable(int IdLecteur, int _amendelecteur){
        Connection connection = connectToDatabase.getInstance();
        //Get Lecteur Data
        String query = "SELECT * FROM Lecteur WHERE Id="+IdLecteur+"";
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);
            if(resultSet.next()){
                //UPDATE TABLE LECTEUR
                int nbpretencours = resultSet.getInt("NbPretEnCours");
                int nbEmprint = resultSet.getInt("NbFoisPret");
                int amendeLecteur = resultSet.getInt("Amende_Lecteur");

                query = "UPDATE Lecteur set NbPretEnCours = ?, NbFoisPret = ?, Amende_Lecteur = ?";
                query += " WHERE Id="+IdLecteur;
                PreparedStatement preparedStatement = connection.prepareStatement(query);
                preparedStatement.setInt(1, nbpretencours + 1);
                preparedStatement.setInt(2, nbEmprint + 1);
                preparedStatement.setInt(3, amendeLecteur + _amendelecteur);

                preparedStatement.executeUpdate();

                preparedStatement.close();
            }
            else{
                System.out.println("Aucon resultat trouvé");
            }
            statement.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    public static void UpdateLivreTable(int idOuvrage) {
        Connection connection = connectToDatabase.getInstance();
        //Get Livre Data
        String query = "SELECT * FROM Livre WHERE Id_Ouvrage=" + idOuvrage;
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);
            if (resultSet.next()) {
                int nbFoisPretLivre = resultSet.getInt("NbFoisPret");
                query = "UPDATE Livre set Disponible =?, NbFoisPret =? WHERE Id_Ouvrage=" + idOuvrage;

                boolean disponible = resultSet.getBoolean("Disponible");
                if (disponible) {
                    PreparedStatement preparedStatement = connection.prepareStatement(query);

                    preparedStatement.setBoolean(1, false);
                    preparedStatement.setInt(2, nbFoisPretLivre + 1);

                    preparedStatement.executeUpdate();

                    preparedStatement.close();
                } else {
                    System.out.println("Livre Indisponible");
                }
            } else {
                System.out.println("Aucun resultat trouvé");
            }

            statement.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public static int GetIdLecteur(String nomLecteur){
        Connection connection = connectToDatabase.getInstance();
        String query = "SELECT Id FROM Lecteur WHERE Nom_Lecteur="+"\""+nomLecteur+"\""+"";

        int IdLecteur = 0;

        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);
            if(resultSet.next()){
                IdLecteur = resultSet.getInt("Id");
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }

        return IdLecteur;
    }


    public static int GetIdOuvrage(String titleBook){
        Connection connection = connectToDatabase.getInstance();
        String query = "SELECT Id_Ouvrage FROM Livre WHERE Titre_Ouvrage="+"\""+titleBook+"\""+"";

        int IdOuvrage = 0;

        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);
            if(resultSet.next()){
                IdOuvrage = resultSet.getInt("Id_Ouvrage");
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }

        return IdOuvrage;

    }

    public static ArrayList<Pret> GET_LAST_INSERT(){
        ArrayList<Pret> Pret = new ArrayList<>();
        Connection connection = connectToDatabase.getInstance();
        String query = "SELECT LAST_INSERT_ID() as Id_Pret FROM Pret";
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);

            if(resultSet.next()){
                int newPretId = resultSet.getInt("Id_Pret");
                System.out.println(newPretId);
                query = "SELECT lecteur.Nom_Lecteur, livre.Titre_Ouvrage, pret.Id_Pret, pret.Id_Lecteur, pret.Id_Ouvrage, pret.DateDebPret, pret.DateFinPret, pret.NbJourPret, pret.Etat, pret.Amende";
                query += " FROM Pret pret JOIN Lecteur lecteur ON (pret.Id_Lecteur = lecteur.Id) JOIN Livre livre ON (pret.Id_Ouvrage = livre.Id_Ouvrage)";
                query += " WHERE Id_Pret="+newPretId;
                resultSet = statement.executeQuery(query);

                while (resultSet.next()){
                    Pret pret = new Pret(resultSet.getInt("Id_Pret") , resultSet.getInt("Id_Lecteur"), resultSet.getInt("Id_Ouvrage"), resultSet.getString("Nom_Lecteur") , resultSet.getString("Titre_Ouvrage"), new java.util.Date(resultSet.getDate("DateDebPret").getTime()), new java.util.Date(resultSet.getDate("DateFinPret").getTime()), resultSet.getInt("NbJourPret") , resultSet.getBoolean("Etat") , resultSet.getInt("Amende"));
                    Pret.add(pret);
                    System.out.println(Pret);
                }
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }

        return Pret;
    }

    public static void initUpdatePret(int idPret, int etatpret, String newtitreOuvarge, String datedebut, String datefin, int newnbJour,
                                      int idLecteur, int currentIdOuvargeenPret, int _currentAmende, int _currentNbJour){


        int newIdOuvrage = GetIdOuvrage(newtitreOuvarge);

        //Convert String Date To Date SQL
        Date _datedeb = formatedDate(datedebut);
        Date _datefin = formatedDate(datefin);

        UpdatePret(etatpret, idPret, idLecteur, newIdOuvrage, _datedeb, _datefin, newnbJour, currentIdOuvargeenPret, _currentNbJour, _currentAmende);
    }

    public static void UpdatePret(int etatPret, int _idPret, int _IdLecteur, int _newIdOuvrage, Date _newDateDebPret, Date _newDateFinPret, int _newNbJourPret,
                                  int currentIdOuvrage, int currentNbJourPret, int currentAmende){
        Connection connection = connectToDatabase.getInstance();
        String query = new String();
        int newAmendePret = 0;
        int amendeLecteur = 0;

        if (etatPret == 1){//Pret toujours en cours
            if(currentIdOuvrage == _newIdOuvrage){// Le Lecteur n'a pas pris un autre livre
                if(currentNbJourPret<=7){
                    if(_newNbJourPret<=7){
                        newAmendePret = currentAmende;
                        amendeLecteur = currentAmende;
                    }
                    else {
                        newAmendePret += 5000;
                        amendeLecteur += 5000;
                    }
                }
                else {
                    if(_newNbJourPret<=7){
                        newAmendePret = currentAmende - 5000;
                        amendeLecteur = currentAmende - 5000;
                    }
                    else {
                        newAmendePret = currentAmende;
                        amendeLecteur = currentAmende;
                    }
                }

                query = "UPDATE Pret SET DateDebPret = ?, DateFinPret = ?, NbJourPret = ?, Amende = ?";
                query += " WHERE Id_Pret ="+_idPret;

                try {
                    PreparedStatement preparedStatement = connection.prepareStatement(query);

                    preparedStatement.setDate(1, _newDateDebPret);
                    preparedStatement.setDate(2, _newDateFinPret);
                    preparedStatement.setInt(3, _newNbJourPret);
                    preparedStatement.setInt(4, newAmendePret);

                    preparedStatement.executeUpdate();

                    preparedStatement.close();
                }
                catch (Exception e){
                    e.printStackTrace();
                }

                if(newAmendePret != currentAmende){
                    UpdateLecteurTable_AFTER_EDITPret(_IdLecteur, amendeLecteur, false);
                }
            }
            else {// Le Lecteur a décidé de prendre un autre livre
                if(currentNbJourPret<=7){
                    if(_newNbJourPret<=7){
                        newAmendePret = currentAmende;
                        amendeLecteur = currentAmende;
                    }
                    else {
                        newAmendePret += 5000;
                        amendeLecteur += 5000;
                    }
                }
                else {
                    if(_newNbJourPret<=7){
                        newAmendePret = currentAmende - 5000;
                        amendeLecteur = currentAmende - 5000;
                    }
                    else {
                        newAmendePret = currentAmende;
                        amendeLecteur = currentAmende;
                    }
                }

                query = "UPDATE Pret SET Id_Ouvrage = ?, DateDebPret = ?, DateFinPret = ?, NbJourPret = ?, Amende = ?";
                query += " WHERE Id_Pret ="+_idPret;

                try {
                    PreparedStatement preparedStatement = connection.prepareStatement(query);

                    preparedStatement.setInt(1, _newIdOuvrage);
                    preparedStatement.setDate(2, _newDateDebPret);
                    preparedStatement.setDate(3, _newDateFinPret);
                    preparedStatement.setInt(4, _newNbJourPret);
                    preparedStatement.setInt(5, newAmendePret);

                    preparedStatement.executeUpdate();

                    preparedStatement.close();
                }
                catch (Exception e){
                    e.printStackTrace();
                }

                if(newAmendePret != currentAmende){
                    UpdateLecteurTable_AFTER_EDITPret(_IdLecteur, amendeLecteur, true);
                }
                else {
                    UpdateLecteurTable_AFTER_EDITPret(_IdLecteur, true);
                }

                UpdateLivreTable_AFTER_EDITPret(currentIdOuvrage, _newIdOuvrage);
            }
        }


        else{ //Pret Terminé
            query = "UPDATE Pret SET Etat = ? WHERE Id_Pret ="+_idPret;
            try {
                PreparedStatement preparedStatement = connection.prepareStatement(query);
                preparedStatement.setBoolean(1, false);

                preparedStatement.executeUpdate();

                preparedStatement.close();
            }
            catch (Exception e){
                e.printStackTrace();
            }

            UpdateLecteurTable_AFTER_EDIT_ETAT_PRET(_IdLecteur, true);
            UpdateLivreTable_AFTER_EDIT_ETAT_PRET(currentIdOuvrage, true);

        }
    }



    public static void UpdateLecteurTable_AFTER_EDITPret(int IdLecteur, boolean isNewBook){
        Connection connection = connectToDatabase.getInstance();
        //Get Lecteur Data
        String query = "SELECT * FROM Lecteur WHERE Id="+IdLecteur+"";
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);
            if(resultSet.next()){
                //UPDATE TABLE LECTEUR
                if(isNewBook){
                    int nbFoisPret = resultSet.getInt("NbFoisPret");

                    query = "UPDATE Lecteur SET NbFoisPret = ?";
                    query += " WHERE Id="+IdLecteur;

                    PreparedStatement preparedStatement = connection.prepareStatement(query);

                    preparedStatement.setInt(1, nbFoisPret + 1);

                    preparedStatement.executeUpdate();

                    preparedStatement.close();
                }
            }
            else{
                System.out.println("Aucon resultat trouvé");
            }
            statement.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    public static void UpdateLecteurTable_AFTER_EDITPret(int IdLecteur, int _amendelecteur, boolean isNewBook){
        Connection connection = connectToDatabase.getInstance();
        //Get Lecteur Data
        String query = "SELECT * FROM Lecteur WHERE Id="+IdLecteur+"";
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);
            if(resultSet.next()){
                //UPDATE TABLE LECTEUR
                int amendeLecteur = resultSet.getInt("Amende_Lecteur");

                if(isNewBook){
                    int nbFoisPret = resultSet.getInt("NbFoisPret");

                    query = "UPDATE Lecteur SET NbFoisPret = ?, Amende_Lecteur = ?";
                    query += " WHERE Id="+IdLecteur;

                    PreparedStatement preparedStatement = connection.prepareStatement(query);

                    preparedStatement.setInt(1, nbFoisPret + 1);

                    if (_amendelecteur == 0){
                        preparedStatement.setInt(2, amendeLecteur - 5000);
                    }
                    else {
                        preparedStatement.setInt(2, amendeLecteur + _amendelecteur);
                    }

                    preparedStatement.executeUpdate();

                    preparedStatement.close();

                }
                else {

                    query = "UPDATE Lecteur SET Amende_Lecteur = ?";
                    query += " WHERE Id="+IdLecteur;
                    PreparedStatement preparedStatement = connection.prepareStatement(query);

                    if (_amendelecteur == 0){
                        preparedStatement.setInt(1, amendeLecteur - 5000);
                    }
                    else {
                        preparedStatement.setInt(1, amendeLecteur + _amendelecteur);
                    }

                    preparedStatement.executeUpdate();

                    preparedStatement.close();

                }
            }
            else{
                System.out.println("Aucon resultat trouvé");
            }
            statement.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }


    public static void UpdateLivreTable_AFTER_EDITPret(int currentIdOuvrage, int newIdOuvrage){
        Connection connection = connectToDatabase.getInstance();
        String query = "SELECT * FROM Livre WHERE Id_Ouvrage="+currentIdOuvrage;//Update OldBook
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);

            if (resultSet.next()) {
                query = "UPDATE Livre set Disponible =? WHERE Id_Ouvrage="+currentIdOuvrage;

                PreparedStatement preparedStatement = connection.prepareStatement(query);
                preparedStatement.setBoolean(1, true);
                preparedStatement.executeUpdate();
                preparedStatement.close();
            }

            else{
                System.out.println("Aucun resultat trouvé");
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }

        query = "SELECT * FROM Livre WHERE Id_Ouvrage="+newIdOuvrage;//Update newBook

        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);
            if(resultSet.next()){
                int nbFoisPretLivre = resultSet.getInt("NbFoisPret");
                query = "UPDATE Livre set Disponible =?, NbFoisPret =? WHERE Id_Ouvrage="+newIdOuvrage;

                boolean disponible = resultSet.getBoolean("Disponible");
                if(disponible){
                    PreparedStatement preparedStatement = connection.prepareStatement(query);

                    preparedStatement.setBoolean(1, false);
                    preparedStatement.setInt(2, nbFoisPretLivre+1);

                    preparedStatement.executeUpdate();

                    preparedStatement.close();
                }
                else {
                    System.out.println("Livre Indisponible");
                }
            }
            else{
                System.out.println("Aucun resultat trouvé");
            }

            statement.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }


    }

    public static void UpdateLecteurTable_AFTER_EDIT_ETAT_PRET(int IdLecteur, boolean isFinish){
        Connection connection = connectToDatabase.getInstance();
        //Get Lecteur Data
        String query = "SELECT * FROM Lecteur WHERE Id="+IdLecteur+"";
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);
            if(resultSet.next()){
                //UPDATE TABLE LECTEUR
                if(isFinish){
                    int nbPretEnCours = resultSet.getInt("NbPretEnCours");

                    query = "UPDATE Lecteur SET NbPretEnCours = ?";
                    query += " WHERE Id="+IdLecteur;

                    PreparedStatement preparedStatement = connection.prepareStatement(query);

                    preparedStatement.setInt(1, nbPretEnCours - 1);

                    preparedStatement.executeUpdate();

                    preparedStatement.close();
                }
            }
            else{
                System.out.println("Aucon resultat trouvé");
            }
            statement.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }

    }


    public static void UpdateLivreTable_AFTER_EDIT_ETAT_PRET(int IdOuvrage, boolean isFinish){
        Connection connection = connectToDatabase.getInstance();
        String query = "SELECT * FROM Livre WHERE Id_Ouvrage="+IdOuvrage;
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);

            if (resultSet.next()) {
                if (isFinish){
                    query = "UPDATE Livre SET Disponible =? WHERE Id_Ouvrage="+IdOuvrage;

                    PreparedStatement preparedStatement = connection.prepareStatement(query);
                    preparedStatement.setBoolean(1, true);
                    preparedStatement.executeUpdate();
                    preparedStatement.close();
                }
            }

            else{
                System.out.println("Aucun resultat trouvé");
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }


    public static Date formatedDate(String dateToFormat){
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        java.sql.Date DateSql = null;
        try {
            java.util.Date dateUtil = dateFormat.parse(dateToFormat);
            DateSql = new Date(dateUtil.getTime());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return DateSql;
    }

    public static int GetTotalPret(){

        String query = "SELECT COUNT(Id_Pret) as TotalPret FROM Pret";

        int Total = 0;
        Connection connection = connectToDatabase.getInstance();

        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);

            if (resultSet.next()){
                Total = resultSet.getInt("TotalPret");
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return Total;
    }

}
