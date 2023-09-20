import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './av-badge';

export default {
	title: 'VA BADGE',
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		onOpen: { action: 'onClick' },
	},
	render: (args) =>
		html`<av-badge variant="${args.variant}">${args.variant}</av-badge>`,
} as Meta;

export const Default: StoryObj = {
	name: 'Default',
	args: {
		variant: 'default',
	},
};

export const Success: StoryObj = {
	name: 'Success',
	args: {
		variant: 'success',
	},
};

export const Danger: StoryObj = {
	name: 'Danger',
	args: {
		variant: 'danger',
	},
};
