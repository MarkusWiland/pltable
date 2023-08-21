export function getBackgroundColor(value) {
    switch (value) {
      case 3:
        return "green";
      case 2:
        return "yellow";
      case 1:
        return "orange";
      default:
        return "red";
    }
  }