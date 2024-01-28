import { useCallback, useEffect, useMemo, useState } from 'react';
import { ErrorMessage, Spinner } from '@switcheo/components';
import Layout from '@switcheo/layout';
import useGetTokenPrices from '@switcheo/hooks/useGetTokenPrices';
import {
  calculateSwapResult,
  formattedNumber,
  getErrorMessage,
} from '@switcheo/utils/helper';
import SwapButton from './components/SwapButton';
import { TokenPrice, UserInfo } from '@switcheo/types';
import ContainerInputToken from './components/ContainerInputToken';
import SelectTokenModal from './components/SelectTokenModal';
import { connectWallet, submitSwap } from '@switcheo/services/mockApi';
import classNames from 'classnames';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenPay, setTokenPay] = useState<TokenPrice>();
  const [tokenReceive, setTokenReceive] = useState<TokenPrice>();
  const [isSelectPayToken, setIsSelectPayToken] = useState(true);
  const [numberPayToken, setNumberPayToken] = useState<number>(0);
  const [numberReceiveToken, setNumberReceiveToken] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const { data: prices, isLoading, isError, error } = useGetTokenPrices();

  const openModal = useCallback((isSelectPayToken: boolean) => {
    setIsSelectPayToken(isSelectPayToken);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleOnSelect = useCallback(
    (token: TokenPrice) => {
      if (isSelectPayToken) {
        setTokenPay(token);
      } else {
        setTokenReceive(token);
      }
    },
    [isSelectPayToken]
  );

  const handleSwapToken = useCallback(() => {
    if (tokenPay && tokenReceive) {
      setTokenPay(tokenReceive);
      setTokenReceive(tokenPay);
    }
  }, [tokenReceive, tokenPay]);

  const handleConnectWallet = async () => {
    const user = await connectWallet();
    if (user) {
      setUserInfo(user);
    }
  };

  const isDisableSubmit = useMemo(() => {
    return (
      numberReceiveToken === 0 ||
      !tokenPay ||
      !tokenReceive ||
      !userInfo?.balance ||
      numberPayToken * (tokenPay.price ?? 0) > userInfo.balance
    );
  }, [tokenPay, tokenReceive, numberReceiveToken, userInfo]);

  const handleSubmitSwap = useCallback(async () => {
    if (isDisableSubmit) return;
    const result = await submitSwap(numberPayToken);
    if (result.success) {
      const leftBalance = userInfo!.balance - numberPayToken;
      const newUserInfo = { ...userInfo!, balance: leftBalance };
      setUserInfo(newUserInfo);
      alert(`Reservation successful! Your balance: ${leftBalance}`);
    } else {
      // Handle reservation error
      alert(result.error);
    }
  }, [isDisableSubmit, numberPayToken, userInfo?.balance]);

  const handlePayValueChange = useCallback(
    (value: number) => {
      setNumberPayToken(value);
      setNumberReceiveToken(
        calculateSwapResult(
          tokenPay?.price ?? 0,
          tokenReceive?.price ?? 0,
          value
        )
      );
    },
    [tokenPay?.price, tokenReceive?.price]
  );

  const handleReceiveValueChange = useCallback(
    (value: number) => {
      setNumberReceiveToken(value);
      setNumberPayToken(
        calculateSwapResult(
          tokenReceive?.price ?? 0,
          tokenPay?.price ?? 0,
          value
        )
      );
    },
    [tokenPay?.price, tokenReceive?.price]
  );

  useEffect(() => {
    handlePayValueChange(numberPayToken);
  }, [tokenPay, tokenReceive]);

  const errorMessage = useMemo(
    () =>
      isError
        ? getErrorMessage(error)
        : {
            name: 'Error',
            message: 'Something went wrong with Server. Please try again later',
          },
    [error, isError]
  );

  if (isError) {
    return <ErrorMessage message={errorMessage.message} />;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex h-full min-h-[calc(100vh-65px)] items-center justify-center bg-gradient-bubblegum">
        <div className="w-full max-w-[480px] px-2 pt-16">
          <div className="w-full rounded-3xl border border-solid border-gray-300 bg-white p-4 text-black">
            <h1 className="mb-2 text-lg font-semibold md:text-xl">Swap</h1>
            <p className="text-sm">Trade tokens in an instant</p>
            {userInfo?.balance && (
              <p className="text-sm">
                Balance: {formattedNumber(userInfo?.balance ?? 0)}
              </p>
            )}

            <ContainerInputToken
              value={numberPayToken}
              token={tokenPay}
              onSelect={() => openModal(true)}
              onChange={handlePayValueChange}
            />
            {userInfo &&
              numberPayToken * (tokenPay?.price ?? 0) > userInfo?.balance && (
                <ErrorMessage notShowTitle message="Your balance not enough." />
              )}
            <div className="flex w-full items-center justify-center">
              <SwapButton onClick={handleSwapToken} />
            </div>
            <ContainerInputToken
              value={numberReceiveToken}
              token={tokenReceive}
              onSelect={() => openModal(false)}
              onChange={handleReceiveValueChange}
            />
            <div>
              {!userInfo?.web3AuthWalletAddress ? (
                <button
                  className="flex h-12 w-full cursor-pointer items-center justify-center rounded-2xl bg-teal-400 px-3 font-semibold text-white md:px-6"
                  onClick={handleConnectWallet}
                >
                  Connect Wallet
                </button>
              ) : (
                <button
                  className={classNames([
                    'flex h-12 w-full items-center justify-center rounded-2xl px-3 font-semibold text-white md:px-6',
                    !isDisableSubmit
                      ? 'cursor-pointer bg-purple-400'
                      : 'cursor-not-allowed bg-slate-400',
                  ])}
                  onClick={handleSubmitSwap}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <SelectTokenModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        onSelect={handleOnSelect}
        listPrices={prices ?? []}
      />
    </Layout>
  );
};

export default Home;
