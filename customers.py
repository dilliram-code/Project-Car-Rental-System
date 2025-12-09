from dataclasses import dataclass
import uuid

@dataclass
class Customer:
    id: str
    name: str
    license_number: str

    def __post_init__(self):
        if not self.id:
            self.id = str(uuid.uuid4())
    
    def can_rent(self) -> bool:
        # simple validation
        return bool(self.license_number and self.license_number.strip())
