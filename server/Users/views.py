from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# registers user and returns token
# todo add exception handling
@api_view(["POST"])
def register(request) -> Response:
    return Response({"message": "register new user"}, status=status.HTTP_201_CREATED)

# logs user in and returns token
@api_view(["POST"])
def login(request) -> Response:
    return Response({"message": "login user"}, status=status.HTTP_200_OK)
