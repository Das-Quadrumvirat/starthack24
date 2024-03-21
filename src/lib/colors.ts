export function complianceColor(compliance: 0 | 1 | 2 | 3) {
    switch (compliance) {
        case 0:
            return "#FF0000";
        case 1:
            return "#FF8000";
        case 2:
            return "#FFC000";
        case 3:
            return "#00FF00";
    }
}
