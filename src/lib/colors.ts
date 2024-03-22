export function complianceColor(compliance: 0 | 1 | 2 | 3) {
    switch (compliance) {
        case 0:
            return "#FF5000";
        case 1:
            return "#FFD000";
        case 2:
            return "#70FF00";
        case 3:
            return "#00D050";
    }
}
