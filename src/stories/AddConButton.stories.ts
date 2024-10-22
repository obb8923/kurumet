import type { Meta, StoryObj } from '@storybook/react';
import AddConButton  from '../components/AddConButton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/AddConButton',
  component: AddConButton,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
  },
} satisfies Meta<typeof AddConButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    isOpen: false,
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
  },
};
