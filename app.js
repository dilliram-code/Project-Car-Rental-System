/**
 * AURADRIVE - Advanced Glassmorphic Car Rental System
 * Pure JavaScript (ES6+), OOP Domain Architecture, LocalStorage Persistence
 * Designed for High Performance, Responsive Design, and Fluid Micro-Interactions
 */

// ============================================================================
// 1. DOMAIN MODELS (Mirroring Python OOP Classes)
// ============================================================================

class Vehicle {
  constructor(id, make, model, year, baseRatePerDay, isAvailable = true, imageUrl = '', features = []) {
    this.id = id || this.generateUUID();
    this.make = make;
    this.model = model;
    this.year = Number(year);
    this.baseRatePerDay = Number(baseRatePerDay);
    this.isAvailable = Boolean(isAvailable);
    this.imageUrl = imageUrl || this.getDefaultImage();
    this.features = features.length ? features : this.getDefaultFeatures();
  }

  generateUUID() {
    return 'veh-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36);
  }

  vehicleType() {
    return 'Vehicle';
  }

  getRate() {
    return this.baseRatePerDay;
  }

  getDefaultImage() {
    return 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';
  }

  getDefaultFeatures() {
    return ['Bluetooth Audio', 'Air Conditioning', 'GPS Navigation'];
  }
}

class Car extends Vehicle {
  constructor(id, make, model, year, baseRatePerDay, isAvailable = true, seats = 4, imageUrl = '', features = []) {
    super(id, make, model, year, baseRatePerDay, isAvailable, imageUrl, features);
    this.seats = Number(seats) || 4;
  }

  vehicleType() {
    return 'Car';
  }

  getDefaultImage() {
    return 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80';
  }
}

class SUV extends Vehicle {
  constructor(id, make, model, year, baseRatePerDay, isAvailable = true, seats = 7, fourWheelDrive = true, imageUrl = '', features = []) {
    super(id, make, model, year, baseRatePerDay, isAvailable, imageUrl, features);
    this.seats = Number(seats) || 7;
    this.fourWheelDrive = Boolean(fourWheelDrive);
  }

  vehicleType() {
    return 'SUV';
  }

  /**
   * Polymorphism: SUVs cost 15% extra per day
   */
  getRate() {
    return +(this.baseRatePerDay * 1.15).toFixed(2);
  }

  getDefaultImage() {
    return 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80';
  }
}

class Bike extends Vehicle {
  constructor(id, make, model, year, baseRatePerDay, isAvailable = true, engineCc = '155cc', imageUrl = '', features = []) {
    super(id, make, model, year, baseRatePerDay, isAvailable, imageUrl, features);
    this.engineCc = engineCc || '150cc';
  }

  vehicleType() {
    return 'Bike';
  }

  getDefaultImage() {
    return 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80';
  }
}

class Customer {
  constructor(id, name, licenseNumber, email = '', phone = '') {
    this.id = id || 'cust-' + Math.random().toString(36).substring(2, 9);
    this.name = name;
    this.licenseNumber = licenseNumber;
    this.email = email || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
    this.phone = phone || '+1 (555) 019-2834';
  }

  canRent() {
    return Boolean(this.licenseNumber && this.licenseNumber.trim().length > 0);
  }
}

// ============================================================================
// 2. PRICING STRATEGIES (Mirroring Python Strategy Pattern)
// ============================================================================

class PricingStrategy {
  calculatePrice(vehicle, days) {
    throw new Error('Abstract method');
  }
}

class FlatRateStrategy extends PricingStrategy {
  calculatePrice(vehicle, days) {
    return +(vehicle.getRate() * days).toFixed(2);
  }
}

class TieredRateStrategy extends PricingStrategy {
  calculatePrice(vehicle, days) {
    const rate = vehicle.getRate();
    if (days >= 7) {
      // 10% discount for weekly rentals (7+ days)
      return +(rate * days * 0.9).toFixed(2);
    }
    return +(rate * days).toFixed(2);
  }
}

// ============================================================================
// 3. SAMPLE SHOWCASE DATA
// ============================================================================

const INITIAL_VEHICLES = [
  new Car(
    'v-101', 'Toyota', 'Corolla Hybrid', 2023, 52.0, true, 4,
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=80',
    ['Fuel Efficient 52 MPG', 'Lane Tracing Assist', 'Apple CarPlay', 'Wireless Charging']
  ),
  new SUV(
    'v-102', 'Hyundai', 'Palisade Calligraphy', 2024, 85.0, true, 7, true,
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80',
    ['AWD All-Terrain', '7-Seater Nappa Leather', 'Heated & Ventilated Seats', 'Harman Kardon Audio']
  ),
  new Car(
    'v-103', 'Tesla', 'Model 3 Long Range', 2024, 78.0, true, 5,
    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=80',
    ['Autopilot Hardware 4.0', '341-Mile Range', '15-inch Touchscreen', 'Glass Panoramic Roof']
  ),
  new SUV(
    'v-104', 'Land Rover', 'Defender 110 X', 2023, 110.0, false, 7, true,
    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80',
    ['Air Suspension', 'Off-Road 4WD Mode', '360 3D Camera', 'Tow Hitch Capacity']
  ),
  new Bike(
    'v-105', 'Yamaha', 'YZF-R15 V4', 2023, 24.0, true, '155cc',
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80',
    ['Quick Shifter', 'Assist & Slipper Clutch', 'Dual Channel ABS', 'Traction Control']
  ),
  new Car(
    'v-106', 'Porsche', 'Taycan 4S Electric', 2024, 185.0, true, 4,
    'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=900&q=80',
    ['0-60 in 3.8s', 'Porsche Active Suspension', 'Launch Control', 'Burmester Surround Sound']
  ),
  new SUV(
    'v-107', 'BMW', 'X5 xDrive40i', 2023, 98.0, true, 7, true,
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80',
    ['TwinPower Turbo', 'Panoramic Sky Lounge', 'Gesture Control', 'Driving Assistant Professional']
  ),
  new Bike(
    'v-108', 'Ducati', 'Panigale V4 S', 2024, 65.0, true, '1103cc',
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80',
    ['215 Horsepower', 'Öhlins Smart EC 2.0', 'Cornering EVO ABS', 'Carbon Fiber Aero Wings']
  )
];

const INITIAL_CUSTOMERS = [
  new Customer('c-201', 'Alisha Shrestha', 'DL-98412-NP', 'alisha.s@gmail.com', '+977 9841234567'),
  new Customer('c-202', 'Dilli Ram Chaudhary', 'DL-88204-NP', 'dilliram@gmail.com', '+977 9801234567'),
  new Customer('c-203', 'Ethan Vance', 'DL-CA-49102-US', 'ethan.vance@tech.co', '+1 (415) 892-0192'),
  new Customer('c-204', 'Siddharth Gautam', 'DL-BA-33109-NP', 'siddharth@outlook.com', '+977 9811223344')
];

const INITIAL_RENTALS = [
  {
    id: 'rent-901',
    vehicle_id: 'v-104',
    customer_id: 'c-201',
    start_date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    planned_days: 5,
    price: 569.25,
    is_active: true
  }
];

// ============================================================================
// 4. APPLICATION STATE & SYSTEM CONTROLLER
// ============================================================================

