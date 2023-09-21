import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './av-button';

export default {
	title: 'AV Button',
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		onOpen: { action: 'onClick' },
	},
	render: (args) =>
		html`<av-button
			isLoading=${args.isLoading}
			type=${args.type}
			label=${'Cool Button'}
		></av-button>`,
} as Meta;

export const Default: StoryObj = {
	name: 'Default',
	args: {
		type: 'default',
	},
};

export const Loading: StoryObj = {
	name: 'Loading',
	args: {
		type: 'loading',
	},
};

export const Success: StoryObj = {
	name: 'Success',
	args: {
		type: 'success',
	},
};

export const Error: StoryObj = {
	name: 'Error',
	args: {
		type: 'error',
	},
};

export const isLoading: StoryObj = {
	name: 'isLoading',
	args: {
		type: 'default',
		isLoading: true,
	},
};
