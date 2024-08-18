export class StatusPriorityTextHelper {
  static getStatusTextColor(status: string): string {
    switch (status) {
      case 'In Progress':
      case 'Active':
        return 'orange';
      case 'Completed':
      case 'Archived':
        return 'green';
      case 'Not Started':
        return 'red';
      default:
        return 'primary';
    }
  }

  static getPriorityTextColor(priority: string): string {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'Low':
        return 'green';
      default:
        return 'primary';
    }
  }
}
