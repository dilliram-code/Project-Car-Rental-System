#!/usr/bin/env python3
"""
AuraDrive - Python Web Server Bridge
Serves the Glassmorphic HTML/CSS/JS UI and provides an optional REST API bridge
connected to the OOP rental_system backend.
Zero external dependencies (uses Python standard library http.server).
"""

import sys
import os
import json
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler
from datetime import date, timedelta
from urllib.parse import urlparse, parse_qs

# Import OOP domain models
try:
    from rental_system import RentalSystem
    from models import Car, SUV, Bike
    from customers import Customer
    from pricising import TieredRateStrategy, FlatRateStrategy
except ImportError as e:
    print(f"Warning: Could not import OOP modules: {e}")

PORT = 8000

class AuraDriveHTTPHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and disable aggressive caching for local dev
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed_url = urlparse(self.path)
        
        # Health check endpoint
        if parsed_url.path == '/api/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = {
                "status": "online",
                "system": "AuraDrive Car Rental Engine (OOP)",
                "python_version": sys.version
            }
            self.wfile.write(json.dumps(response).encode('utf-8'))
            return
            
        # Default file serving (index.html, style.css, app.js, etc.)
        super().do_GET()


def run_server(port=PORT, auto_open=True):
    # Ensure working directory is the script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    server_address = ('', port)
    httpd = HTTPServer(server_address, AuraDriveHTTPHandler)
    url = f"http://localhost:{port}"
    
    print("=" * 65)
    print("🚗  AURADRIVE | Next-Gen Glassmorphic Car Rental System")
    print("=" * 65)
    print(f"✨  Server running at: {url}")
    print(f"📂  Serving files from: {script_dir}")
    print(f"🌐  Open {url} in your browser to experience the UI.")
    print("=" * 65)
    print("Press Ctrl+C to terminate the server.\n")

    if auto_open:
        try:
            webbrowser.open(url)
        except Exception:
            pass

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer gracefully stopped.")
        httpd.server_close()

if __name__ == '__main__':
    run_server()

