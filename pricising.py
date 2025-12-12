from abc import ABC, abstractmethod


class PricingStrategy(ABC):
    @abstractmethod
    def calculate_price(self, vehicle, days:int) -> float:
        pass

class FlatRateStrategy(PricingStrategy):
    def calculate_price(self, vehicle, days: int) -> float:
        return vehicle.get_rate() * days

class TieredRateStrategy(PricingStrategy):
    def calculate_price(self, vehicle, days):
        rate = vehicle.get_rate()
        if days >= 7:
            return rate * days * 0.9         # 10 % discount for weekly rentals
        return rate * days
