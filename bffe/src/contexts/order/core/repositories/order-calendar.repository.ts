import { Repositoy } from '../../../../shared/building-blocks/domain/repository';

type OrderCalendarRepositoryInput = {
  calendarExtId: string;
  userId: number;
  postalCode: string;
  city: string;
  contactNumber: string;
  direction: string;
  specifications?: string | undefined;
  instructions?: string | undefined;
  orderedAt: string;
  calendarStatusId: number;
  wrapper: boolean;
};

export abstract class OrderCalendarRepository extends Repositoy<
  OrderCalendarRepositoryInput,
  void
> {}
