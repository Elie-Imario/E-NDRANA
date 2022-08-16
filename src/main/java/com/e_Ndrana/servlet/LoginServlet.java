package com.e_Ndrana.servlet;

import com.e_Ndrana.dao.BoUserDAO;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "LoginServlet", value = "/login")
public class LoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.getServletContext().getRequestDispatcher("/views/LoginView.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getParameter("RequestType").equals("SingIn")) {
            processSignIn(request, response);
        }
    }

    protected void processSignIn(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String login = request.getParameter("login");
        String Password = request.getParameter("Pswrd");

        Map dataResponse = new HashMap();

        if(BoUserDAO.isLoginValid(login) && BoUserDAO.isPassWordCorrect(Password)){
            System.out.println("Login & password valid");
            dataResponse.put("requestStatusCode", 200);
            dataResponse.put("sucessMsg", "Accès autorisé!");

        }
        else{
            if(!BoUserDAO.isLoginValid(login)){
                System.out.println("Le Login est incorrect!");
                dataResponse.put("requestStatusCode", 400);
                dataResponse.put("errorMsg", "Le Login est incorrect!");
            }
            else if(!BoUserDAO.isPassWordCorrect(Password)){
                System.out.println("Le mot de passe est incorrect!");
                dataResponse.put("requestStatusCode", 400);
                dataResponse.put("errorMsg", "Le Login est incorrect!");
            }
        }

        ArrayList _dataResponse = new ArrayList();

        _dataResponse.add(dataResponse);


        String JsonResponse = new Gson().toJson(_dataResponse);

        response.setContentType("application/json");
        response.getWriter().write(JsonResponse);
    }
}