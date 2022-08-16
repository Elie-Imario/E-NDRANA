package com.e_Ndrana.dao;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class BoUserDAO {
    public static String generateHashPassWord(String pswrd){
        try {
            MessageDigest messageDigest  =MessageDigest.getInstance("MD5");
            byte[] md = messageDigest.digest(pswrd.getBytes());
            BigInteger bigInteger = new BigInteger(1, md);
            String hashedPassword = bigInteger.toString(16);
            while (hashedPassword.length() < 32){
                hashedPassword = "0" + hashedPassword;
            }
            return hashedPassword;

        }
        catch (Exception e){
            e.printStackTrace();
            return "";
        }
    }

    public static void UpdateUserPassword(String password){
        String hashedPassword = generateHashPassWord(password);
        Connection connection = connectToDatabase.getInstance();
        String query = "UPDATE bo_User SET Password = ? WHERE Id = 1";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(query);

            preparedStatement.setString(1, hashedPassword);

            preparedStatement.executeUpdate();

            preparedStatement.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    public static boolean isLoginValid(String _login){
        Connection connection = connectToDatabase.getInstance();
        String query = "SELECT * FROM bo_user WHERE Username ="+"'"+_login+"'"+"" ;
        try {
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);

            if(resultSet.next()){
                statement.close();
                return true;
            }
            else{
                statement.close();
                return false;
            }
        }
        catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    public static Boolean isPassWordCorrect(String _password){
        Connection connection = connectToDatabase.getInstance();
        String hashedPassword = generateHashPassWord(_password);
        String query = "SELECT * FROM bo_User WHERE Password ="+"\""+hashedPassword+"\""+"";
        try{
            Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            ResultSet resultSet = statement.executeQuery(query);

            if(resultSet.next()){
                statement.close();
                return true;
            }
            else{
                statement.close();
                return false;
            }
        }
        catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
}
