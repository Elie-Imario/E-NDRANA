package com.e_Ndrana.servlet;

import com.e_Ndrana.beans.Livre;
import com.e_Ndrana.dao.LecteurDAO;
import com.e_Ndrana.dao.LivreDAO;
import com.e_Ndrana.dao.PretDAO;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "ListBookServlet", value = "/list_Ouvrage")
public class ListBookServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ArrayList<Livre> Books = LivreDAO.GetAllBook();
        request.setAttribute("Books", Books);
        request.setAttribute("menu_Ouvrage_active", true);
        request.setAttribute("menu_listBook_active", true);

        this.getServletContext().getRequestDispatcher("/views/ListOuvrageView.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(request.getParameter("RequestType").equals("getBookById")){
            processGetBook(request, response);
        }
        else if(request.getParameter("RequestType").equals("UpdateBook")){
            processUpdateBook(request, response);
        }
        else if(request.getParameter("RequestType").equals("DeleteBook")){
            processDeleteBook(request, response);
        }
        else if(request.getParameter("RequestType").equals("GetDetailsBookPrete")){
            processGetDetailsBookPrete(request, response);
        }
    }

    protected void processGetBook(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ArrayList<Livre> Book = LivreDAO.GetBookById(Integer.parseInt(request.getParameter("Id_Ouvrage")));

        String JsonResponse = new Gson().toJson(Book);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(JsonResponse);
    }

    protected void processUpdateBook(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        LivreDAO.UpdateBook(Integer.parseInt(request.getParameter("IdOuvrage")),request.getParameter("titleBook"), request.getParameter("authorName"), request.getParameter("dateEdition"));

        Map dataResponse = new HashMap();

        dataResponse.put("requestStatusCode", 200);
        dataResponse.put("sucessMsg", "L'Ouvrage a été mis à jour!");

        ArrayList _dataResponse = new ArrayList();

        _dataResponse.add(dataResponse);

        String JsonResponse = new Gson().toJson(_dataResponse);
        
        response.setContentType("application/json");
        response.getWriter().write(JsonResponse);
    }

    protected void processDeleteBook(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        LivreDAO.DeleteLivre(Integer.parseInt(request.getParameter("Id_Ouvrage")));
        Map dataResponse = new HashMap();

        dataResponse.put("requestStatusCode", 204);
        dataResponse.put("sucessMsg", "L'ouvarge a été supprimé de E-NDRANA!");

        ArrayList _dataResponse = new ArrayList();

        _dataResponse.add(dataResponse);


        String JsonResponse = new Gson().toJson(_dataResponse);

        response.setContentType("application/json");
        response.getWriter().write(JsonResponse);
    }

    protected void processGetDetailsBookPrete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        ArrayList TitleBookPrete = LivreDAO.GetBookPrete();
        ArrayList BookNbPret = LivreDAO.GetNbPretLivre();

        Map dataResponse = new HashMap();

        dataResponse.put("titleBook", TitleBookPrete);
        dataResponse.put("nbFoisPret", BookNbPret );

        ArrayList _dataResponse = new ArrayList();

        _dataResponse.add(dataResponse);

        String JsonResponse = new Gson().toJson(_dataResponse);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(JsonResponse);
    }


}
