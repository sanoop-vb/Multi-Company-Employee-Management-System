from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from . import views
from .views import DepartmentViewSet, RoleViewSet, AttendanceViewSet, LeaveViewSet, CompanyViewSet, EmployeeViewSet, login_user

router = DefaultRouter()
router.register(r'company', CompanyViewSet)
router.register(r'employee', EmployeeViewSet)
router.register(r'department', DepartmentViewSet)
router.register(r'role', RoleViewSet)
router.register(r'attendance', AttendanceViewSet)
router.register(r'leave', LeaveViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/login/', views.login_user, name='login'),
    path('api/attendance-summary/', views.attendance_summary, name='attendance-summary'),
    path('api/leave-summary/', views.leave_summary, name='leave-summary'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

'''urlpatterns = [
    path('company/', views.company),
    path('company/<id>/', views.company),
    path('employee/', views.company),
    path('employee/<id>/', views.company),
]'''