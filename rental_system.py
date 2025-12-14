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

class RentalSystem:
    def __init__(self, pricing_strategy: PricingStrategy = None):
        self.vehicles = {}
        self.customers = {}
        self.rentals = {}
        self.pricing_strategy = pricing_strategy or FlatRateStrategy()
        
    # crud helpers
    def add_vehicle(self, vehicle: Vehicle):
        self.vehicles[vehicle.id] = vehicle
    
    def register_customer(self, customer: Customer):
        if not customer.can_rent():
            raise ValueError("Customer must have a valid license.")
        self.customers[customer.id] = customer