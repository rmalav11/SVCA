from django.contrib.auth.models import User, Group
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import ReactMemberSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework.response import Response

from . import models


class PostOnlyPermissions(BasePermission):
    def has_permission(self, request, view):
        return request.method in ('POST',)


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class ReactMemberViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated|PostOnlyPermissions]
    queryset = models.ReactMember.objects.all()
    serializer_class = ReactMemberSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'name']

    # def get(self, request, format=None):
    #     return Response('a')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def reactMemberConfirmViewSet(request, member_id):
    member = get_object_or_404(models.ReactMember, pk=member_id)
    member.accepted = 1
    member.save()
    return HttpResponse(str(member.accepted))

# https://stackoverflow.com/questions/27592513/basic-django-rest-framework-write-only-resource