class RentalApp {
  constructor() {
    this.vehicles = [];
    this.customers = [];
    this.rentals = [];
    this.currentStrategyType = 'tiered'; // 'tiered' | 'flat'
    this.pricingStrategy = new TieredRateStrategy();

    // UI state
    this.currentTab = 'fleet';
    this.searchQuery = '';
    this.typeFilter = 'all';
    this.availabilityFilter = 'available';
    this.maxPrice = 300;
    this.sortBy = 'recommended';
    this.viewMode = 'grid'; // 'grid' | 'compact'
    this.currentTheme = localStorage.getItem('auradrive_theme') || 'dark';

    this.init();
  }

  init() {
    this.loadState();
    this.applyTheme(this.currentTheme);
    this.bindEvents();
    this.render();
  }

  // --- Persistence & Storage ---
  loadState() {
    try {
      const savedVehicles = localStorage.getItem('auradrive_vehicles');
      const savedCustomers = localStorage.getItem('auradrive_customers');
      const savedRentals = localStorage.getItem('auradrive_rentals');
      const savedStrategy = localStorage.getItem('auradrive_strategy');

      if (savedVehicles) {
        const rawVehicles = JSON.parse(savedVehicles);
        this.vehicles = rawVehicles.map(v => this.deserializeVehicle(v));
      } else {
        this.vehicles = [...INITIAL_VEHICLES];
      }

      if (savedCustomers) {
        const rawCustomers = JSON.parse(savedCustomers);
        this.customers = rawCustomers.map(c => new Customer(c.id, c.name, c.licenseNumber, c.email, c.phone));
      } else {
        this.customers = [...INITIAL_CUSTOMERS];
      }

      if (savedRentals) {
        this.rentals = JSON.parse(savedRentals);
      } else {
        this.rentals = [...INITIAL_RENTALS];
      }

      if (savedStrategy) {
        this.setPricingStrategy(savedStrategy, false);
      }
    } catch (e) {
      console.warn('Could not load from localStorage, initializing fresh demo data', e);
      this.resetToDefaults(false);
    }
  }

