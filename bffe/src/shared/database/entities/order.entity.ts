export interface OrderEntity {
  id: number;
  postalCode: string;
  city: string;
  contactNumber: number;
  direction: string;
  specifications: string;
  instructions: string;
  orderedAt: string;
  deliveredAt: string;
  calendarId: number;
}
