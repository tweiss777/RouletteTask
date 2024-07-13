from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from Users.models import Users
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

'''helper function to generate token'''
def generateToken(user) -> str:
    refresh =RefreshToken.for_user(user)
    refresh["username"] = user.username
    refresh["role"] = user.role
    return str(refresh.access_token)

@api_view(["POST"])
def register(request) -> Response:
    try:
        newUser = request.data
        username, password, confirmPassword = newUser["username"], newUser["password"], newUser["confirm_password"]
        if username == "" or password == "":
            return Response({"message": "username or password cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)
    
        if password != confirmPassword:
            return Response({"message": "passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)
        exists = Users.objects.filter(username=username).exists()
        if exists:
            return Response({"message": "username already exists"}, status=status.HTTP_409_CONFLICT)

        Users.objects.create(username=username, password=password)
        token = generateToken(Users.objects.get(username=username))
        return Response({"token": token}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"message": "something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["POST"])
def login(request) -> Response:
    try: 
        loginUser = request.data
        username, password = loginUser["username"], loginUser["password"]
        if username == "" or password == "":
            return Response({"message": "invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED) 
        user = Users.objects.get(username=username)
        if user.password != password:
            return Response({"message": "invalid user or password"}, status=status.HTTP_401_UNAUTHORIZED)

        token = generateToken(user)
        return Response({"token": token}, status=status.HTTP_200_OK)

    except Users.DoesNotExist:
        return Response({"message": "invalid user or password"}, status=status.HTTP_401_UNAUTHORIZED)
