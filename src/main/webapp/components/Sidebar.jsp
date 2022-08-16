<!-- partial:index.partial.html -->
<div class="content">
  <div id="jquery-accordion-menu" class="jquery-accordion-menu red">
    <div class="jquery-accordion-menu-header" id="form">E-NDRANA</div>
    <ul id="demo-list">
      <li class='<c:if test="${menu_pret_active}">active</c:if>'><a href="list_Pret"><span><i class="fa fa-list-ul"></i></span> Prêt</a></li>
      <li><a href="#">Ouvrage</a>
        <ul class="submenu" <c:if test="${menu_Ouvrage_active}">style="display: block" </c:if>>
          <li class='<c:if test="${menu_addBook_active}">active</c:if>'><a href="add_Ouvrage"><i class="fa fa-book"></i> Ajouter un nouveau ouvrage</a></li>
          <li class='<c:if test="${menu_listBook_active}">active</c:if>'><a href="list_Ouvrage"><i class="fa fa-list-alt"></i> Liste des ouvrage </a></li>
        </ul>
      </li>
      <li><a href="#">Lecteur</a>
        <ul class="submenu" <c:if test="${menu_Lecteur_active}">style="display: block" </c:if>>
          <li class='<c:if test="${menu_addLecteur_active}">active</c:if>'><a href="add_Lecteur"><i class="fa fa-user-plus"></i> Ajouter un nouveau lecteur</a></li>
          <li class='<c:if test="${menu_listLecteur_active}">active</c:if>'><a href="list_Lecteur"><i class="fa fa-users"></i> Liste des lecteurs</a></li>
        </ul>
      </li>
      <li class='<c:if test="${menu_monCompte_active}">active</c:if>'><a href="MonCompte"><i class="fa fa-user"></i> Mon compte </a></li>
      <li class='<c:if test="${menu_stat_active}">active</c:if>'><a href="statistique"><i class="fa fa-line-chart"></i> Statistiques </a></li>
    </ul>
  </div>
</div>
