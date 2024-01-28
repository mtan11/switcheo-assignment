import { MemoryRouter } from 'react-router-dom';
import Footer from './index';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  render: () => (
    <MemoryRouter>
      <Footer />
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

type Story = StoryObj<typeof Footer>;
export const Default: Story = {};
