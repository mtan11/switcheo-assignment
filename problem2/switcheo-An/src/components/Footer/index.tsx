import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="w-full border-t border-solid border-slate-300/20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-center">
          <p className="text-center text-sm text-black/80">
            Copyright © 2023. All Rights Reserved By <b>Switcheo</b>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
