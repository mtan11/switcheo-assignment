import { MemoryRouter } from 'react-router-dom';
import Header from './index';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  render: () => (
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ),
  tags: ['autodocs'],

  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Header>;
export const Default: Story = {};
