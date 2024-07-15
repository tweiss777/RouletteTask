from django.db import IntegrityError
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from Notes.models import Notes
from rest_framework import status
from Notes.NotesSerializer import NotesSerializer
from Auth.auth import IsAuthorizedPermission
import datetime
@api_view(["GET"])
@permission_classes([IsAuthorizedPermission])
def getNotes(request) -> Response:
    notes = Notes.objects.all() 
    parsedNotes = NotesSerializer(notes, many=True).data
    return Response({"notes": parsedNotes}, status=status.HTTP_200_OK) 

@api_view(["POST"])
@permission_classes([IsAuthorizedPermission])
def createNotes(request) -> Response:
    try:
        newNote = request.data
        Notes.objects.create(**newNote, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
        createdNote = Notes.objects.latest('created_at')
        parsedNote = NotesSerializer(createdNote).data
        return Response({"message": parsedNote}, status=status.HTTP_201_CREATED)
    except IntegrityError:
        return Response({"message": "Invalid user id"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"message": "create new note failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
@api_view(["PUT"])
@permission_classes([IsAuthorizedPermission])
def updateNotes(request, id) -> Response:
    try:
        note = Notes.objects.get(id=id)
        if note == None:
            return Response({"message": "note not found"}, status=status.HTTP_404_NOT_FOUND)
        updatedNote = request.data
        Notes.objects.filter(id=id).update(**updatedNote, updated_at=datetime.datetime.now())
        parsedUpdatedNote = NotesSerializer(note).data
        return Response({"note": parsedUpdatedNote }, status=status.HTTP_204_NO_CONTENT)
    except Notes.DoesNotExist:
        return Response({"message": "note not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"message": "update note failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["DELETE"])
@permission_classes([IsAuthorizedPermission])
def deleteNotes(request, id):
    try:
        note = Notes.objects.get(id=id)
        Notes.objects.filter(id=note.id).delete()
        return Response({"message": "note deleted"}, status=status.HTTP_204_NO_CONTENT)
    except Notes.DoesNotExist:
        return Response({"message": "note not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
@permission_classes([IsAuthorizedPermission])
def getNote(request, id) -> Response:
    try:
        note = Notes.objects.get(id=id)
        parsedNote = NotesSerializer(note).data
        return Response({"note": parsedNote}, status=status.HTTP_200_OK)
    except Notes.DoesNotExist:
        return Response({"message": "note not found"}, status=status.HTTP_404_NOT_FOUND)

