package com.e_Ndrana.beans;

import java.util.Date;

public class Pret {
    private int Id_Pret;
    private int Id_Lecteur;
    private int Id_Ouvrage;
    private String Nom_Lecteur;
    private String Titre_Ouvrage;
    private Date DateDebPret;
    private Date DateFinPret;
    private int NbJourPret;
    private boolean Etat;
    private int Amende;

    public Pret(int id_Pret, int id_Lecteur, int id_Ouvrage, String nom_Lecteur, String titre_Ouvrage, Date dateDebPret, Date dateFinPret, int nbJourPret, boolean etat, int amende) {
        Id_Pret = id_Pret;
        Id_Lecteur = id_Lecteur;
        Id_Ouvrage = id_Ouvrage;
        Nom_Lecteur = nom_Lecteur;
        Titre_Ouvrage = titre_Ouvrage;
        DateDebPret = dateDebPret;
        DateFinPret = dateFinPret;
        NbJourPret = nbJourPret;
        Etat = etat;
        Amende = amende;
    }

    public int getId_Pret() {
        return Id_Pret;
    }

    public void setId_Pret(int id_Pret) {
        Id_Pret = id_Pret;
    }

    public int getId_Lecteur() {
        return Id_Lecteur;
    }

    public void setId_Lecteur(int id_Lecteur) {
        Id_Lecteur = id_Lecteur;
    }

    public int getId_Ouvrage() {
        return Id_Ouvrage;
    }

    public void setId_Ouvrage(int id_Ouvrage) {
        Id_Ouvrage = id_Ouvrage;
    }

    public Date getDateDebPret() {
        return DateDebPret;
    }

    public void setDateDebPret(Date dateDebPret) {
        DateDebPret = dateDebPret;
    }

    public Date getDateFinPret() {
        return DateFinPret;
    }

    public void setDateFinPret(Date dateFinPret) {
        DateFinPret = dateFinPret;
    }

    public int getNbJourPret() {
        return NbJourPret;
    }

    public void setNbJourPret(int nbJourPret) {
        NbJourPret = nbJourPret;
    }

    public boolean isEtat() {
        return Etat;
    }

    public void setEtat(boolean etat) {
        Etat = etat;
    }

    public int getAmende() {
        return Amende;
    }

    public void setAmende(int amende) {
        Amende = amende;
    }

    public String getNom_Lecteur() {
        return Nom_Lecteur;
    }

    public void setNom_Lecteur(String nom_Lecteur) {
        Nom_Lecteur = nom_Lecteur;
    }

    public String getTitre_Ouvrage() {
        return Titre_Ouvrage;
    }

    public void setTitre_Ouvrage(String titre_Ouvrage) {
        Titre_Ouvrage = titre_Ouvrage;
    }
}
