import pandas as pd
import json

# === Configuration ===
EXCEL_FILES = ["src/data/Pedestrian-Related_TxDOT_Projects.xlsx", "src/data/CRIS_PrsnTypeID-Pedestrian-2025-06-01-234904.xlsx"]  # Replace with your file
SHEET_NAME = 0  # Change if your Excel has multiple sheets
LAT_COL = "lat"  # Replace with actual column name
LON_COL = "lon"  # Replace with actual column name
OUTPUT_JSONS = ["src/data/txdot_projects.json", "src/data/crash_data.json"]  # Output file (with .json extension)
DROP_COLS = [LAT_COL, LON_COL, "Veh_Lic_State_ID", "Veh_Color_ID", "Veh_Make_ID", "Veh_Mod_ID", "Veh_Dmag_Area_1_ID", "Veh_Dmag_Scl_1_ID", "Drvr_Lic_State_ID", "Veh_Body_Styl_ID"]

for excel_file, output_json in zip(EXCEL_FILES, OUTPUT_JSONS):
    # === Read Excel file ===
    df = pd.read_excel(excel_file, sheet_name=SHEET_NAME)

    # === Filter out rows without coordinates ===
    df = df[df[LAT_COL].notnull() & df[LON_COL].notnull()]

    # === Replace NaN with empty string globally ===
    df = df.fillna("")

    # === Convert all columns (except lat/lon) to string ===
    for col in df.columns:
        if col not in [LAT_COL, LON_COL]:
            df[col] = df[col].astype(str)


    # === Convert to GeoJSON-style structure ===
    geojson_like = {
        "type": "FeatureCollection",
        "features": []
    }

    for _, row in df.iterrows():
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [row[LON_COL], row[LAT_COL]]
            },
            "properties": row.drop(DROP_COLS, errors="ignore").to_dict()
        }
        geojson_like["features"].append(feature)

    # === Save to .json ===
    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(geojson_like, f, indent=2)

    print(f"GeoJSON-style JSON saved to {output_json}")
