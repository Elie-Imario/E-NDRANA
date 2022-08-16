package com.e_Ndrana.servlet;

import com.e_Ndrana.dao.LecteurDAO;
import com.e_Ndrana.dao.LivreDAO;
import com.e_Ndrana.dao.PretDAO;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "E_NdranaChartServlet", value = "/statistique")
public class E_NdranaChartServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int nbPretEffectue = PretDAO.GetTotalPret();
        int nbBookEmprunte = LivreDAO.GetTotalLivrePret();
        int nbLecteur = LecteurDAO.GetTotalLecteur();

        request.setAttribute("_nbPretEffectue", nbPretEffectue);
        request.setAttribute("_nbBookEmprunte", nbBookEmprunte);
        request.setAttribute("_nbLecteur", nbLecteur);

        request.setAttribute("menu_stat_active", true);
        this.getServletContext().getRequestDispatcher("/views/E_NdranaChartView.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
