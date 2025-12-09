from abc import ABC, abstractmethod
from dataclasses import dataclass, asdict
from datetime import time, timedelta
import uuid

# VEHICLES - abstraction + inheritance
@dataclass
class Vehicle(ABC):
    id: str
    make: str
    model: str
    year: int
    base_rate_per_day: float
    is_available: bool = True

    def __post_init__(self):
        if not self.id:
            self.id = str(uuid.uuid4())
    
    def vehicle_type(self) -> str:
        '''Return subclass provides its type name'''
        pass

    def get_rate(self) -> float:
        '''Return base rate - subclasses may override.'''
        return self.base_rate_per_day

@dataclass
class Car(Vehicle): 
    seats: int = 4

    def vehicle_type(self) -> str:
        return "Car"

@dataclass
class SUV(Vehicle):
    seats: int = 7
    four_wheel_drive: bool = False

    def vehicle_type(self) -> str:
        return "SUV"
    
    def get_rate(self):
        # example of polymorphism: SUVs cost 15% extra
        return self.base_rate_per_day * 1.15