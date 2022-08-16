package com.e_Ndrana.servlet;

import com.e_Ndrana.dao.BoUserDAO;
import com.e_Ndrana.dao.LecteurDAO;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "MonCompteServlet", value = "/MonCompte")
public class MonCompteServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setAttribute("menu_monCompte_active", true);
        this.getServletContext().getRequestDispatcher("/views/MonCompteView.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(request.getParameter("RequestType").equals("UpdatePassword")){
            processUpdatePassword(request, response);
        }
    }

    protected void processUpdatePassword(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        BoUserDAO.UpdateUserPassword(request.getParameter("newPswrd"));
        Map dataResponse = new HashMap();

        dataResponse.put("requestStatusCode", 200);
        dataResponse.put("sucessMsg", "Le mot de passe a été modifié avec succès!");

        ArrayList _dataResponse = new ArrayList();

        _dataResponse.add(dataResponse);


        String JsonResponse = new Gson().toJson(_dataResponse);

        response.setContentType("application/json");
        response.getWriter().write(JsonResponse);
    }
}
