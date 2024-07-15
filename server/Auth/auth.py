from rest_framework import permissions
from rest_framework import permissions
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
def getRole(token):
    untoken = UntypedToken(token)

    jwt_auth = JWTAuthentication()
    validated_token = jwt_auth.get_validated_token(token)
    user = jwt_auth.get_user(validated_token)
    role = validated_token.get('role', None)
    return role


class IsAuthorizedPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        
        try:
            auth_header = request.headers.get('Authorization', None)
        
            if not auth_header:
                return False
            token = auth_header.split(' ')[1]
            role: str = getRole(token) 

            if role in ['user', 'admin']:
                return True
            else:
                return False
        except (IndexError, InvalidToken, TokenError) as e:
            return False
        
        return False


class IsAdminPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            auth_header = request.headers.get('Authorization', None)
        
            if not auth_header:
                return False
            token = auth_header.split(' ')[1]
            role: list = getRole(token) 

            if role == 'admin':
                return True
            else:
                return False
        except (IndexError, InvalidToken, TokenError) as e:
            return False
        
        return False
