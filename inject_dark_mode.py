import glob
import os

button_html = """
            <button id="themeToggleBtn" class="theme-toggle-btn" aria-label="Toggle Dark Mode" title="Toggle Dark Mode">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </button>
"""

# HTML injection locations
for filepath in glob.glob('*.html'):
    with open(filepath, 'r') as f:
        content = f.read()

    # Skip if button already present
    if 'id="themeToggleBtn"' in content:
        continue

    # Attempt 1: Next to globalSearchForm
    target1 = '            </form>'
    
    # Attempt 2: Inside site-header container
    target2 = '            </a>\n        </div>\n    </header>'

    if target1 in content:
        new_content = content.replace(target1, target1 + button_html)
        with open(filepath, 'w') as f: f.write(new_content)
        print(f"Updated {filepath} (Target 1)")
    elif target2 in content:
        new_content = content.replace(target2, '            </a>' + button_html + '\n        </div>\n    </header>')
        with open(filepath, 'w') as f: f.write(new_content)
        print(f"Updated {filepath} (Target 2)")
    else:
        print(f"Failed to inject in {filepath}")
