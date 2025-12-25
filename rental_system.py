from datetime import date
from models import Car, SUV, Bike, Vehicle
from customers import Customer
from pricising import PricingStrategy, FlatRateStrategy
import json
import uuid
from dataclasses import asdict

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

        # simple late fee calculation: 20 % extra per day in case of late
        base_price = self.pricing_strategy.calculate_price(vehicle, min(actual_days, planned_days))
        late_days = max(0, actual_days - planned_days)
        late_fee = 0.2 * vehicle.get_rate() * late_days
        total = base_price + late_fee

        rental.update(
            {"end_date": return_date.isoformat(),
            "actual_days": actual_days,
            "late_days": late_days,
            "total_price": total,
            "is_active": False
            }
        )

        vehicle.is_available = True
        return rental
    
    # Search
    def search_available(self, vehicle_type:str = None):
        results = []
        for v in self.vehicles.values():
            if v.is_available and (vehicle_type is None or v.vehicle_type() == vehicle_type):
                results.append(v)
        return results 

    def save_to_file(self, path: str):
        data = {
            "vehicles": [asdict(v) for v in self.vehicles.values()],
            "customers": [asdict(c) for c in self.customers.values()],
            "rentals": list(self.rentals.values())
        }
        with open(path, "w") as f:
            json.dump(data, f, indent=2)
    
    def load_from_file(self, path:str):
        with open(path) as f:
            data = json.load(f)

            # ---------load vehicles ----------#
        self.vehicles = {}
        for v in data["vehicles"]:
            vehicle_type = v.pop("vehicle_type", None)

            if vehicle_type == "Car":
                vehicle =  Car(**v)
            elif vehicle_type == "SUV":
                vehicle = SUV(**v)
            elif vehicle_type == "Bike":
                vehicle = Bike(**v)
            else:
                raise ValueError("Unknown vehicle type")

            self.vehicles[vehicle.id] = vehicle
        
        # ---------load customers ---------#
        self.customers = {}
        for c in data['customers']:
            customer = Customer(**c)
            self.customers[customer.id] = customer