  saveState() {
    try {
      const serializedVehicles = this.vehicles.map(v => ({
        id: v.id,
        make: v.make,
        model: v.model,
        year: v.year,
        base_rate_per_day: v.baseRatePerDay,
        is_available: v.isAvailable,
        vehicle_type: v.vehicleType(),
        seats: v.seats,
        four_wheel_drive: v.fourWheelDrive,
        engine_cc: v.engineCc,
        imageUrl: v.imageUrl,
        features: v.features
      }));

      const serializedCustomers = this.customers.map(c => ({
        id: c.id,
        name: c.name,
        license_number: c.licenseNumber,
        email: c.email,
        phone: c.phone
      }));

      localStorage.setItem('auradrive_vehicles', JSON.stringify(serializedVehicles));
      localStorage.setItem('auradrive_customers', JSON.stringify(serializedCustomers));
      localStorage.setItem('auradrive_rentals', JSON.stringify(this.rentals));
      localStorage.setItem('auradrive_strategy', this.currentStrategyType);
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }

  deserializeVehicle(v) {
    const type = v.vehicle_type || v.type;
    const baseRate = v.base_rate_per_day || v.baseRatePerDay || 50;
    const isAvail = v.is_available !== undefined ? v.is_available : v.isAvailable;
    const img = v.imageUrl || '';
    const feats = v.features || [];

    if (type === 'SUV') {
      return new SUV(v.id, v.make, v.model, v.year, baseRate, isAvail, v.seats || 7, v.four_wheel_drive ?? v.fourWheelDrive ?? true, img, feats);
    } else if (type === 'Bike') {
      return new Bike(v.id, v.make, v.model, v.year, baseRate, isAvail, v.engine_cc || v.engineCc || '155cc', img, feats);
    } else {
      return new Car(v.id, v.make, v.model, v.year, baseRate, isAvail, v.seats || 4, img, feats);
    }
  }

  resetToDefaults(reRender = true) {
    this.vehicles = [...INITIAL_VEHICLES];
    this.customers = [...INITIAL_CUSTOMERS];
    this.rentals = [...INITIAL_RENTALS];
    this.saveState();
    if (reRender) {
      this.render();
      this.showToast('Demo data restored successfully!', 'success');
    }
  }

  setPricingStrategy(type, save = true) {
    this.currentStrategyType = type;
    if (type === 'flat') {
      this.pricingStrategy = new FlatRateStrategy();
    } else {
      this.pricingStrategy = new TieredRateStrategy();
    }
    if (save) this.saveState();
    this.updateStrategyUI();
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('auradrive_theme', theme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  // --- Core Business Logic ---
  rentVehicle(customerId, vehicleId, startDate, days) {
    const customer = this.customers.find(c => c.id === customerId);
    if (!customer) throw new Error('Customer account not found.');
    if (!customer.canRent()) throw new Error('Customer must have a valid driver license.');

    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    if (!vehicle) throw new Error("Vehicle does not exist.");
    if (!vehicle.isAvailable) throw new Error("Vehicle is currently rented or unavailable.");

    days = Number(days);
    if (isNaN(days) || days <= 0) throw new Error("Rental duration must be at least 1 day.");

    const price = this.pricingStrategy.calculatePrice(vehicle, days);
    const rentalId = 'rent-' + Math.random().toString(36).substring(2, 9);

    const rentalRecord = {
      id: rentalId,
      vehicle_id: vehicleId,
      customer_id: customerId,
      start_date: startDate,
      planned_days: days,
      price: price,
      is_active: true
    };

    vehicle.isAvailable = false;
    this.rentals.unshift(rentalRecord);
    this.saveState();

    return rentalRecord;
  }

  returnVehicle(rentalId, returnDateStr) {
    const rental = this.rentals.find(r => r.id === rentalId);
    if (!rental) throw new Error("Rental record not found.");
    if (!rental.is_active) throw new Error("This rental agreement is already closed.");

    const vehicle = this.vehicles.find(v => v.id === rental.vehicle_id);
    const plannedDays = Number(rental.planned_days);
    const start = new Date(rental.start_date);
    const returnDate = new Date(returnDateStr);

    const diffMs = returnDate.getTime() - start.getTime();
    let actualDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (actualDays < 1) actualDays = 1;

    // Polymorphic & Strategy Calculation
    const effectiveDays = Math.min(actualDays, plannedDays);
    const basePrice = this.pricingStrategy.calculatePrice(vehicle, effectiveDays);

    // Late fee rule: 20% extra per day on overdue days
    const lateDays = Math.max(0, actualDays - plannedDays);
    const lateFee = +(0.2 * vehicle.getRate() * lateDays).toFixed(2);
    const totalSettled = +(basePrice + lateFee).toFixed(2);

    rental.end_date = returnDateStr;
    rental.actual_days = actualDays;
    rental.late_days = lateDays;
    rental.late_fee = lateFee;
    rental.total_price = totalSettled;
    rental.is_active = false;

    if (vehicle) {
      vehicle.isAvailable = true;
    }

    this.saveState();
    return rental;
  }

  // ============================================================================
  // 5. EVENT BINDING & LISTENERS
  // ============================================================================

  bindEvents() {
    // Navigation Tabs
    const tabButtons = document.querySelectorAll('.nav-tab, .mobile-nav-link');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = btn.dataset.tab;
        this.switchTab(tab);
        // Close mobile drawer if opened
        const drawer = document.getElementById('mobileDrawer');
        const menuBtn = document.getElementById('mobileMenuBtn');
        if (drawer) drawer.classList.remove('open');
        if (menuBtn) {
          menuBtn.classList.remove('active');
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Mobile Hamburger
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileDrawer.classList.toggle('open');
        mobileMenuBtn.classList.toggle('active', isOpen);
        mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      // Close mobile drawer when clicking anywhere outside
      document.addEventListener('click', (e) => {
        if (mobileDrawer.classList.contains('open')) {
          if (!mobileDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileDrawer.classList.remove('open');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
          }
        }
      });
    }

    // Theme Toggle
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Search and Filters
    const searchInput = document.getElementById('vehicleSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        clearSearchBtn.style.display = this.searchQuery ? 'flex' : 'none';
        this.renderFleet();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        this.searchQuery = '';
        clearSearchBtn.style.display = 'none';
        this.renderFleet();
      });
    }

    // Type filter pills
    const typePills = document.querySelectorAll('#typeFilterGroup .filter-pill');
    typePills.forEach(pill => {
      pill.addEventListener('click', () => {
        typePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.typeFilter = pill.dataset.type;
        this.renderFleet();
      });
    });

    // Availability Filter
    const availFilter = document.getElementById('availabilityFilter');
    if (availFilter) {
      availFilter.addEventListener('change', (e) => {
        this.availabilityFilter = e.target.value;
        this.renderFleet();
      });
    }

    // Price Slider
    const priceSlider = document.getElementById('priceRangeInput');
    const priceDisplay = document.getElementById('priceRangeValue');
    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        this.maxPrice = Number(e.target.value);
        priceDisplay.textContent = `$${this.maxPrice}/day`;
        this.renderFleet();
      });
    }

    // Sort Dropdown
    const sortSelect = document.getElementById('sortBySelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.renderFleet();
      });
    }

    // Grid / Compact View Toggles
    const gridBtn = document.getElementById('gridViewBtn');
    const compactBtn = document.getElementById('compactViewBtn');
    if (gridBtn && compactBtn) {
      gridBtn.addEventListener('click', () => {
        gridBtn.classList.add('active');
        compactBtn.classList.remove('active');
        this.viewMode = 'grid';
        document.getElementById('vehiclesGrid').classList.remove('compact-mode');
      });
      compactBtn.addEventListener('click', () => {
        compactBtn.classList.add('active');
        gridBtn.classList.remove('active');
        this.viewMode = 'compact';
        document.getElementById('vehiclesGrid').classList.add('compact-mode');
      });
    }

    // Reset Filters button in Empty State
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        this.searchQuery = '';
        this.typeFilter = 'all';
        this.availabilityFilter = 'all';
        this.maxPrice = 300;
        this.sortBy = 'recommended';

        if (searchInput) searchInput.value = '';
        if (priceSlider) priceSlider.value = 300;
        if (priceDisplay) priceDisplay.textContent = '$300/day';
        if (availFilter) availFilter.value = 'all';
        if (sortSelect) sortSelect.value = 'recommended';

        typePills.forEach(p => p.classList.toggle('active', p.dataset.type === 'all'));
        this.renderFleet();
      });
    }

    // Rentals Search & Filter
    const rentalSearch = document.getElementById('rentalSearchInput');
    if (rentalSearch) {
      rentalSearch.addEventListener('input', () => this.renderRentals());
    }

    const rentalFilterPills = document.querySelectorAll('.table-filter-toggles .filter-pill');
    rentalFilterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        rentalFilterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.renderRentals();
      });
    });

    // Refresh rentals button
    const refreshRentalsBtn = document.getElementById('refreshRentalsBtn');
    if (refreshRentalsBtn) {
      refreshRentalsBtn.addEventListener('click', () => {
        this.renderRentals();
        this.showToast('Rental records synced.', 'info');
      });
    }

    // Modals Open Buttons
    const openAddVehicleBtn = document.getElementById('openAddVehicleModalBtn');
    if (openAddVehicleBtn) {
      openAddVehicleBtn.addEventListener('click', () => this.openAddVehicleModal());
    }

    const openCustBtn = document.getElementById('openRegisterCustomerModalBtn');
    if (openCustBtn) {
      openCustBtn.addEventListener('click', () => this.openCustomerModal());
    }

    // Add Vehicle Type Radios (show/hide 4WD or Seats)
    const newTypeRadios = document.querySelectorAll('input[name="newVehicleType"]');
    newTypeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        const val = e.target.value;
        const suvGroup = document.getElementById('suv4wdGroup');
        const seatsInput = document.getElementById('newSeats');
        const seatsGroup = document.getElementById('seatsFieldGroup');

        if (val === 'SUV') {
          suvGroup.style.display = 'block';
          seatsGroup.style.display = 'flex';
          seatsInput.value = '7';
        } else if (val === 'Bike') {
          suvGroup.style.display = 'none';
          seatsGroup.style.display = 'none';
        } else {
          suvGroup.style.display = 'none';
          seatsGroup.style.display = 'flex';
          seatsInput.value = '4';
        }
      });
    });

    // Quick Image Presets in Add Vehicle Modal
    const presetButtons = document.querySelectorAll('.preset-img-btn');
    presetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const p = btn.dataset.preset;
        const imgInput = document.getElementById('newImageUrl');
        if (p === 'sedan') imgInput.value = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80';
        if (p === 'suv') imgInput.value = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80';
        if (p === 'sports') imgInput.value = 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=900&q=80';
        if (p === 'bike') imgInput.value = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80';
      });
    });

    // Add Vehicle Form Submit
    const addVehicleForm = document.getElementById('addVehicleForm');
    if (addVehicleForm) {
      addVehicleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddVehicleSubmit();
      });
    }

    // Customer Form Submit
    const customerForm = document.getElementById('customerForm');
    if (customerForm) {
      customerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleCustomerSubmit();
      });
    }

    // Modal Close buttons
    this.setupModalDismissal('rentModal', 'closeRentModalBtn', 'cancelRentBtn');
    this.setupModalDismissal('returnModal', 'closeReturnModalBtn', 'cancelReturnBtn');
    this.setupModalDismissal('addVehicleModal', 'closeAddVehicleModalBtn', 'cancelAddVehicleBtn');
    this.setupModalDismissal('customerModal', 'closeCustomerModalBtn', 'cancelCustomerBtn');
    this.setupModalDismissal('detailsModal', 'closeDetailsModalBtn');
    this.setupModalDismissal('invoiceModal', 'closeInvoiceModalBtn', 'closeInvoiceBtn');

    // Steppers inside Rent Modal
    const stepperMinus = document.getElementById('stepperMinus');
    const stepperPlus = document.getElementById('stepperPlus');
    const rentDaysInput = document.getElementById('rentDaysInput');

    if (stepperMinus && stepperPlus && rentDaysInput) {
      stepperMinus.addEventListener('click', () => {
        let v = parseInt(rentDaysInput.value, 10) || 1;
        if (v > 1) {
          rentDaysInput.value = v - 1;
          this.updateRentPricePreview();
        }
      });
      stepperPlus.addEventListener('click', () => {
        let v = parseInt(rentDaysInput.value, 10) || 1;
        rentDaysInput.value = v + 1;
        this.updateRentPricePreview();
      });
      rentDaysInput.addEventListener('input', () => this.updateRentPricePreview());
    }

    // Rent Form Customer Selection
    const rentCustomerSelect = document.getElementById('rentCustomerSelect');
    if (rentCustomerSelect) {
      rentCustomerSelect.addEventListener('change', () => this.validateRentDriverStatus());
    }

    // Quick Add Driver from Rent Modal
    const quickAddDriverBtn = document.getElementById('rentQuickAddCustomerBtn');
    if (quickAddDriverBtn) {
      quickAddDriverBtn.addEventListener('click', () => {
        document.getElementById('rentModal').close();
        this.openCustomerModal();
      });
    }

    // Rent Form Submit
    const rentForm = document.getElementById('rentForm');
    if (rentForm) {
      rentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleRentSubmit();
      });
    }

    // Return Date Live Calculation
    const returnActualDateInput = document.getElementById('returnActualDate');
    if (returnActualDateInput) {
      returnActualDateInput.addEventListener('change', () => this.updateReturnPricePreview());
    }

    // Return Form Submit
    const returnForm = document.getElementById('returnForm');
    if (returnForm) {
      returnForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleReturnSubmit();
      });
    }

    // Strategy algorithm switcher in Analytics tab
    const strategyRadios = document.querySelectorAll('input[name="systemStrategy"]');
    strategyRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.setPricingStrategy(e.target.value);
        this.renderFleet();
        this.showToast(`Active algorithm switched to ${e.target.value.toUpperCase()} strategy.`, 'info');
      });
    });

    // JSON Export Button
    const exportBtn = document.getElementById('exportJsonBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportJSON());
    }

    // JSON Import
    const importInput = document.getElementById('importJsonInput');
    if (importInput) {
      importInput.addEventListener('change', (e) => this.importJSON(e));
    }

    // Reset Data Button
    const resetDataBtn = document.getElementById('resetDataBtn');
    if (resetDataBtn) {
      resetDataBtn.addEventListener('click', () => {
        if (confirm('Restore default vehicles, customers, and sample rentals? All custom edits will be reset.')) {
          this.resetToDefaults(true);
        }
      });
    }

    // Print Receipt
    const printInvoiceBtn = document.getElementById('printInvoiceBtn');
    if (printInvoiceBtn) {
      printInvoiceBtn.addEventListener('click', () => window.print());
    }
  }

  setupModalDismissal(dialogId, closeBtnId, cancelBtnId) {
    const dialog = document.getElementById(dialogId);
    if (!dialog) return;

    if (closeBtnId) {
      const btn = document.getElementById(closeBtnId);
      if (btn) btn.addEventListener('click', () => dialog.close());
    }
    if (cancelBtnId) {
      const btn = document.getElementById(cancelBtnId);
      if (btn) btn.addEventListener('click', () => dialog.close());
    }

    // Close on backdrop click
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.mobile-nav-link').forEach(t => t.classList.remove('active'));

    const activePane = document.getElementById(`tab${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`);
    if (activePane) activePane.classList.add('active');

    const matchingNavTabs = document.querySelectorAll(`[data-tab="${tabId}"]`);
    matchingNavTabs.forEach(t => t.classList.add('active'));

    if (tabId === 'fleet') this.renderFleet();
    if (tabId === 'rentals') this.renderRentals();
    if (tabId === 'customers') this.renderCustomers();
    if (tabId === 'analytics') this.renderAnalytics();
  }

  // ============================================================================
  // 6. RENDERING LOGIC
  // ============================================================================

  render() {
    this.renderStatsBar();
    this.renderFleet();
    this.renderRentals();
    this.renderCustomers();
    this.renderAnalytics();
    this.updateStrategyUI();
  }

  renderStatsBar() {
    const totalFleet = this.vehicles.length;
    const available = this.vehicles.filter(v => v.isAvailable).length;
    const active = this.rentals.filter(r => r.is_active).length;

    // Total revenue from all finished and active rentals
    const revenue = this.rentals.reduce((sum, r) => sum + (r.total_price || r.price || 0), 0);

    const elTotal = document.getElementById('statTotalVehicles');
    const elAvail = document.getElementById('statAvailableVehicles');
    const elActive = document.getElementById('statActiveRentals');
    const elRev = document.getElementById('statTotalRevenue');
    const badgeActive = document.getElementById('activeRentalsBadge');
    const badgeMobile = document.getElementById('mobileRentalsBadge');

    if (elTotal) elTotal.textContent = totalFleet;
    if (elAvail) elAvail.textContent = available;
    if (elActive) elActive.textContent = active;
    if (elRev) elRev.textContent = `$${Math.round(revenue).toLocaleString()}`;
    if (badgeActive) badgeActive.textContent = active;
    if (badgeMobile) badgeMobile.textContent = active;
  }

  renderFleet() {
    const grid = document.getElementById('vehiclesGrid');
    const emptyState = document.getElementById('emptyFleetState');
    const counterBadge = document.getElementById('catalogResultsCount');
    if (!grid) return;

    // Filter logic
    let filtered = this.vehicles.filter(v => {
      // Type
      if (this.typeFilter !== 'all' && v.vehicleType() !== this.typeFilter) return false;
      // Availability
      if (this.availabilityFilter === 'available' && !v.isAvailable) return false;
      if (this.availabilityFilter === 'rented' && v.isAvailable) return false;
      // Price
      if (v.getRate() > this.maxPrice) return false;
      // Search
      if (this.searchQuery) {
        const query = this.searchQuery;
        const matchesName = `${v.make} ${v.model} ${v.year}`.toLowerCase().includes(query);
        const matchesType = v.vehicleType().toLowerCase().includes(query);
        const matchesFeatures = v.features && v.features.some(f => f.toLowerCase().includes(query));
        if (!matchesName && !matchesType && !matchesFeatures) return false;
      }
      return true;
    });

    // Sorting logic
    filtered.sort((a, b) => {
      if (this.sortBy === 'price-asc') return a.getRate() - b.getRate();
      if (this.sortBy === 'price-desc') return b.getRate() - a.getRate();
      if (this.sortBy === 'year-desc') return b.year - a.year;
      if (this.sortBy === 'make-asc') return a.make.localeCompare(b.make);
      return 0; // featured/recommended maintains default order
    });

    if (counterBadge) {
      counterBadge.textContent = `${filtered.length} vehicle${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    grid.innerHTML = filtered.map(vehicle => this.generateVehicleCardHTML(vehicle)).join('');

    // Attach listeners on dynamic card buttons
    grid.querySelectorAll('.rent-card-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const vid = btn.dataset.vehicleId;
        this.openRentModal(vid);
      });
    });

    grid.querySelectorAll('.details-card-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const vid = btn.dataset.vehicleId;
        this.openDetailsModal(vid);
      });
    });
  }

  generateVehicleCardHTML(v) {
    const type = v.vehicleType();
    const isAvail = v.isAvailable;
    const rate = v.getRate();
    const isSUV = type === 'SUV';

    let tagClass = 'tag-car';
    let typeIcon = '🚗';
    if (isSUV) {
      tagClass = 'tag-suv';
      typeIcon = '🚙';
    } else if (type === 'Bike') {
      tagClass = 'tag-bike';
      typeIcon = '🏍️';
    }

    return `
      <div class="glass-card vehicle-card">
        <div class="vehicle-img-wrapper">
          <img src="${v.imageUrl}" alt="${v.make} ${v.model}" class="vehicle-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'">
          <div class="card-top-badges">
            <span class="vehicle-type-tag ${tagClass}">
              <span>${typeIcon}</span>
              <span>${type}</span>
            </span>
            <span class="availability-pill ${isAvail ? 'avail-free' : 'avail-rented'}">
              <span class="pulse-dot" style="${isAvail ? '' : 'background-color:#fff'}"></span>
              <span>${isAvail ? 'Available' : 'On Rental'}</span>
            </span>
          </div>
        </div>

        <div class="card-body">
          <div class="vehicle-name-row">
            <div>
              <h3 class="vehicle-title">${v.make} ${v.model}</h3>
              <span class="vehicle-year">${v.year} Edition</span>
            </div>
          </div>

          <div class="vehicle-specs-list">
            ${isSUV ? `
              <div class="spec-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                <span>${v.seats || 7} Seats</span>
              </div>
              <div class="spec-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
                <span>${v.fourWheelDrive ? '4WD / AWD' : '2WD'}</span>
              </div>
            ` : type === 'Bike' ? `
              <div class="spec-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                <span>${v.engineCc || '155cc'}</span>
              </div>
              <div class="spec-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                <span>Helmet Incl.</span>
              </div>
            ` : `
              <div class="spec-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                <span>${v.seats || 4} Seats</span>
              </div>
              <div class="spec-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
                <span>Automatic</span>
              </div>
            `}
          </div>

          <div class="card-footer">
            <div class="pricing-box">
              <span class="price-subtext">Rental Rate</span>
              <div class="rate-amount">
                $${rate.toFixed(0)}<span class="rate-unit">/day</span>
              </div>
              ${isSUV ? `<span class="suv-polymorph-pill">+15% SUV Rate Applied</span>` : ''}
            </div>

            <div class="card-actions">
              <button class="btn btn-glass-sm details-card-btn" data-vehicle-id="${v.id}" title="View Full Specs">Specs</button>
              ${isAvail ? `
                <button class="btn btn-primary rent-card-btn" data-vehicle-id="${v.id}">
                  <span>Rent</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              ` : `
                <button class="btn btn-secondary" disabled style="opacity: 0.6; cursor: not-allowed;">
                  <span>Rented</span>
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderRentals() {
    const tbody = document.getElementById('rentalsTableBody');
    const emptyState = document.getElementById('emptyRentalsState');
    if (!tbody) return;

    // Filters
    const query = document.getElementById('rentalSearchInput')?.value.trim().toLowerCase() || '';
    const activeFilterBtn = document.querySelector('.table-filter-toggles .filter-pill.active');
    const filterMode = activeFilterBtn ? activeFilterBtn.dataset.rentalFilter : 'all';

    let list = this.rentals.filter(r => {
      if (filterMode === 'active' && !r.is_active) return false;
      if (filterMode === 'closed' && r.is_active) return false;

      if (query) {
        const cust = this.customers.find(c => c.id === r.customer_id);
        const veh = this.vehicles.find(v => v.id === r.vehicle_id);
        const custName = cust ? cust.name.toLowerCase() : '';
        const vehName = veh ? `${veh.make} ${veh.model}`.toLowerCase() : '';
        const ref = r.id.toLowerCase();
        if (!custName.includes(query) && !vehName.includes(query) && !ref.includes(query)) {
          return false;
        }
      }
      return true;
    });

    // Update Rental Tab Metric Cards
    const activeCount = this.rentals.filter(r => r.is_active).length;
    const completedCount = this.rentals.filter(r => !r.is_active).length;
    const totalRevenue = this.rentals.reduce((sum, r) => sum + (r.total_price || r.price || 0), 0);
    const latePenalties = this.rentals.reduce((sum, r) => sum + (r.late_fee || 0), 0);

    const mActive = document.getElementById('metricActiveRentalsCount');
    const mComp = document.getElementById('metricCompletedRentalsCount');
    const mRev = document.getElementById('metricTotalBilledRevenue');
    const mLate = document.getElementById('metricLateFeesCount');

    if (mActive) mActive.textContent = activeCount;
    if (mComp) mComp.textContent = completedCount;
    if (mRev) mRev.textContent = `$${Math.round(totalRevenue).toLocaleString()}`;
    if (mLate) mLate.textContent = `$${Math.round(latePenalties).toLocaleString()}`;

    if (list.length === 0) {
      tbody.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    tbody.innerHTML = list.map(r => {
      const veh = this.vehicles.find(v => v.id === r.vehicle_id);
      const cust = this.customers.find(c => c.id === r.customer_id);

      const vehName = veh ? `${veh.make} ${veh.model} (${veh.year})` : 'Vehicle Archived';
      const custName = cust ? cust.name : 'Unknown Customer';
      const rateStr = veh ? `$${veh.getRate().toFixed(0)}/day` : 'N/A';
      const finalPrice = r.total_price !== undefined ? `$${r.total_price.toFixed(2)}` : `$${r.price.toFixed(2)} (Est.)`;

      let statusBadge = '';
      if (r.is_active) {
        statusBadge = `<span class="status-badge badge-active"><span class="pulse-dot"></span> Active Lease</span>`;
      } else if (r.late_days > 0) {
        statusBadge = `<span class="status-badge badge-late">Returned (+${r.late_days}d late)</span>`;
      } else {
        statusBadge = `<span class="status-badge badge-closed">Returned On Time</span>`;
      }

      return `
        <tr>
          <td><code style="color:var(--accent-cyan); font-weight:700;">${r.id}</code></td>
          <td>
            <div style="font-weight:700;">${vehName}</div>
            <small style="color:var(--text-dim);">${veh ? veh.vehicleType() : ''}</small>
          </td>
          <td>
            <div style="font-weight:600;">${custName}</div>
            <small style="color:var(--text-dim); font-family:monospace;">${cust ? cust.licenseNumber : ''}</small>
          </td>
          <td>${r.start_date}</td>
          <td>${r.planned_days} days ${r.actual_days ? `(${r.actual_days} actual)` : ''}</td>
          <td>${rateStr}</td>
          <td>${statusBadge}</td>
          <td style="font-weight:700; color:var(--text-main);">${finalPrice}</td>
          <td class="text-right">
            ${r.is_active ? `
              <button class="btn btn-success btn-glass-sm return-action-btn" data-rental-id="${r.id}">
                Return Vehicle
              </button>
            ` : `
              <button class="btn btn-glass-sm view-invoice-btn" data-rental-id="${r.id}">
                Receipt
              </button>
            `}
          </td>
        </tr>
      `;
    }).join('');

    // Table buttons
    tbody.querySelectorAll('.return-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.openReturnModal(btn.dataset.rentalId);
      });
    });

    tbody.querySelectorAll('.view-invoice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.openInvoiceModal(btn.dataset.rentalId);
      });
    });
  }

  renderCustomers() {
    const grid = document.getElementById('customersGrid');
    if (!grid) return;

    grid.innerHTML = this.customers.map(cust => {
      const initials = cust.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      const customerRentals = this.rentals.filter(r => r.customer_id === cust.id);
      const activeRentals = customerRentals.filter(r => r.is_active);

      return `
        <div class="glass-card customer-card">
          <div class="customer-top">
            <div class="customer-avatar">${initials}</div>
            <div>
              <div class="customer-details-name">${cust.name}</div>
              <div class="customer-license-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="7" y1="8" x2="17" y2="8"></line><line x1="7" y1="12" x2="13" y2="12"></line></svg>
                <span>${cust.licenseNumber}</span>
              </div>
            </div>
          </div>

          <div style="font-size: 0.82rem; color: var(--text-muted); display:flex; flex-direction:column; gap:4px;">
            <div>✉️ ${cust.email}</div>
            <div>📞 ${cust.phone}</div>
          </div>

          <div style="margin-top:auto; padding-top:12px; border-top:1px solid var(--glass-border); display:flex; justify-content:space-between; align-items:center; font-size:0.8rem;">
            <span>Rentals: <strong>${customerRentals.length}</strong></span>
            ${activeRentals.length > 0 ? `
              <span class="status-badge badge-active">1 Active Lease</span>
            ` : `
              <span class="status-badge badge-closed">Eligible</span>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  renderAnalytics() {
    const totalVehicles = this.vehicles.length;
    const rentedVehicles = this.vehicles.filter(v => !v.isAvailable).length;
    const ratePercent = totalVehicles ? Math.round((rentedVehicles / totalVehicles) * 100) : 0;

    const percentText = document.getElementById('utilizationPercentText');
    const progressBar = document.getElementById('utilizationProgressBar');
    if (percentText) percentText.textContent = `${ratePercent}%`;
    if (progressBar) progressBar.style.width = `${ratePercent}%`;

    // Category breakdown
    const catList = document.getElementById('categoryBreakdownList');
    if (catList) {
      const counts = { Car: 0, SUV: 0, Bike: 0 };
      this.vehicles.forEach(v => {
        const t = v.vehicleType();
        if (counts[t] !== undefined) counts[t]++;
        else counts[t] = 1;
      });

      catList.innerHTML = Object.entries(counts).map(([type, count]) => {
        const share = totalVehicles ? Math.round((count / totalVehicles) * 100) : 0;
        return `
          <div class="cat-item-row">
            <span>${type}s</span>
            <span><strong>${count}</strong> units (${share}%)</span>
          </div>
        `;
      }).join('');
    }
  }

  updateStrategyUI() {
    const badgeText = document.getElementById('strategyBadgeText');
    const tieredRadio = document.getElementById('strategyRadioTiered');
    const flatRadio = document.getElementById('strategyRadioFlat');

    if (this.currentStrategyType === 'tiered') {
      if (badgeText) badgeText.textContent = 'Tiered Strategy (10% off 7+ days)';
      if (tieredRadio) tieredRadio.checked = true;
    } else {
      if (badgeText) badgeText.textContent = 'Flat Rate Strategy (Standard)';
      if (flatRadio) flatRadio.checked = true;
    }
  }

  // ============================================================================
  // 7. MODAL ACTIONS & INTERACTIVE WIZARDS
  // ============================================================================

  openRentModal(vehicleId) {
    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    if (!vehicle || !vehicle.isAvailable) {
      this.showToast('Vehicle is not available for rental.', 'error');
      return;
    }

    const modal = document.getElementById('rentModal');
    const title = document.getElementById('rentModalVehicleTitle');
    const preview = document.getElementById('rentVehiclePreview');
    const customerSelect = document.getElementById('rentCustomerSelect');
    const startDateInput = document.getElementById('rentStartDate');
    const daysInput = document.getElementById('rentDaysInput');

    title.textContent = `Rent ${vehicle.make} ${vehicle.model}`;

    // Populate Vehicle preview
    preview.innerHTML = `
      <img src="${vehicle.imageUrl}" class="preview-thumbnail" alt="${vehicle.make} ${vehicle.model}">
      <div class="preview-details">
        <span class="preview-title">${vehicle.make} ${vehicle.model} (${vehicle.year})</span>
        <span class="preview-rate">$${vehicle.getRate().toFixed(0)}/day &bull; ${vehicle.vehicleType()} ${vehicle.vehicleType() === 'SUV' ? '(Polymorphic +15% applied)' : ''}</span>
      </div>
    `;

    // Populate customer dropdown
    customerSelect.innerHTML = `<option value="">-- Choose a registered driver --</option>` +
      this.customers.map(c => `
        <option value="${c.id}">${c.name} &bull; ${c.licenseNumber}</option>
      `).join('');

    // Pre-fill today's date
    const today = new Date().toISOString().split('T')[0];
    startDateInput.value = today;
    daysInput.value = 3;

    // Store selected vehicle ID on form
    modal.dataset.vehicleId = vehicleId;

    this.updateRentPricePreview();
    modal.showModal();
  }

  updateRentPricePreview() {
    const modal = document.getElementById('rentModal');
    const vehicleId = modal.dataset.vehicleId;
    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;

    const daysInput = document.getElementById('rentDaysInput');
    const days = Math.max(1, parseInt(daysInput.value, 10) || 1);

    const baseDaily = vehicle.baseRatePerDay;
    const effectiveDaily = vehicle.getRate();
    const isSUV = vehicle.vehicleType() === 'SUV';

    const surchargeRow = document.getElementById('breakdownSurchargeRow');
    const surchargeEl = document.getElementById('breakdownSurcharge');
    const discountRow = document.getElementById('breakdownDiscountRow');
    const discountEl = document.getElementById('breakdownDiscount');
    const totalEl = document.getElementById('breakdownTotal');
    const daysEl = document.getElementById('breakdownDays');
    const rateEl = document.getElementById('breakdownDailyRate');
    const strategyBadge = document.getElementById('breakdownStrategyBadge');

    rateEl.textContent = `$${baseDaily.toFixed(2)}/day`;
    daysEl.textContent = `${days} day${days > 1 ? 's' : ''}`;

    if (isSUV) {
      surchargeRow.style.display = 'flex';
      surchargeEl.textContent = `+$${(baseDaily * 0.15).toFixed(2)}/day`;
    } else {
      surchargeRow.style.display = 'none';
    }

    const calculatedPrice = this.pricingStrategy.calculatePrice(vehicle, days);
    const standardTotal = effectiveDaily * days;

    if (this.currentStrategyType === 'tiered' && days >= 7) {
      discountRow.style.display = 'flex';
      const savings = standardTotal - calculatedPrice;
      discountEl.textContent = `-$${savings.toFixed(2)}`;
      strategyBadge.textContent = 'Tiered 10% Weekly Discount';
    } else {
      discountRow.style.display = 'none';
      strategyBadge.textContent = this.currentStrategyType === 'tiered' ? 'Tiered Strategy' : 'Flat Strategy';
    }

    totalEl.textContent = `$${calculatedPrice.toFixed(2)}`;
  }

  validateRentDriverStatus() {
    const customerSelect = document.getElementById('rentCustomerSelect');
    const hint = document.getElementById('rentCustomerHint');
    const customer = this.customers.find(c => c.id === customerSelect.value);

    if (customer) {
      if (customer.canRent()) {
        hint.textContent = `License Verified: ${customer.licenseNumber} (Approved)`;
        hint.style.color = 'var(--accent-emerald)';
      } else {
        hint.textContent = `License missing or invalid! Cannot rent.`;
        hint.style.color = 'var(--accent-rose)';
      }
    } else {
      hint.textContent = `Driver must possess a valid, non-empty driving license.`;
      hint.style.color = 'var(--text-dim)';
    }
  }

  handleRentSubmit() {
    const modal = document.getElementById('rentModal');
    const vehicleId = modal.dataset.vehicleId;
    const customerId = document.getElementById('rentCustomerSelect').value;
    const startDate = document.getElementById('rentStartDate').value;
    const days = parseInt(document.getElementById('rentDaysInput').value, 10);

    try {
      const rental = this.rentVehicle(customerId, vehicleId, startDate, days);
      modal.close();
      this.render();
      this.showToast(`Vehicle rented successfully! Booking Ref: ${rental.id}`, 'success');
      this.openInvoiceModal(rental.id);
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  openReturnModal(rentalId) {
    const rental = this.rentals.find(r => r.id === rentalId);
    if (!rental) return;

    const vehicle = this.vehicles.find(v => v.id === rental.vehicle_id);
    const customer = this.customers.find(c => c.id === rental.customer_id);

    const modal = document.getElementById('returnModal');
    document.getElementById('returnRentalId').value = rentalId;

    const summary = document.getElementById('returnSummaryCard');
    summary.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <span style="font-size:0.8rem; color:var(--accent-cyan); font-weight:700;">AGREEMENT ${rental.id}</span>
        <span class="status-badge badge-active">Active</span>
      </div>
      <div style="font-size:1.1rem; font-weight:700; color:var(--text-main); margin-bottom:4px;">
        ${vehicle ? `${vehicle.make} ${vehicle.model}` : 'Archived Vehicle'}
      </div>
      <div style="font-size:0.85rem; color:var(--text-muted);">
        Driver: <strong>${customer ? customer.name : 'Unknown'}</strong> &bull; Start Date: <strong>${rental.start_date}</strong> &bull; Planned: <strong>${rental.planned_days} days</strong>
      </div>
    `;

    // Suggest return date based on planned days or today
    const start = new Date(rental.start_date);
    const plannedReturn = new Date(start.getTime() + rental.planned_days * 86400000);
    const today = new Date();
    // Default to planned return or today if later
    const defaultDate = (today > plannedReturn ? today : plannedReturn).toISOString().split('T')[0];

    const actualDateInput = document.getElementById('returnActualDate');
    actualDateInput.value = defaultDate;

    this.updateReturnPricePreview();
    modal.showModal();
  }

  updateReturnPricePreview() {
    const rentalId = document.getElementById('returnRentalId').value;
    const rental = this.rentals.find(r => r.id === rentalId);
    if (!rental) return;

    const vehicle = this.vehicles.find(v => v.id === rental.vehicle_id);
    if (!vehicle) return;

    const actualDateStr = document.getElementById('returnActualDate').value;
    if (!actualDateStr) return;

    const start = new Date(rental.start_date);
    const actualReturn = new Date(actualDateStr);
    const diffDays = Math.ceil((actualReturn - start) / (1000 * 60 * 60 * 24)) || 1;

    const plannedDays = rental.planned_days;
    const lateDays = Math.max(0, diffDays - plannedDays);
    const effectiveDays = Math.min(diffDays, plannedDays);

    const baseCost = this.pricingStrategy.calculatePrice(vehicle, effectiveDays);
    const lateFee = +(0.2 * vehicle.getRate() * lateDays).toFixed(2);
    const totalDue = +(baseCost + lateFee).toFixed(2);

    document.getElementById('returnPlannedDays').textContent = `${plannedDays} days`;
    document.getElementById('returnActualDays').textContent = `${diffDays} days`;
    document.getElementById('returnBaseCost').textContent = `$${baseCost.toFixed(2)}`;

    const lateRow = document.getElementById('returnLateRow');
    const lateFeeEl = document.getElementById('returnLateFee');
    const statusBadge = document.getElementById('returnStatusBadge');

    if (lateDays > 0) {
      lateRow.style.display = 'flex';
      lateFeeEl.textContent = `+$${lateFee.toFixed(2)} (${lateDays} day${lateDays > 1 ? 's' : ''} late)`;
      statusBadge.textContent = `Overdue (+${lateDays}d)`;
      statusBadge.className = 'status-badge badge-late';
    } else {
      lateRow.style.display = 'none';
      statusBadge.textContent = 'On Schedule';
      statusBadge.className = 'status-badge badge-closed';
    }

    document.getElementById('returnTotalDue').textContent = `$${totalDue.toFixed(2)}`;
  }

  handleReturnSubmit() {
    const rentalId = document.getElementById('returnRentalId').value;
    const returnDate = document.getElementById('returnActualDate').value;

    try {
      const closedRental = this.returnVehicle(rentalId, returnDate);
      document.getElementById('returnModal').close();
      this.render();
      this.showToast(`Vehicle checked in successfully! Settled: $${closedRental.total_price.toFixed(2)}`, 'success');
      this.openInvoiceModal(rentalId);
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  openAddVehicleModal() {
    const modal = document.getElementById('addVehicleModal');
    document.getElementById('addVehicleForm').reset();
    document.getElementById('suv4wdGroup').style.display = 'none';
    document.getElementById('seatsFieldGroup').style.display = 'flex';
    document.getElementById('newSeats').value = '4';
    modal.showModal();
  }

  handleAddVehicleSubmit() {
    const type = document.querySelector('input[name="newVehicleType"]:checked').value;
    const make = document.getElementById('newMake').value.trim();
    const model = document.getElementById('newModel').value.trim();
    const year = parseInt(document.getElementById('newYear').value, 10);
    const baseRate = parseFloat(document.getElementById('newBaseRate').value);
    const imageUrl = document.getElementById('newImageUrl').value.trim();

    let newVeh;
    if (type === 'SUV') {
      const seats = parseInt(document.getElementById('newSeats').value, 10) || 7;
      const fourWheelDrive = document.getElementById('newFourWheelDrive').checked;
      newVeh = new SUV('', make, model, year, baseRate, true, seats, fourWheelDrive, imageUrl);
    } else if (type === 'Bike') {
      newVeh = new Bike('', make, model, year, baseRate, true, '155cc', imageUrl);
    } else {
      const seats = parseInt(document.getElementById('newSeats').value, 10) || 4;
      newVeh = new Car('', make, model, year, baseRate, true, seats, imageUrl);
    }

    this.vehicles.unshift(newVeh);
    this.saveState();
    document.getElementById('addVehicleModal').close();
    this.render();
    this.showToast(`${newVeh.make} ${newVeh.model} added to fleet!`, 'success');
  }

  openCustomerModal() {
    const modal = document.getElementById('customerModal');
    document.getElementById('customerForm').reset();
    modal.showModal();
  }

  handleCustomerSubmit() {
    const name = document.getElementById('custName').value.trim();
    const license = document.getElementById('custLicense').value.trim();
    const email = document.getElementById('custEmail').value.trim();
    const phone = document.getElementById('custPhone').value.trim();

    if (!license) {
      this.showToast('Driver license is strictly required.', 'error');
      return;
    }

    const newCust = new Customer('', name, license, email, phone);
    this.customers.unshift(newCust);
    this.saveState();
    document.getElementById('customerModal').close();
    this.renderCustomers();
    this.showToast(`Driver account registered for ${newCust.name}!`, 'success');
  }

  openDetailsModal(vehicleId) {
    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;

    const modal = document.getElementById('detailsModal');
    const title = document.getElementById('detailsTitle');
    const body = document.getElementById('detailsBody');

    title.textContent = `${vehicle.make} ${vehicle.model}`;

    const isSUV = vehicle.vehicleType() === 'SUV';
    const isBike = vehicle.vehicleType() === 'Bike';

    body.innerHTML = `
      <div class="details-hero">
        <img src="${vehicle.imageUrl}" alt="${vehicle.make} ${vehicle.model}">
      </div>

      <div class="details-specs-grid">
        <div class="details-spec-item">
          <span class="details-spec-label">Class</span>
          <span class="details-spec-value">${vehicle.vehicleType()}</span>
        </div>
        <div class="details-spec-item">
          <span class="details-spec-label">Daily Base Rate</span>
          <span class="details-spec-value">$${vehicle.baseRatePerDay.toFixed(2)}</span>
        </div>
        <div class="details-spec-item">
          <span class="details-spec-label">Effective Daily Rate</span>
          <span class="details-spec-value" style="color:var(--accent-cyan);">$${vehicle.getRate().toFixed(2)}</span>
        </div>
        <div class="details-spec-item">
          <span class="details-spec-label">Year of Manufacture</span>
          <span class="details-spec-value">${vehicle.year}</span>
        </div>
        ${isSUV ? `
          <div class="details-spec-item">
            <span class="details-spec-label">Seating</span>
            <span class="details-spec-value">${vehicle.seats} Passengers</span>
          </div>
          <div class="details-spec-item">
            <span class="details-spec-label">Drivetrain</span>
            <span class="details-spec-value">${vehicle.fourWheelDrive ? '4WD / All-Wheel' : '2WD'}</span>
          </div>
        ` : isBike ? `
          <div class="details-spec-item">
            <span class="details-spec-label">Displacement</span>
            <span class="details-spec-value">${vehicle.engineCc}</span>
          </div>
          <div class="details-spec-item">
            <span class="details-spec-label">Safety Gear</span>
            <span class="details-spec-value">DOT Helmet Included</span>
          </div>
        ` : `
          <div class="details-spec-item">
            <span class="details-spec-label">Capacity</span>
            <span class="details-spec-value">${vehicle.seats} Passengers</span>
          </div>
          <div class="details-spec-item">
            <span class="details-spec-label">Transmission</span>
            <span class="details-spec-value">Automatic</span>
          </div>
        `}
      </div>

      <div style="font-weight:700; margin-bottom:8px; font-size:0.9rem;">Included Features &amp; Equipment</div>
      <div class="features-tags-list">
        ${vehicle.features.map(f => `<span class="feature-tag-pill">✓ ${f}</span>`).join('')}
      </div>

      <div class="modal-footer" style="margin-top:20px; border-top:1px solid var(--glass-border); padding-top:16px;">
        <button class="btn btn-glass" onclick="document.getElementById('detailsModal').close()">Close</button>
        ${vehicle.isAvailable ? `
          <button class="btn btn-primary" onclick="document.getElementById('detailsModal').close(); window.app.openRentModal('${vehicle.id}')">
            Rent This Vehicle
          </button>
        ` : `
          <button class="btn btn-secondary" disabled>Currently Rented</button>
        `}
      </div>
    `;

    modal.showModal();
  }

  openInvoiceModal(rentalId) {
    const rental = this.rentals.find(r => r.id === rentalId);
    if (!rental) return;

    const vehicle = this.vehicles.find(v => v.id === rental.vehicle_id);
    const customer = this.customers.find(c => c.id === rental.customer_id);

    const modal = document.getElementById('invoiceModal');
    const container = document.getElementById('invoiceContent');

    const total = rental.total_price !== undefined ? rental.total_price : rental.price;
    const isClosed = !rental.is_active;

    container.innerHTML = `
      <div class="invoice-card-print">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:24px; border-bottom:1px solid var(--glass-border); padding-bottom:16px;">
          <div>
            <h2 style="font-family:var(--font-display); font-size:1.6rem; font-weight:800; letter-spacing:-0.03em;">AURADRIVE</h2>
            <p style="font-size:0.8rem; color:var(--text-dim);">Official Digital Rental Statement</p>
          </div>
          <div style="text-align:right;">
            <span class="invoice-badge-status">${isClosed ? 'Paid & Settled' : 'Active Dispatch'}</span>
            <div style="font-size:0.8rem; color:var(--text-dim); margin-top:6px; font-family:monospace;">REF: ${rental.id}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px; font-size:0.85rem;">
          <div>
            <div style="color:var(--text-dim); text-transform:uppercase; font-size:0.75rem; font-weight:700;">Customer / Driver:</div>
            <div style="font-weight:700; font-size:1rem; margin-top:2px;">${customer ? customer.name : 'Unknown'}</div>
            <div style="font-family:monospace; color:var(--text-muted);">License: ${customer ? customer.licenseNumber : ''}</div>
            <div style="color:var(--text-dim);">${customer ? customer.email : ''}</div>
          </div>
          <div>
            <div style="color:var(--text-dim); text-transform:uppercase; font-size:0.75rem; font-weight:700;">Vehicle Dispatched:</div>
            <div style="font-weight:700; font-size:1rem; margin-top:2px;">${vehicle ? `${vehicle.make} ${vehicle.model}` : 'Archived Vehicle'}</div>
            <div style="color:var(--text-muted);">${vehicle ? `${vehicle.year} &bull; ${vehicle.vehicleType()}` : ''}</div>
            <div style="color:var(--accent-cyan); font-weight:600;">Rate: $${vehicle ? vehicle.getRate().toFixed(2) : 0}/day</div>
          </div>
        </div>

        <div style="background:var(--glass-bg-subtle); padding:16px; border-radius:var(--radius-sm); border:1px solid var(--glass-border); margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.88rem;">
            <span>Pickup Date:</span>
            <strong>${rental.start_date}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.88rem;">
            <span>Planned Duration:</span>
            <strong>${rental.planned_days} days</strong>
          </div>
          ${rental.actual_days ? `
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.88rem;">
              <span>Actual Return Date:</span>
              <strong>${rental.end_date} (${rental.actual_days} days elapsed)</strong>
            </div>
          ` : ''}
          ${rental.late_days > 0 ? `
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.88rem; color:var(--accent-amber);">
              <span>Late Overdue Penalty (20% daily):</span>
              <strong>+$${rental.late_fee.toFixed(2)}</strong>
            </div>
          ` : ''}
          <div style="height:1px; background:var(--glass-border); margin:10px 0;"></div>
          <div style="display:flex; justify-content:space-between; font-size:1.15rem; font-weight:800;">
            <span>Total Settlement:</span>
            <span style="color:var(--accent-cyan); font-family:var(--font-display);">$${total.toFixed(2)}</span>
          </div>
        </div>

        <p style="font-size:0.72rem; color:var(--text-dim); text-align:center;">
          Generated by AuraDrive Rental Engine. OOP Polymorphism &amp; Strategy Pattern Verified.
        </p>
      </div>
    `;

    modal.showModal();
  }

  // ============================================================================
  // 8. DATA IMPORT & EXPORT (Parity with rental_system.py)
  // ============================================================================

  exportJSON() {
    const payload = {
      vehicles: this.vehicles.map(v => ({
        id: v.id,
        make: v.make,
        model: v.model,
        year: v.year,
        base_rate_per_day: v.baseRatePerDay,
        is_available: v.isAvailable,
        vehicle_type: v.vehicleType(),
        seats: v.seats,
        four_wheel_drive: v.fourWheelDrive,
        engine_cc: v.engineCc,
        imageUrl: v.imageUrl,
        features: v.features
      })),
      customers: this.customers.map(c => ({
        id: c.id,
        name: c.name,
        license_number: c.licenseNumber,
        email: c.email,
        phone: c.phone
      })),
      rentals: this.rentals
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `auradrive_fleet_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();

    this.showToast('Fleet & rental data exported to JSON!', 'success');
  }

  importJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.vehicles && Array.isArray(data.vehicles)) {
          this.vehicles = data.vehicles.map(v => this.deserializeVehicle(v));
        }
        if (data.customers && Array.isArray(data.customers)) {
          this.customers = data.customers.map(c => new Customer(c.id, c.name, c.license_number || c.licenseNumber, c.email, c.phone));
        }
        if (data.rentals && Array.isArray(data.rentals)) {
          this.rentals = data.rentals;
        }

        this.saveState();
        this.render();
        this.showToast('JSON data imported successfully!', 'success');
      } catch (err) {
        this.showToast('Invalid JSON file format: ' + err.message, 'error');
      }
    };
    reader.readAsText(file);
  }

  // ============================================================================
  // 9. TOAST NOTIFICATION ENGINE
  // ============================================================================

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `
      <span style="font-weight:bold; font-size:1.1rem;">${icon}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(40px)';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.app = new RentalApp();
});

