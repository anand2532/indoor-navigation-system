class WifiPositioning:
    def __init__(self):
        # Define known access points and their locations
        self.access_points = {
            'AP1': {'location': (0, 0), 'reference_rssi': -50},
            'AP2': {'location': (10, 0), 'reference_rssi': -50},
            'AP3': {'location': (0, 10), 'reference_rssi': -50},
        }

    def calculate_position(self, wifi_signals):
        """Calculate position using trilateration."""
        weighted_x = weighted_y = total_weight = 0
        
        for ap_id, rssi in wifi_signals.items():
            if ap_id in self.access_points:
                ap = self.access_points[ap_id]
                distance = self._rssi_to_distance(rssi, ap['reference_rssi'])
                weight = 1 / (distance ** 2)
                
                weighted_x += ap['location'][0] * weight
                weighted_y += ap['location'][1] * weight
                total_weight += weight
        
        if total_weight == 0:
            return (0, 0)
            
        return (weighted_x / total_weight, weighted_y / total_weight)

    def _rssi_to_distance(self, rssi, reference_rssi):
        """Convert RSSI to approximate distance."""
        if rssi >= reference_rssi:
            return 1.0
        return 10 ** ((reference_rssi - rssi) / 20)

def get_position(wifi_data):
    positioning = WifiPositioning()
    return positioning.calculate_position(wifi_data)