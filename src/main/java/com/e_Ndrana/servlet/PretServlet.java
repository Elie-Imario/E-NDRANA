package com.e_Ndrana.servlet;

import com.e_Ndrana.beans.Pret;
import com.e_Ndrana.dao.PretDAO;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "PretServlet", value = "/list_Pret")
public class PretServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ArrayList Prets = PretDAO.GetAllPret();
        request.setAttribute("Prets", Prets);
        request.setAttribute("menu_pret_active", true);

        this.getServletContext().getRequestDispatcher("/views/PretView.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(request.getParameter("RequestType").equals("getPretById")){
            processGetPret(request, response);
        }
        else if(request.getParameter("RequestType").equals("EffectuerPret")){
            processEffectuerPret(request, response);
        }
        else if(request.getParameter("RequestType").equals("GetLastInsertPret")){
            processGetLastInsertPret(request, response);
        }
        else if(request.getParameter("RequestType").equals("UpdatePret")){
            processUpdatePret(request, response);
        }
        else if(request.getParameter("RequestType").equals("DeletePret")){
            //processDeletePret(request, response);
        }
        else if(request.getParameter("RequestType").equals("GetReaderName")){
            processGetReaderName(request, response);
        }
        else if(request.getParameter("RequestType").equals("GetTitleBook")){
            processGetTitleBook(request, response);
        }
        else if(request.getParameter("RequestType").equals("GetDateDebPret")){
            processGetDateDebPret(request, response);
        }
    }


    protected void processGetReaderName(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        ArrayList Lecteurs = PretDAO.get_readerNameSuggestion();

        String JsonResponse = new Gson().toJson(Lecteurs);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(JsonResponse);
    }

    protected void processGetTitleBook(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        ArrayList Books = PretDAO.get_titleBookSuggestion();

        String JsonResponse = new Gson().toJson(Books);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(JsonResponse);
    }

    protected void processGetPret(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        ArrayList Pret = PretDAO.GetPretById(Integer.parseInt(request.getParameter("Id_Pret")));


        String JsonResponse = new Gson().toJson(Pret);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(JsonResponse);
    }

    protected void processEffectuerPret(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        PretDAO.InitEffectuerPretAction(request.getParameter("readername"), request.getParameter("titebook"), request.getParameter("datedebutpret"), request.getParameter("datefinpret"), Integer.parseInt(request.getParameter("nbJourPret")));

        Map dataResponse = new HashMap();

        dataResponse.put("requestStatusCode", 201);
        dataResponse.put("sucessMsg", "Le prêt a été éffectué avec succès!!");

        ArrayList _dataResponse = new ArrayList();

        _dataResponse.add(dataResponse);


        String JsonResponse = new Gson().toJson(_dataResponse);

        response.setContentType("application/json");
        response.getWriter().write(JsonResponse);
    }

    protected void processGetLastInsertPret(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        ArrayList Pret = PretDAO.GET_LAST_INSERT();
        System.out.println(Pret);

        String JsonResponse = new Gson().toJson(Pret);
        System.out.println(JsonResponse);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(JsonResponse);
    }

    protected void processUpdatePret(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        PretDAO.initUpdatePret(Integer.parseInt(request.getParameter("idPret")), Integer.parseInt(request.getParameter("newEtat")), request.getParameter("newTitleBook"), request.getParameter("newDateDeb"), request.getParameter("newDatefin"), Integer.parseInt(request.getParameter("newNbJourPret")),
                Integer.parseInt(request.getParameter("Id_Lecteur")), Integer.parseInt(request.getParameter("currentIdOuvrageenPret")), Integer.parseInt(request.getParameter("currentAmende")), Integer.parseInt(request.getParameter("currentnbJourPret")));

        Map dataResponse = new HashMap();

        dataResponse.put("requestStatusCode", 200);
        dataResponse.put("sucessMsg", "Le prêt a été modifié avec succès!");

        ArrayList _dataResponse = new ArrayList();

        _dataResponse.add(dataResponse);


        String JsonResponse = new Gson().toJson(_dataResponse);

        response.setContentType("application/json");
        response.getWriter().write(JsonResponse);

    }

    protected void processGetDateDebPret(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        ArrayList Datedeb = PretDAO.GetDateDebPret();

        String JsonResponse = new Gson().toJson(Datedeb);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(JsonResponse);
    }
}
