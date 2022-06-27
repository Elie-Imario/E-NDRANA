package com.e_Ndrana.servlet;

import com.e_Ndrana.dao.LecteurDAO;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "AddLecteurServlet", value = "/add_Lecteur")
public class AddLecteurServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        this.getServletContext().getRequestDispatcher("/views/AddLecteurView.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(request.getParameter("RequestType").equals("AddLecteur")){
            processAddLecteur(request, response);
        }
    }


    protected void processAddLecteur(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        LecteurDAO.AddLecteur(request.getParameter("nomLecteur"), request.getParameter("emailLecteur"), request.getParameter("fonctionLecteur"), request.getParameter("mobileLecteur"));

        Map dataResponse = new HashMap();

        dataResponse.put("requestStatusCode", 201);
        dataResponse.put("sucessMsg", "Le nouveau lecteur a été ajouté avec succès!");

        ArrayList _dataResponse = new ArrayList();

        _dataResponse.add(dataResponse);

        String JsonResponse = new Gson().toJson(_dataResponse);

        response.setContentType("application/json");
        response.getWriter().write(JsonResponse);
    }
}
