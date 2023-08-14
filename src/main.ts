import { Plugin } from 'obsidian';

export class VSCShortcuts extends Plugin 
{
	async onload() 
	{
		console.log('loading vsc shortcuts plugin');

		this.addCommand({
			id: '',
			name: '',
			editorCheckCallback(checking, editor, ctx) 
			{
				checking;
				editor;
				ctx;
			},
		});
	}

	onunload() 
	{
		console.log('unloading vsc shortcuts plugin');
	}
}

export default VSCShortcuts;
