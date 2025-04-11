from django.urls import path
from .views import ChatAPIView
from .views import ChatAPIView, ChatHistoryAPIView



urlpatterns = [
    path('chat/', ChatAPIView.as_view(), name='chat-api'),
    path('history/', ChatHistoryAPIView.as_view(), name='chat-history'),

]
