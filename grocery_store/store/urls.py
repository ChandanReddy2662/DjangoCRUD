from django.urls import path
from .views import onload, signup, login, products

urlpatterns = [
    path('', view=onload, name=''),
    path('signup/', view=signup, name='signup'),
    path('login/', view=login, name='login'),
    path('product/', view=products, name='product')
]
