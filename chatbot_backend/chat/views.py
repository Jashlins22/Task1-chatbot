# from django.conf import settings
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from openai import AzureOpenAI
# import os
 
# class ChatAPIView(APIView):
#     def post(self, request):
#         try:
#             # Ensure JSON data is present
#             if not request.data:
#                 return Response({"error": "Empty request body"}, status=status.HTTP_400_BAD_REQUEST)
 
#             data = request.data  # DRF automatically handles JSON parsing
#             user_message = data.get("message")
 
#             if not user_message:
#                 return Response({"error": "Message field is required"}, status=status.HTTP_400_BAD_REQUEST)
 
#             # Initialize Azure OpenAI client
#             client = AzureOpenAI(
#                 azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
#                 api_key=os.getenv("AZURE_OPENAI_API_KEY"),
#                 api_version="2024-02-01"
#             )
 
#             # Call OpenAI API
#             response = client.chat.completions.create(
#                 model="gpt-35-turbo",
#                 messages=[
#                     {"role": "system", "content": "You are a helpful assistant."},
#                     {"role": "user", "content": user_message}
#                 ]
#             )
 
#             return Response({"response": response.choices[0].message.content}, status=status.HTTP_200_OK)
 
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import openai

from .models import Message  # ✅ Import Message model
from rest_framework.generics import ListAPIView
from .serializers import ChatMessageSerializer
from rest_framework.permissions import AllowAny


class ChatHistoryAPIView(ListAPIView):
    queryset = Message.objects.all().order_by('timestamp')
    serializer_class = ChatMessageSerializer
    permission_classes = [AllowAny]


class ChatAPIView(APIView):
    def post(self, request):
        user_message = request.data.get("message", "")

        # Save user's message to DB
        Message.objects.create(sender="user", message=user_message)

        openai.api_type = "azure"
        openai.api_key = settings.AZURE_OPENAI_API_KEY
        openai.api_base = settings.AZURE_OPENAI_ENDPOINT
        openai.api_version = settings.AZURE_OPENAI_API_VERSION

        try:
            response = openai.ChatCompletion.create(
                engine=settings.AZURE_OPENAI_DEPLOYMENT_NAME,
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": user_message},
                ]
            )
            ai_reply = response["choices"][0]["message"]["content"]

            # Save bot's reply to DB
            Message.objects.create(sender="bot", message=ai_reply)

            return Response({"reply": ai_reply}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
