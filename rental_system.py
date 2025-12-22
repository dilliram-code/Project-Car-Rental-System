from datetime import date
from models import Car, SUV, Bike, Vehicle
from customers import Customer
from pricising import PricingStrategy, FlatRateStrategy
import json
import uuid

# custom exceptions
class VehicleUnavailableError(Exception):
    pass

class CustomerNotFoundError(Exception):
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

    # rental operations
    def rent_vehicle(self, customer_id:str, vehicle_id:str, start:date, days:int):
        if customer_id not in self.customers:
            raise CustomerNotFoundError(customer_id)
        if vehicle_id not in self.vehicles:
            raise VehicleUnavailableError("Vehicle doesn't exist.")
        
        vehicle = self.vehicles(vehicle_id)
        if not vehicle.is_available:
            raise VehicleUnavailableError("Vehicle not available.")
        
        price = self.pricing_strategy.calculate_price(vehicle,days)
        rental_id = str(uuid.uuid4())
        rental_record = {
            "id": rental_id,
            "vehicle_id": vehicle_id,
            "customer_id": customer_id,
            "start_date": start.isoformat(),
            "planned_days": days,
            "price": price,
            "is_active": True
        }
        vehicle.is_available = False
        self.rentals[rental_id] = rental_record
        
        return rental_record

    def return_vehicle(self, rental_id:str, return_date: date):
        rental = self.rentals.get(rental_id)
        if not rental:
            raise RentalNotFoundError(rental_id)
        if not rental["is_active"]:
            raise ValueError("Rental already closed.")
        
        vehicle = self.vehicles[rental["vehicle_id"]]
        planned_days = rental["planned_days"]
        start = date.fromisoformat(rental["start_date"])
        actual_days = (return_date - start).days or 1

        