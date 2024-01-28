import { MOCK_USER_INFO } from '@switcheo/constants';
import { UserInfo } from '@switcheo/types';

const connectWallet = async (): Promise<UserInfo> => {
  // Simulate API call to connect user's wallet.
  return MOCK_USER_INFO;
};

const submitSwap = async (
  value: number
): Promise<{ success: boolean; error?: string }> => {
  if (value === 444) {
    return {
      success: false,
      error: 'Something wrong with the server! Please try again later.',
    };
  } else {
    return { success: true };
  }
};

export { connectWallet, submitSwap };
