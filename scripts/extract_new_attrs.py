import pandas as pd
from pathlib import Path

xlsx_path = Path('src/Mapping Card API-Level 2-20250328-20260114.xlsx')
if not xlsx_path.exists():
    raise SystemExit(f"Excel not found at {xlsx_path}")

# read first sheet
xls = pd.read_excel(xlsx_path, sheet_name=0, header=0)
print('Columns:', list(xls.columns))

# Column L is the 12th index (0-based index 11), but use column letter if present
# Find rows where any cell contains 'neu' in column L or column with name matching 'L' or where the 12th column has 'neu'
# We'll check for 'neu' in any column and show those rows
mask = xls.apply(lambda col: col.astype(str).str.strip().str.lower()=='neu').any(axis=1)
new_rows = xls[mask]
print('\nFound', len(new_rows), "rows with 'neu'.\n")
# Print selected columns if they exist
for r in new_rows.itertuples(index=False):
    print('--- ROW ---')
    for cname, val in zip(new_rows.columns, r):
        if pd.notna(val):
            print(f"{cname}: {val}")

# Also output a CSV with filtered rows for convenience
new_rows.to_csv('src/new_attrs_neu.csv', index=False)
print('\nWrote src/new_attrs_neu.csv')
