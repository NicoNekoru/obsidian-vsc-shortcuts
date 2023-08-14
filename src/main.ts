import { Plugin } from 'obsidian';

export class VSCShortcuts extends Plugin 
{
	async onload() 
	{
		console.log('loading vsc shortcuts plugin');
	}

	onunload() 
	{
		console.log('unloading vsc shortcuts plugin');
	}

}

export default VSCShortcuts;
