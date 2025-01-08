from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

from .models import CustomUser
from worker.models import CustomWorker

from rest_framework.authentication import CSRFCheck
from rest_framework.exceptions import APIException
from rest_framework.test import APIRequestFactory

from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
import json


def handle401(refresh, access):
    response = JsonResponse({'message': 'Unauthorized.'}, status=401)
    response.delete_cookie(refresh)
    response.delete_cookie(access)
    response.delete_cookie('csrftoken')
    return response

class BlockedUserException(APIException):
    status_code = 403  # Forbidden status code
    default_detail = 'You are blocked by admin.'
    default_code = 'blocked_user'

def enforce_csrf(get_response):
    def middleware(request):
        check = CSRFCheck()
        check.process_request(request)
        reason = check.process_view(request, None, (), {})
        if reason:
            raise AuthenticationFailed(f'CSRF Failed: {reason}')
        response = get_response(request)
        return response
    return middleware


class customAuthentication(JWTAuthentication):

    def get_user(self, validated_token):
        user_type = validated_token.get('user_type')
        if user_type == 'user':
            try:
                user = CustomUser.objects.get(id = validated_token['user_id'])
            except CustomUser.DoesNotExist:
                raise AuthenticationFailed('User not found')
            return user
        
        elif user_type == 'worker':
            try:
                worker = CustomWorker.objects.get(id = validated_token['worker_id'])
            except CustomWorker.DoesNotExist:
                raise AuthenticationFailed('User not found')
            return worker
        
        raise AuthenticationFailed('Invalid user type')
    
    def get_tokens(self, request):
        """Retrieve access and refresh tokens based on request path."""
        if request.path.startswith('/worker/'):
            access = 'worker_access_token'
            refresh = 'worker_refresh_token'
            user_type = 'worker'
        else:
            access = 'access_token'
            refresh = 'refresh_token'
            user_type = 'user'

        return request.COOKIES.get(access), request.COOKIES.get(refresh), access, refresh, user_type
             

    def authenticate(self, request):
        from rest_framework_simplejwt.views import TokenRefreshView
        header = self.get_header(request)

        if header is None:
            access_token, refresh_token, access_key, refresh_key, user_type = self.get_tokens(request)

        request.META['USER_TYPE'] = user_type

        if access_token is None:
            print('none')
            return None

        try:
            validated_token = self.get_validated_token(access_token)
            print(access_token,validated_token, 'raw')
        except Exception as e:
            print('hi')
            if refresh_token is None:
                    raise AuthenticationFailed('Authentication credentials were not provided.')
            try:
                factory = APIRequestFactory()
                token_refresh_request = factory.post('/api/token/refresh/', data=json.dumps({'refresh': refresh_token}), content_type='application/json')

                token_refresh_view = TokenRefreshView.as_view()
                response = token_refresh_view(token_refresh_request)
                print(response, 'response')

                if response.status_code == 200:
                    new_access_token = response.data.get('access')
                    validated_token = self.get_validated_token(new_access_token)
                    print(validated_token, 'val')
                    request.META['NEW_ACCESS_TOKEN'] = new_access_token
                elif response.status_code == 401:
                    print(response.data, 'err')
                    raise AuthenticationFailed({'message':'Refresh token is not valid.'})
            except Exception as e:
                    raise AuthenticationFailed('Refresh token is expired.')

        enforce_csrf(request)
        user = self.get_user(validated_token)
        if not user.is_active:
            token = RefreshToken(refresh_token)
            token.blacklist()
            response = JsonResponse({'message': 'You are blocked by admin.', 'user_type':user_type}, status=401)
            response.delete_cookie(refresh_key)
            response.delete_cookie(access_key)
            response.delete_cookie('csrftoken')
            raise AuthenticationFailed({'message':'User is blocked by admin.', 'type':'block'})
        print('hiiiii')
        request.user = user
        print(request.user, 'from auth user')
        return user, validated_token