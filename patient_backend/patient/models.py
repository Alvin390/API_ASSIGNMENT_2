from django.db import models

# Create your models here.

class Patient(models.Model):
    patient_id = models.BigAutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    blood = models.CharField(max_length=10)

    def __str__(self):
        return self.first_name
