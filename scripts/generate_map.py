import json
import math
import os
import urllib.request

GEOJSON_URL = "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"
GEOJSON_FILE = "public/world.geojson"
SVG_FILE = "public/custom-map.svg"

# Eurasia / North Africa focus - Centered on Kazakhstan/Central Asia
MIN_LON = 25
MAX_LON = 135
MIN_LAT = 5
MAX_LAT = 58

WIDTH = 1000

def download_geojson():
    if not os.path.exists(GEOJSON_FILE):
        print(f"Downloading GeoJSON from {GEOJSON_URL}...")
        try:
            with urllib.request.urlopen(GEOJSON_URL) as response:
                data = response.read()
                with open(GEOJSON_FILE, 'wb') as f:
                    f.write(data)
            print("Download complete.")
        except Exception as e:
            print(f"Error downloading: {e}")
            exit(1)
    else:
        print("GeoJSON already exists.")

def mercator_x(lon):
    return math.radians(lon)

def mercator_y(lat):
    # Clamp latitude to avoid infinity at poles
    if lat > 85: lat = 85
    if lat < -85: lat = -85
    lat_rad = math.radians(lat)
    return math.log(math.tan(math.pi / 4 + lat_rad / 2))

def project_point(lon, lat, bounds, width, height):
    # Normalized coordinates (0 to 1) within the bounds
    x_raw = mercator_x(lon)
    y_raw = mercator_y(lat)

    min_x = mercator_x(bounds['min_lon'])
    max_x = mercator_x(bounds['max_lon'])
    min_y = mercator_y(bounds['min_lat'])
    max_y = mercator_y(bounds['max_lat'])

    # Map x to 0..width
    x = (x_raw - min_x) / (max_x - min_x) * width
    
    # Map y to height..0 (SVG y goes down, latitude goes up)
    y = height - ((y_raw - min_y) / (max_y - min_y) * height)
    
    return x, y

def generate_map():
    with open(GEOJSON_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Calculate bounds in projected space to determine height
    min_proj_x = mercator_x(MIN_LON)
    max_proj_x = mercator_x(MAX_LON)
    min_proj_y = mercator_y(MIN_LAT)
    max_proj_y = mercator_y(MAX_LAT)
    
    print(f"Debug: X[{min_proj_x}, {max_proj_x}] Y[{min_proj_y}, {max_proj_y}]")
    
    aspect_ratio = (max_proj_x - min_proj_x) / (max_proj_y - min_proj_y)
    HEIGHT = int(WIDTH / aspect_ratio)
    
    print(f"Map Dimensions: {WIDTH}x{HEIGHT}")

    bounds = {
        'min_lon': MIN_LON,
        'max_lon': MAX_LON,
        'min_lat': MIN_LAT,
        'max_lat': MAX_LAT
    }

    svg_paths = []
    
    for feature in data['features']:
        geometry = feature['geometry']
        geo_type = geometry['type']
        coords = geometry['coordinates']
        
        path_data = ""
        
        def process_ring(ring):
            pts = []
            valid_pts = 0
            for lon, lat in ring:
                x, y = project_point(lon, lat, bounds, WIDTH, HEIGHT)
                pts.append(f"{x:.1f},{y:.1f}")
                valid_pts += 1
            if valid_pts < 2: return ""
            return "M" + "L".join(pts) + "z"

        if geo_type == 'Polygon':
            for ring in coords:
                path_data += process_ring(ring) + " "
        elif geo_type == 'MultiPolygon':
            for polygon in coords:
                for ring in polygon:
                    path_data += process_ring(ring) + " "
        
        if path_data.strip():
            svg_paths.append(f'<path d="{path_data.strip()}" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.5" vector-effect="non-scaling-stroke" />')

    # Create SVG
    svg_content = f'''<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WIDTH} {HEIGHT}">
  <rect width="100%" height="100%" fill="#f1f5f9" />
  <g id="map-paths">
    {''.join(svg_paths)}
  </g>
</svg>
'''
    
    with open(SVG_FILE, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    
    print(f"Map generated at {SVG_FILE}")

    # Calculate cities
    cities = [
        {'name': 'Astana', 'lat': 51.1605, 'lon': 71.4704},
        {'name': 'Almaty', 'lat': 43.2220, 'lon': 76.8512},
        {'name': 'Bishkek', 'lat': 42.8746, 'lon': 74.5698},
        {'name': 'Dubai', 'lat': 25.2048, 'lon': 55.2708},
        {'name': 'Shanghai', 'lat': 31.2304, 'lon': 121.4737},
    ]

    print("\n--- CITY COORDINATES (Percent) ---")
    for city in cities:
        x, y = project_point(city['lon'], city['lat'], bounds, WIDTH, HEIGHT)
        # Convert to percentage
        left_p = (x / WIDTH) * 100
        top_p = (y / HEIGHT) * 100
        print(f"{city['name']}: Top={top_p:.2f}%, Left={left_p:.2f}%")

if __name__ == "__main__":
    download_geojson()
    generate_map()
