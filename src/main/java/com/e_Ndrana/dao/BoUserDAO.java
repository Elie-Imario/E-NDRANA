package com.e_Ndrana.dao;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.sql.Connection;
import java.sql.PreparedStatement;

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
}
