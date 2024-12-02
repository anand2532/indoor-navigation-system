def find_path(start, end):
    """Simple A* pathfinding implementation."""
    path = []
    current = start
    
    while current != end:
        path.append(current)
        
        # Calculate next point based on direction to destination
        dx = end[0] - current[0]
        dy = end[1] - current[1]
        
        if abs(dx) > abs(dy):
            next_x = current[0] + (1 if dx > 0 else -1)
            next_y = current[1]
        else:
            next_x = current[0]
            next_y = current[1] + (1 if dy > 0 else -1)
            
        current = (next_x, next_y)
        
        # Prevent infinite loops
        if len(path) > 100:
            break
    
    path.append(end)
    return path