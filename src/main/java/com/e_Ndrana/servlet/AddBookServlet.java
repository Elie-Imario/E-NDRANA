package com.e_Ndrana.servlet;

import com.e_Ndrana.dao.LivreDAO;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.sql.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "AddBookServlet", value = "/add_Ouvrage")
public class AddBookServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        this.getServletContext().getRequestDispatcher("/views/AddOuvrageView.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(request.getParameter("RequestType").equals("AddOuvrage")){
            processAddOuvrage(request, response);
        }
    }


    protected void processAddOuvrage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        LivreDAO.ADDBOOK(request.getParameter("titleBook"),request.getParameter("authorName"), request.getParameter("dateEdtion"));

        Map dataResponse = new HashMap();

        dataResponse.put("requestStatusCode", 201);
        dataResponse.put("sucessMsg", "Un nouveau ouvrage a été ajouté sur E-NDRANA!");

        ArrayList _dataResponse = new ArrayList();

        _dataResponse.add(dataResponse);

        String JsonResponse = new Gson().toJson(_dataResponse);

        response.setContentType("application/json");
        response.getWriter().write(JsonResponse);

    }
}
