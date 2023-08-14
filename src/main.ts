import { Plugin, Editor } from 'obsidian';

export class VSCShortcuts extends Plugin 
{
	async onload() 
	{
		console.log('loading vsc shortcuts plugin');

		this.addCommand({
			id: 'move-up',
			name: 'Move current line up',
			editorCallback(editor) 
			{
				const selectedLine = editor.getLine(editor.getCursor().line);
				const lineAbove = editor.getLine(Math.max(0, editor.getCursor().line - 1));
				editor.setLine(Math.max(editor.getCursor().line - 1, 0), selectedLine);
				editor.setLine(editor.getCursor().line, lineAbove);
				editor.setCursor(Math.max(editor.getCursor().line - 1, 0));
			},
		});
		
		this.addCommand({
			id: 'move-down',
			name: 'Move current line down',
			editorCallback(editor) 
			{
				const selectedLine = editor.getLine(editor.getCursor().line);
				const lineBelow = editor.getLine(Math.min(editor.lastLine(), editor.getCursor().line + 1));
				editor.setLine(Math.min(editor.lastLine(), editor.getCursor().line + 1), selectedLine);
				editor.setLine(editor.getCursor().line, lineBelow);
				editor.setCursor(Math.min(editor.lastLine(), editor.getCursor().line + 1));
			},
		});	  
	}

	onunload() 
	{
		console.log('unloading vsc shortcuts plugin');
	}
}

export default VSCShortcuts;
