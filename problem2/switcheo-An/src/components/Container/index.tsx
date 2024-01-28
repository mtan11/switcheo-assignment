import { FC, ReactNode } from 'react';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container: FC<ContainerProps> = (props: ContainerProps) => {
  return (
    <div
      className={`container mx-auto p-4 xl:px-0 ${
        props.className ? props.className : ''
      }`}
    >
      {props.children}
    </div>
  );
};

export default Container;
