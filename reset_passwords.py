#!/usr/bin/env python3
"""
reset_passwords.py
Resets all user passwords in login details.xlsx to simple, known values
and prints a LOGIN CHEAT SHEET for project demonstrations.

IMPORTANT: Close the Excel file before running this script!
"""

import os, hashlib, secrets
try:
    import openpyxl
except ImportError:
    print("ERROR: openpyxl not installed. Run: pip3 install openpyxl")
    exit(1)

XLSX_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'login details.xlsx')

def hash_password(password):
    salt = secrets.token_hex(16)
    hashed = hashlib.sha256((salt + password).encode('utf-8')).hexdigest()
    return f"{salt}:{hashed}"

# ── Define ALL demo accounts ──
# Each entry: (username, password, role, email, company, assigned_brand)
DEMO_ACCOUNTS = [
    ("admin",       "admin123",      "engineer", "admin@heyservice.net",       "Hey Service",  "all"),
    ("wagamama_mgr","wagamama1",     "user",     "manager@wagamama.co.uk",     "Wagamama",     "Wagamama"),
    ("fiveguys_mgr","fiveguys1",     "user",     "manager@fiveguys.co.uk",     "Five Guys",    "Five Guys"),
    ("zaap_mgr",    "zaap1234",      "user",     "manager@zaapthai.co.uk",     "Zaap Thai",    "Zaap Thai"),
    ("premier_mgr", "premier1",      "user",     "manager@premierinn.com",     "Premier Inn",  "Premier Inn"),
]

def reset_all():
    # Create fresh workbook
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Users"
    
    # Headers
    ws.append(["username", "password", "role", "email", "company", "assigned_brand"])
    
    # Add all demo accounts with hashed passwords
    for username, plain_pw, role, email, company, brand in DEMO_ACCOUNTS:
        hashed = hash_password(plain_pw)
        ws.append([username, hashed, role, email, company, brand])
    
    # Auto-size columns for readability
    for col in ws.columns:
        max_len = 0
        col_letter = col[0].column_letter
        for cell in col:
            if cell.value:
                max_len = max(max_len, len(str(cell.value)))
        ws.column_dimensions[col_letter].width = min(max_len + 2, 50)
    
    wb.save(XLSX_FILE)
    wb.close()
    print(f"\n✅ Excel file updated: {XLSX_FILE}")

def print_cheat_sheet():
    print("\n" + "=" * 70)
    print("  LOGIN CREDENTIALS CHEAT SHEET — Hey Service Dashboard")
    print("  (For project demonstration purposes)")
    print("=" * 70)
    print(f"\n  {'Username':<16} {'Password':<14} {'Role':<10} {'Brand Shown'}")
    print("  " + "-" * 62)
    for username, password, role, email, company, brand in DEMO_ACCOUNTS:
        brand_display = "ALL SITES" if brand == "all" else brand + " only"
        print(f"  {username:<16} {password:<14} {role:<10} {brand_display}")
    print()
    print("  🔧 Engineer (admin) = sees ALL sites + alarm bell + emergency reports")
    print("  👤 User accounts   = sees ONLY their assigned brand's sites")
    print("=" * 70)
    print()

if __name__ == "__main__":
    print("🔄 Resetting all passwords to demonstration values...")
    reset_all()
    print_cheat_sheet()
    print("  Now start the server with: python3 server.py")
    print("  Then open: http://localhost:8000/login.html")
    print()
