package com.e_Ndrana.servlet;

import com.e_Ndrana.beans.Lecteur;
import com.e_Ndrana.dao.LecteurDAO;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "ListLecteurServlet", value = "/list_Lecteur")
public class ListLecteurServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ArrayList<Lecteur> allLecteur = LecteurDAO.getAllLecteur();
        request.setAttribute("Lecteurs", allLecteur);
        request.setAttribute("menu_Lecteur_active", true);
        request.setAttribute("menu_listLecteur_active", true);

        this.getServletContext().getRequestDispatcher("/views/ListLecteurView.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(request.getParameter("RequestType").equals("getLecteurById")){
            processGetLecteur(request, response);
        }
        else if(request.getParameter("RequestType").equals("UpdateLecteur")){
            processUpdateLecteur(request, response);
        }
        else if(request.getParameter("RequestType").equals("DeleteLecteur")){
            processDeleteLecteur(request, response);
        }
    }



    protected void processGetLecteur(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ArrayList<Lecteur> Lecteur = LecteurDAO.GetLecteurById(Integer.parseInt(request.getParameter("IdLecteur")));

        String JsonResponse = new Gson().toJson(Lecteur);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(JsonResponse);
    }

    protected void processUpdateLecteur(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        LecteurDAO.updateLecteur(Integer.parseInt(request.getParameter("IdLecteur")), request.getParameter("nomLecteur"), request.getParameter("emailLecteur"), request.getParameter("fonctionLecteur"), request.getParameter("mobileLecteur"));

        Map dataResponse = new HashMap();

        dataResponse.put("requestStatusCode", 200);
        dataResponse.put("sucessMsg", "Les info du lecteur ont été modifiées avec succès");

        ArrayList _dataResponse = new ArrayList();

        _dataResponse.add(dataResponse);

        String JsonResponse = new Gson().toJson(_dataResponse);

        System.out.println(JsonResponse);

        response.setContentType("application/json");
        response.getWriter().write(JsonResponse);
    }

    protected void processDeleteLecteur(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        LecteurDAO.deletelecteurItem(Integer.parseInt(request.getParameter("Id_Lecteur")));
        Map dataResponse = new HashMap();

        dataResponse.put("requestStatusCode", 204);
        dataResponse.put("sucessMsg", "Le Lecteur a été supprimé de E-NDRANA!");

        ArrayList _dataResponse = new ArrayList();

        _dataResponse.add(dataResponse);


        String JsonResponse = new Gson().toJson(_dataResponse);

        response.setContentType("application/json");
        response.getWriter().write(JsonResponse);
    }
}
