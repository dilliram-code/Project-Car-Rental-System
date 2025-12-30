from rental_system import RentalSystem
from models import Car, SUV, Bike
from customers import Customer
from pricising import TieredRateStrategy
from datetime import date

system = RentalSystem(pricing_strategy=TieredRateStrategy())

# Add vehicles
car = Car(id="", make="Toyota", model="Corolla", year=2020, base_rate_per_day=50.0)
suv = SUV(id="", make="Hyundai", model="Palisade", year=2021, base_rate_per_day=80.0, four_wheel_drive=True)
bike = Bike(id="", make="Yamaha", model="R15", year=2019, base_rate_per_day=20.0)
for v in [car, suv, bike]:
    system.add_vehicle(v)
