from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Employee
from .models import Company
from .models import Department
from .models import Role
from .models import Attendance

# Register your models here.
admin.site.register(Employee)
admin.site.register(Company)
admin.site.register(Department)
admin.site.register(Role)
admin.site.register(Attendance)