import jwt, re
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from channels.exceptions import DenyConnection


User = get_user_model()

class JWTAuthMiddleware(BaseMiddleware):
    """
    Custom WebSocket Middleware to authenticate user via JWT stored in HttpOnly cookies.
    """

    async def __call__(self, scope, receive, send):
        headers = dict(scope.get("headers", []))
        cookies = self.get_cookies(headers)

        access_token, refresh_token, access_key, refresh_key, user_type, user_id, worker_id = self.get_tokens(cookies, scope)

        scope["user_type"] = user_type

        if not access_token:
            raise DenyConnection("Authentication failed: No token provided.")

        user = await self.get_user(access_token, refresh_token, refresh_key, user_type, user_id, worker_id)
        
        if user is None:
            raise DenyConnection("Authentication failed: Invalid token.")
        
        scope["user"] = user
        
        return await super().__call__(scope, receive, send)

    def get_cookies(self, headers):
        """
        Extract cookies from headers.
        """
        cookies = {}
        raw_cookie = headers.get(b"cookie", b"").decode()
        if raw_cookie:
            cookie_pairs = raw_cookie.split("; ")
            for pair in cookie_pairs:
                key, value = pair.split("=")
                cookies[key] = value
        return cookies

    def get_tokens(self, cookies, scope):
        """
        Retrieve access and refresh tokens from cookies based on the request path.
        """
        match = re.match(r"^/ws/(?P<service>chat|notification)/(?P<role>\w+)/(?P<user_id>\w+)/(?P<worker_id>\w+)/?$", scope["path"])

        if match:
            user_id = match.group("user_id")
            worker_id = match.group("worker_id")
            role = match.group("role")
        else:
            match = re.match(r"^/ws/(?P<service>chat|notification)/(?P<role>\w+)/(?P<user_id>\w+)/?$", scope["path"])
            user_id = match.group("user_id")
            worker_id = None
            role = match.group("role")

        if role == 'worker':
            access = "worker_access_token"
            refresh = "worker_refresh_token"
            user_type = "worker"
        else:
            access = "access_token"
            refresh = "refresh_token"
            user_type = "user"

        return cookies.get(access), cookies.get(refresh), access, refresh, user_type, user_id, worker_id

    @database_sync_to_async
    def get_user(self, access_token, refresh_token, refresh_key, user_type,user_id, worker_id):
        """
        Decode JWT token and fetch the user.
        """
        from accounts.models import CustomUser
        from worker.models import CustomWorker
        try:
            validated_token = JWTAuthentication().get_validated_token(access_token)
            if user_type == 'user':
                if user_id != validated_token["user_id"]:
                    return DenyConnection("You donot have permission to access.")
                if user_type == 'worker':
                    if worker_id != validated_token["user_id"]:
                        return DenyConnection("You donot have permission to access.")
            user_id = validated_token["user_id"] if user_type == "user" else validated_token["worker_id"]

            if user_type == "user":
                return CustomUser.objects.get(id=user_id)
            elif user_type == "worker":
                return CustomWorker.objects.get(id=user_id)

        except Exception as e:
            # Try refreshing the access token
            if refresh_token:
                return self.refresh_access_token(refresh_token, refresh_key, user_type)
            return None

    @database_sync_to_async
    def refresh_access_token(self, refresh_token, refresh_key, user_type):
        """
        Refresh the access token if it's expired.
        """
        from rest_framework_simplejwt.tokens import RefreshToken
        from accounts.models import CustomUser
        from worker.models import CustomWorker

        try:
            refresh = RefreshToken(refresh_token)
            new_access_token = str(refresh.access_token)

            # validated_token = UntypedToken(new_access_token)
            validated_token = JWTAuthentication().get_validated_token(new_access_token)
            user_id = validated_token["user_id"] if user_type == "user" else validated_token["worker_id"]

            if user_type == "user":
                return CustomUser.objects.get(id=user_id)
            elif user_type == "worker":
                return CustomWorker.objects.get(id=user_id)
        except Exception:
            return None