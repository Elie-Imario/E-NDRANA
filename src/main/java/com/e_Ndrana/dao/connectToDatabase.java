package com.e_Ndrana.dao;

import java.sql.Connection;
import java.sql.DriverManager;

public class connectToDatabase {
    private static String Url = "jdbc:mysql://localhost:3306/e-ndrana";
    private static String User = "root";
    private static String Password = "";
    private static java.sql.Connection connection;
    public static Connection getInstance(){
        if(connection == null){
            try {
                Class.forName("com.mysql.jdbc.Driver");
                connection = DriverManager.getConnection(Url, User, Password);
            }
            catch (Exception e){
                System.out.println("Impossible de se connecter à la base de donnée!");
            }
        }
        return connection;
    }
}
