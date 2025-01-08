from django.conf import settings
from django.http import JsonResponse

class TokenRefreshMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        response = self.get_response(request)
        new_access_token = request.META.get('NEW_ACCESS_TOKEN', None)
        
        if new_access_token:
            if request.META['USER_TYPE'] == 'worker':
                access = 'worker_access_token'
            else:
                access = settings.SIMPLE_JWT['AUTH_COOKIE']
            print('from middleware', new_access_token)
            response.set_cookie(
                key = access,
                value = new_access_token,
                secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )
        
        if response.status_code == 401:
            user_type = request.META['USER_TYPE']
            if user_type == 'worker':
                access = 'worker_access_token'
                refresh = 'worker_refresh_token'
            else:
                access = settings.SIMPLE_JWT['AUTH_COOKIE']
                refresh = 'refresh_token'
            print('401 eerr', refresh, access)
            response.delete_cookie(refresh)
            response.delete_cookie(access)
            response.delete_cookie('csrftoken')
            response_data  = response.data if hasattr(response, 'data') else {}
            response_data['user_type'] = user_type
            response_data['detail'] = response_data.get('detail', 'Authentication credentials were not provided.')
            
            response.data = response_data
            print(response, 'response', response.data)
            return JsonResponse(response_data, status=401)
        return response
        