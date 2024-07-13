from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from Users.models import Users
# registers user and returns token
# todo add exception handling
@api_view(["POST"])
def register(request) -> Response:
    newUser = request.data
    username, password = newUser["username"], newUser["password"]
    if username == "" or password == "":
        return Response({"message": "username or password cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)
    exists = Users.objects.filter(username=username).exists()
    if exists:
        return Response({"message": "username already exists"}, status=status.HTTP_409_CONFLICT)

    Users.objects.create(username=username, password=password)
    #create the token with the username, email, role
    tokenClaims = {
        "username": username,
        "role": "user",
    }

    return Response({"message": "register new user"}, status=status.HTTP_201_CREATED)

# logs user in and returns token
@api_view(["POST"])
def login(request) -> Response:
    return Response({"message": "login user"}, status=status.HTTP_200_OK)
