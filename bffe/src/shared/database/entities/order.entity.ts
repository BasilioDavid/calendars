import { Generated } from 'kysely';

export interface OrderEntity {
  id: Generated<number>;
  postalCode: string;
  city: string;
  contactNumber: string;
  direction: string;
  specifications: string | undefined;
  instructions: string | undefined;
  orderedAt: string;
  deliveredAt: string | undefined;
  calendarId: number;
}
