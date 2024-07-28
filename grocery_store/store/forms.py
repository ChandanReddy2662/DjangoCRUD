from django import forms
from .models import User, Product, Cart

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['name', 'age', 'gender', 'phone_number','username', 'password', 'email', 'profile_photo']
    
class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'price', 'description', 'image', 'category', 'quantity', 'product_id']
class CartForm(forms.ModelForm):
    class Meta:
        model = Cart
        fields = ['username', 'product_id']