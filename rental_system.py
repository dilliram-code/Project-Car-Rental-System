from datetime import date
from models import Car, SUV, Bike, Vehicle
from customers import Customer
from pricising import PricingStrategy, FlatRateStrategy
import json
import uuid

# custom exceptions
class VehicleUnavailableError(Exception):
    pass

class CustomerNotFoundErro(Exception):
    pass

class RentalNotFoundError(Exception):
    pass


