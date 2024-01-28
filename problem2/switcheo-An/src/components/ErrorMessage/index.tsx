import classNames from 'classnames';
import { memo } from 'react';

const ErrorMessage = memo(
  ({
    message,
    className,
    notShowTitle = false,
  }: {
    message: string;
    className?: string;
    notShowTitle?: boolean;
  }) => {
    return (
      <div
        className={classNames(
          ['flex h-full w-full flex-col items-center justify-center gap-4'],
          className
        )}
      >
        {!notShowTitle && (
          <h4 className="text-4xl font-extrabold text-red-500">Error!!!</h4>
        )}
        <p className="text-lg font-medium text-red-400">{message}</p>
      </div>
    );
  }
);

export default ErrorMessage;
