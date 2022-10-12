import { unregisteredUserGuard } from '../common/unregistered-user.guard';
import { token } from '../common/token.service';

unregisteredUserGuard();
const userToken = token.get();

