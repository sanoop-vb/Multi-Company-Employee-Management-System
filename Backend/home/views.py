from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Company, Employee, Attendance, LeaveRequest, Department, Role
from .serializers import CompanySerializer, EmployeeSerializer, AttendanceSerializer, LeaveRequestSerializer, DepartmentSerializer, RoleSerializer
from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
'''@api_view(['GET','POST','PUT','PATCH','DELETE'])
def company(request, id=None):
    if request.method == 'GET':
        company = Company.objects.all()
        serializer = CompanySerializer(company, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = request.data
        serializer = CompanySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    elif request.method == 'PUT':
        data = request.data
        obj = Company.objects.get(id = id)
        serializer = CompanySerializer(obj, data=data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    elif request.method == 'PATCH':
        data = request.data
        obj = Company.objects.get(id=id)
        serializer = CompanySerializer(obj, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    else:
        obj = Company.objects.get(id = id)
        obj.delete()
        return Response({"Message" : "Company Deleted"})

@api_view(['GET','POST','PUT','PATCH','DELETE'])
def employee(request, id=None):
    if request.method == 'GET':
        employee = Employee.objects.all()
        serializer = EmployeeSerializer(employee, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = request.data
        serializer = EmployeeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    elif request.method == 'PUT':
        data = request.data
        obj = Employee.objects.get(id = id)
        serializer = EmployeeSerializer(obj, data=data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    elif request.method == 'PATCH':
        data = request.data
        obj = Employee.objects.get(id=id)
        serializer = EmployeeSerializer(obj, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    else:
        obj = Employee.objects.get(id = id)
        obj.delete()
        return Response({"Message" : "Employee Deleted"})'''

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username': user.username,
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=400)

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

class LeaveViewSet(viewsets.ModelViewSet):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer

@api_view(['GET'])
def attendance_summary(request):
    present = Attendance.objects.filter(clock_in__isnull=False, clock_out__isnull=False).count()
    absent = Attendance.objects.filter(clock_in__isnull=True, clock_out__isnull=True).count()
    late = Attendance.objects.filter(clock_in__hour__gt=9.00).count()  # Example for late after 9 AM
    print(request.user)
    return Response({'present': present, 'absent': absent, 'late': late})

@api_view(['GET'])
def leave_summary(request):
    pending = LeaveRequest.objects.filter(status='Pending').count()
    approved = LeaveRequest.objects.filter(status='Approved').count()
    rejected = LeaveRequest.objects.filter(status='Rejected').count()
    return Response({'pending': pending, 'approved': approved, 'rejected': rejected})