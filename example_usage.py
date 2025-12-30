from rental_system import RentalSystem
from models import Car, SUV, Bike
from customers import Customer
from pricising import TieredRateStrategy
from datetime import date, timedelta

system = RentalSystem(pricing_strategy=TieredRateStrategy())

# Add vehicles
car = Car(id="", make="Toyota", model="Corolla", year=2020, base_rate_per_day=50.0)
suv = SUV(id="", make="Hyundai", model="Palisade", year=2021, base_rate_per_day=80.0, four_wheel_drive=True)
bike = Bike(id="", make="Yamaha", model="R15", year=2019, base_rate_per_day=20.0)

for v in [car, suv, bike]:
    system.add_vehicle(v)

# register customer
customer = Customer(id="", name="Alisha", license_number="L-12345")
system.register_customer(customer)

# rent car 3 days
rental = system.rent_vehicle(customer.id, car.id, date.today(), days=3)
# print("Rented: ", rental)

# return car after 4 days (1 late day)
today = date.today()                            # print(today)
future_date = today + timedelta(days=3)
returned = system.return_vehicle(rental['id'], future_date)
print("Returned: ", returned)

# FUTURE GOAL: add more functionality regarding the output 