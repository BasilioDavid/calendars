import { Repositoy } from '../../../../shared/building-blocks/domain/repository';

type OrderCalendarRepositoryInput = {
  calendarExtId: string;
  userId: number;
  postalCode: string;
  city: string;
  contactNumber: string;
  direction: string;
  specifications: string;
  instructions: string;
  orderedAt: string;
  calendarStatusId: number;
};

export abstract class OrderCalendarRepository extends Repositoy<
  OrderCalendarRepositoryInput,
  void
> {}
