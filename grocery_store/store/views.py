from django.shortcuts import render
from django.http import HttpResponse,HttpRequest, JsonResponse
from .forms import UserForm, ProductForm, CartForm
from .models import User, Product, Cart
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User as authUser
from django.contrib.auth import authenticate, login as userLogin, logout as userLogout, get_user
import json
from itertools import permutations

# Create your views here.
def onload(req):
    obj = list(User.objects.all().values())
    return HttpResponse(obj)

@csrf_exempt
def signup(req):
    if req.method == 'POST':
        form = UserForm(req.POST, req.FILES)
        print(form.data)
        if form.is_valid():
            user = authUser.objects.create_user(username=form.data.get('username'), password=form.data.get('password'),email=form.data.get('email'))
            user.save()
            form.save()
            return JsonResponse({"saved": "true"})
        else:
            return JsonResponse({"saved": "false"})
    return HttpResponse("failed")

@csrf_exempt
def login(req):
    try:
        data = json.loads(req.body)  # Parse JSON data
        uname = data.get('uname')
        passw = data.get('pass')
        authuser = authenticate(req, username=uname, password=passw)
        
        if uname == 'admin' and passw == 'admin123' and authuser:
            userLogin(req, authuser)
            return JsonResponse({'status': 'A', 'signin': 'true'})
        obj = User.objects.filter(username=uname, password=passw)
        if obj:
            return JsonResponse({'status': 'U', 'signin': 'true'})
        else:
            return JsonResponse({'status': 'U', 'signin': 'false'})
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)

@csrf_exempt
# @login_required(redirect_field_name='products/', login_url='login/')
def products(req):
    if req.method == 'POST':
        try:
            form = ProductForm(req.POST, req.FILES)
            if form.is_valid():
                form.save()
                return JsonResponse({"saved": "true"})
            else:
                return JsonResponse({"saved": "false", "errors": form.errors})
        except:
            return JsonResponse({"saved": "false", "errors": "Invalid form data"}, status=400)
    else:
        return JsonResponse(list(Product.objects.all().values()), safe=False)
    
@csrf_exempt
def addToCart(req):
    if req.method == 'POST':
        data = req.POST
        obj = Cart.objects.filter(username=data['username'], product_id=data['product_id'])
        if not obj:
            form = CartForm(req.POST)
            if form.is_valid():
                form.save()
                return JsonResponse({"saved": "true"})
            else:
                return JsonResponse({"saved": "false"})
        else:
            obj[0].quantity += 1
            obj[0].save()
            return JsonResponse({"saved": "true"})
    elif req.method == "GET":
        uname = req.GET.get('uname')
        cartItems = list(Cart.objects.filter(username=uname))
        items = []
        for item in cartItems:
            items.append((Product.objects.filter(product_id=item.product_id_id).values()[0], item.quantity))
        return JsonResponse({"products": items})

def logout(req):
    user = authUser.objects.filter(username=req.GET['username'])
    userLogout(request=req)
    return JsonResponse({"logout": "true"}) 

def buyProducts(req):
    if req.method == 'GET':
        data = req.GET
        items = Cart.objects.filter(username=data['username'])
        cartItems = list(items)
        for item in cartItems:
            product = Product.objects.filter(product_id=item.product_id_id)[0]
            print(product)
            product.quantity -= item.quantity
            product.save()
        items.all().delete()
        return JsonResponse({'orderSuccessful': 'true'})
    