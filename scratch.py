import glob
import os
import re

button_html = """
            <button id="themeToggleBtn" class="theme-toggle-btn" aria-label="Toggle Dark Mode" title="Toggle Dark Mode">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </button>
"""

# Find all html files in the current dir
for filepath in glob.glob('*.html'):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Check if we already injected it
    if 'id="themeToggleBtn"' in content:
        print(f"Skipping {filepath}, already has button.")
        continue
    
    # Usually the form ends like this:
    #                 <button type="submit" class="btn btn-primary search-btn">Search</button>
    #             </form>
    
    # We will replace `</form>` inside the <header class="main-header"> area.
    # To be safe, just replace the exact search form closing tag
    
    target = '            </form>'
    replacement = target + button_html
    
    if target in content:
        new_content = content.replace(target, replacement)
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"Could not find target in {filepath}")

