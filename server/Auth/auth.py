from rest_framework import permissions
from rest_framework import permissions
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
class IsAuthorizedPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        
        # Get the JWT token from the Authorization header
        auth_header = request.headers.get('Authorization', None)
        
        if not auth_header:
            return False

        try:
            # Remove 'Bearer' prefix if it exists
            token = auth_header.split(' ')[1]
            
            # Decode the JWT token
            untoken = UntypedToken(token)

            # Get the payload
            jwt_auth = JWTAuthentication()
            validated_token = jwt_auth.get_validated_token(token)
            user = jwt_auth.get_user(validated_token)

            # Extract the role claim
            role = validated_token.get('role', None)
            print(f'Role: {role}')

            # Allow access if role is user or admin
            if role in ['user', 'admin']:
                return True
            else:
                return False
        except (IndexError, InvalidToken, TokenError) as e:
            print(f'Token error: {e}')
            return False
        
        return False
class IsAdminPermission(permissions.BasePermission):
    pass
