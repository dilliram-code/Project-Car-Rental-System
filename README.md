# 🚗 AuraDrive — Next-Gen Glassmorphic Car Rental System

[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![UI](https://img.shields.io/badge/UI-HTML5%20%7C%20CSS3%20%7C%20ES6%2B-purple.svg)](#-ui-highlights)
[![Style](https://img.shields.io/badge/Style-Glassmorphism%20%26%20Responsive-cyan.svg)](#-glassmorphic-design-system)
[![Architecture](https://img.shields.io/badge/OOP-Polymorphism%20%26%20Strategy-emerald.svg)](#-architecture--oop-principles)

A modern, elegant, industry-grade **Car Rental System** built with **Python OOP** on the backend and an interactive **Glassmorphic web interface** created with HTML5, CSS3, and modern JavaScript (ES6+). Fully responsive across mobile, tablet, and desktop screens.

---

## 🌟 Quick Start

You can run AuraDrive in two ways:

### 1. Launch with Python Server (Recommended)
```bash
python3 server.py
```
> This starts the built-in server at **`http://localhost:8000`** and automatically opens your default browser!

### 2. Standalone Browser Run (Zero Dependencies)
Simply open **`index.html`** directly in Chrome, Safari, Edge, or Firefox. Everything works seamlessly client-side using `localStorage`!

---

## 🎨 Glassmorphic Design System & Visuals

- **Deep Frosted Glass Aesthetics**: Multi-tier backdrop blur (`backdrop-filter: blur(20px) saturate(180%)`), translucent borders with linear specular highlights, and neon ambient glows.
- **Ambient Animated Light Orbs**: Floating multi-colored neon spheres (cyan, purple, emerald, rose) in the background mesh giving real depth behind the glass panels.
- **Dark & Light Glass Themes**: Instant toggle between *Obsidian Cyber Glass* and *Frosted Crystal Pearl Glass*, persisted in browser storage.
- **3D Card Transitions & Hover Micro-Interactions**: Smooth card lifts, interactive scale, radial button highlights, and real-time radar pulsing status indicators.
- **Fluid Multi-Device Responsiveness**:
  - 📱 **Mobile (< 640px)**: Compact view, touch-friendly duration steppers, mobile drawer menu, swipeable filter pills.
  - 📱 **Tablet (641px - 1024px)**: 2-column responsive layout, compact data tables.
  - 💻 **Desktop & 4K (> 1024px)**: Auto-fit multi-column cards, interactive specs sheets, and side-by-side metric dashboards.

---

## ⚡ Core Features & Added Capabilities

### 1. Fleet Showcase & Exploration
- Curated high-resolution fleet across **Cars**, **SUVs (4WD)**, **Sports Bikes**, and **Electric Vehicles (EVs)**.
- **Live Search**: Instant multi-attribute search across make, model, year, and equipment.
- **Dynamic Filters**: Filter by category (Car, SUV, Bike), availability status (Available, Rented), and dynamic price range slider ($15 - $300+/day).
- **Sorting**: Featured, Price: Low to High, Price: High to Low, Year: Newest, Make: A-Z.
- **Vehicle Specification Sheet**: Modal with deep specs, drivetrains, fuel/battery capacity, and included equipment tags.

### 2. Rental Dispatch Protocol (Live Booking Wizard)
- Interactive date picker and duration stepper.
- **Driver Verification**: Validates driver license existence before allowing rental authorization (`canRent()` check).
- **Reactive Price Calculator**:
  - Displays base rate.
  - Shows automatic **+15% SUV surcharge** if applicable.
  - Shows **10% weekly discount** for rentals $\ge 7$ days under Tiered Pricing Strategy.

### 3. Check-in & Settle Return Workflow
- One-click vehicle return modal with return date picker.
- **Automatic Surcharge & Overdue Penalties**:
  - Compares planned vs. actual rental days.
  - Automatically calculates late fee surcharge (**20% daily surcharge penalty** per overdue day, matching `rental_system.py`).
- **Official Glassmorphic Receipt / Invoice**:
  - Itemized digital receipt with print/save PDF capability.

### 4. Fleet Management & Customer Registry
- **Add Vehicle to Fleet**: Add custom Cars, SUVs (with 4WD toggle and 7-seater config), or Bikes with quick photo presets.
- **Customer Directory**: Add verified drivers, inspect contact info, license status, and rental histories.

### 5. Analytics & JSON Hub
- Real-time KPI metrics: Fleet Utilization Rate, Active Dispatches, Completed Returns, and Total Revenue.
- **Data Persistence**: Changes persist in `localStorage`.
- **JSON Import / Export**: Export entire fleet, customer list, and rental records to a JSON file completely compatible with `RentalSystem.save_to_file` and `RentalSystem.load_from_file`!
- **Demo Reset**: One-click restore to rich initial fleet state.

---

## 🧠 Architecture & OOP Principles

The project preserves and expands the core Object-Oriented principles:

1. **Abstraction (`models.py`)**: `Vehicle` and `PricingStrategy` abstract base classes defining contract methods like `get_rate()`, `vehicle_type()`, and `calculate_price()`.
2. **Inheritance (`models.py`)**: `Car`, `SUV`, and `Bike` inherit common attributes (`id`, `make`, `model`, `year`, `base_rate_per_day`) from `Vehicle`.
3. **Polymorphism (`models.py` & `pricising.py`)**:
   - `SUV.get_rate()` overrides base rate with a `+15%` surcharge.
   - `TieredRateStrategy` discounts weekly bookings by `10%` for $\ge 7$ days, while `FlatRateStrategy` charges standard rate $\times$ days.
4. **Encapsulation (`customers.py` & `rental_system.py`)**:
   - Driver validation logic encapsulated in `Customer.can_rent()`.
   - Rental state transitions and late fee protection encapsulated in `RentalSystem`.

---

## 📁 Project Structure

```
Project-Car-Rental-System/
├── index.html          # Modern, semantic Glassmorphic HTML5 web application
├── style.css           # Industrial-grade responsive Glassmorphic CSS design system
├── app.js              # State management, OOP models, reactive price calculators, UI controllers
├── server.py           # Zero-dependency Python HTTP server & static asset dispatcher
├── rental_system.py    # Core Python OOP RentalSystem implementation
├── models.py           # Python Vehicle, Car, SUV, Bike classes
├── customers.py        # Python Customer class with license validation
├── pricising.py        # Python FlatRateStrategy & TieredRateStrategy
├── example_usage.py    # Console demonstration script
└── README.md           # Documentation
```

---

## 👨‍💻 Author

**Dilli Ram Chaudhary**  
*Data Science Enthusiast | Python Developer*  
📍 Nepal
