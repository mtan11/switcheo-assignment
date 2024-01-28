import ErrorMessage from './index';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ErrorMessage> = {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'The error message to be displayed.',
      type: { name: 'string', required: true },
    },
    className: {
      control: 'text',
      description: 'Optional class name for styling purposes.',
      type: { name: 'string' },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ErrorMessage>;
export const Default: Story = {
  args: {
    message: 'Something went wrong.',
  },
};

export const CustomClass: Story = {
  args: {
    message: 'Something went wrong.',
    className: 'bg-blue-300 p-4',
  },
};
