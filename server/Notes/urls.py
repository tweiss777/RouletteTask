from django.urls import path
from . import views

urlpatterns = [
    path("", views.getNotes),
    path("create", views.createNotes),
    path("update/<str:id>", views.updateNotes),
    path("delete/<str:id>", views.deleteNotes),
    path("<str:id>", views.getNote),
]
