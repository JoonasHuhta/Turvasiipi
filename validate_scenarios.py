
import os
import re
import json

SCENARIO_DIR = r"C:\Users\jvker\antigravity\scratch\suojasiipi\src\lib\simulator\scenarios"
# Correcting path based on user info
SCENARIO_DIR = r"C:\Users\jvker\.gemini\antigravity\scratch\suojasiipi\src\lib\simulator\scenarios"

VALID_STATS = {'selfEsteem', 'teamAcceptance', 'physicalHealth', 'hope', 'shame', 'isolation'}

def validate_scenario(file_path):
    print(f"Validating {os.path.basename(file_path)}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Basic extraction of phase IDs
    # Pattern: ID: { or ID: {
    phase_ids = set(re.findall(r'(\w+):\s*{', content))
    
    # nextPhaseId: "ID"
    next_phase_ids = re.findall(r'nextPhaseId:\s*["\']([^"\']+)["\']', content)
    
    # stats: { key: value }
    stats_chunks = re.findall(r'stats:\s*{([^}]+)}', content)
    
    errors = []
    
    # 1. Check broken links
    for npid in next_phase_ids:
        if npid not in phase_ids and not npid.startswith('END_'):
            errors.append(f"Broken link: {npid}")

    # 2. Check individual stats
    for chunk in stats_chunks:
        keys = re.findall(r'(\w+):', chunk)
        for k in keys:
            if k not in VALID_STATS:
                errors.append(f"Invalid stat key: {k}")

    # 3. Check for starting point
    if 'START' not in phase_ids:
        errors.append("No START phase found.")

    # 4. Reachability (Basic BFS)
    reachable = {'START'}
    queue = ['START']
    graph = {}
    
    # Build graph manually for reachability
    # This is a bit complex with regex, let's try to extract blocks
    phase_blocks = re.split(r'(\w+):\s*{', content)
    for i in range(1, len(phase_blocks), 2):
        pid = phase_blocks[i]
        block = phase_blocks[i+1]
        targets = re.findall(r'nextPhaseId:\s*["\']([^"\']+)["\']', block)
        graph[pid] = targets

    visited = set()
    stack = ['START']
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            for neighbor in graph.get(node, []):
                if neighbor in phase_ids:
                    stack.append(neighbor)
    
    orphans = phase_ids - visited
    if orphans:
        errors.append(f"Orphaned phases (unreachable): {orphans}")

    # 5. Dead ends
    for pid in visited:
        if pid not in graph or not graph[pid]:
            # If no targets, it must be an ending or it's a dead end
            pass # Usually endings are marked as END_... but some might be leaf phases with empty choices

    return errors

all_errors = {}
for filename in os.listdir(SCENARIO_DIR):
    if filename.endswith('.ts'):
        errs = validate_scenario(os.path.join(SCENARIO_DIR, filename))
        if errs:
            all_errors[filename] = errs

if all_errors:
    print("\nINTEGRITY ISSUES FOUND:")
    print(json.dumps(all_errors, indent=2))
else:
    print("\nALL SCENARIOS VALID.")

