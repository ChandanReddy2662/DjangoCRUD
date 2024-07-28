from django.db import models

class User(models.Model):
    # Define gender choices
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]

    # Define status choices
    STATUS_CHOICES = [
        (1, 'Active'),
        (2, 'Inactive'),
        (3, 'Pending'),
    ]

    ROLE_CHOICES =[
        ('A', 'admin'),
        ('U', 'user')
    ]

    name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    phone_number = models.CharField(max_length=15)
    username = models.CharField(max_length=50, unique=True, primary_key=True)
    password = models.CharField(max_length=50)
    email = models.EmailField( max_length=254, null=True)
    status = models.IntegerField(choices=STATUS_CHOICES, default=1)
    profile_photo = models.ImageField(upload_to='images/', null=True)
    role = models.CharField(max_length=1, choices=ROLE_CHOICES, default='U')

    # def __str__(self):
    #     return self.name

class Product(models.Model):
    categoires = [
        ('F', 'Fruits'),
        ('B', 'Beverage'),
        ('V', 'Vegetables'),
        ('O', 'Other'),
    ]

    name = models.CharField(max_length=100)
    product_id = models.CharField(max_length=100, primary_key=True)
    description = models.TextField(max_length=500)
    price = models.IntegerField()
    image = models.ImageField(upload_to='images/', null=True)
    category = models.CharField(choices=categoires, default='V', max_length=25)
    quantity = models.IntegerField()

class Cart(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f'{self.username}:{self.product_id}:{self.quantity}'