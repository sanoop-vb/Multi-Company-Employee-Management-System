from django.http import HttpResponse

def allow_users(allow_role=[]):
    def decorator(view_func):
        def wrapper_func(request, *args, **kwargs):
            group=None
            if request.user.groups.exists():
                group=request.user.groups.all()[0].name
            if group in allow_role:
                return view_func(request, *args, **kwargs)
            else:
                return HttpResponse("Warning! You are not Authorized to view this page.")
        return wrapper_func
    return decorator