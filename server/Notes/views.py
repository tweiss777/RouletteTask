from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# todo add exception handling
@api_view(["GET"])
def getNotes(request) -> Response:
    return Response({"message": "get all notes"}, status=status.HTTP_200_OK) 

@api_view(["POST"])
def createNotes(request) -> Response:
    return Response({"message": "create new note"}, status=status.HTTP_201_CREATED)

@api_view(["PUT"])
def updateNotes(request, id) -> Response:
    return Response({"message": "update note"}, status=status.HTTP_204_NO_CONTENT)
    

@api_view(["DELETE"])
def deleteNotes(request, id):
    return Response({"message": "delete note"}, status=status.HTTP_204_NO_CONTENT)

@api_view(["GET"])
def getNote(request, id) -> Response:
    return Response({"message": "get note"}, status=status.HTTP_200_OK)
