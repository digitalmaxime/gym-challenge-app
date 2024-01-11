import type { NextPage } from 'next';
import { Unauthorized } from './global';

const WaitPage: NextPage = function Page() {
  return Unauthorized();
};

export default WaitPage;
