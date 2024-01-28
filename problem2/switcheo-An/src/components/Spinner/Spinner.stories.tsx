import { Spinner } from './index';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],

  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Optional class name for styling purposes.',
      type: { name: 'string' },
    },
    color: {
      control: { type: 'radio' },
      options: ['info', 'success'],
      description: 'Color of the spinner (info or success).',
      type: { name: 'string' },
      defaultValue: 'info',
    },
    size: {
      options: ['sm', 'md'],
      control: { type: 'radio' },
      description: 'Size of the spinner (sm or md).',
      type: { name: 'string' },
      defaultValue: 'md',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Spinner>;
export const Default: Story = {};

export const SmallSpinner: Story = {
  args: {
    size: 'sm',
  },
};

export const SuccessColorSpinner: Story = {
  args: {
    color: 'success',
  },
};

export const CustomClassSpinner: Story = {
  args: {
    className: 'h-20 w-20 stroke-red-500',
  },
};
