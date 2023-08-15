import { Plugin } from 'obsidian';

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
				const { line, ch } = editor.getCursor();
				const upperPosition = Math.max(0, line - 1);
				const selectedLine = editor.getLine(line);
				const lineAbove = editor.getLine(upperPosition);
				
				editor.setLine(upperPosition, selectedLine);
				editor.setLine(line, lineAbove);
				editor.setCursor(upperPosition, ch);
			},
		});
		
		this.addCommand({
			id: 'move-down',
			name: 'Move current line down',
			editorCallback(editor) 
			{
				const { line, ch } = editor.getCursor();
				const lowerPosition = Math.min(editor.lastLine(), line + 1);
				const selectedLine = editor.getLine(line);
				const lineBelow = editor.getLine(lowerPosition);
				
				editor.setLine(lowerPosition, selectedLine);
				editor.setLine(line, lineBelow);
				editor.setCursor(lowerPosition, ch);
			},
		});
		
		this.addCommand({
			id: 'copy-down',
			name: 'Copy current line down',
			editorCallback(editor) 
			{
				const { line, ch } = editor.getCursor();
				const editorArray = editor.getValue().split('\n');
				
				editorArray[line] += '\n' + editorArray[line];
				editor.setValue(editorArray.join('\n'));
				editor.setCursor(line + 1, ch);
			},
		});
		
		this.addCommand({
			id: 'copy-up',
			name: 'Copy current line up',
			editorCallback(editor) 
			{
				const { line, ch } = editor.getCursor();
				const editorArray = editor.getValue().split('\n');
				
				editorArray[line] += '\n' + editorArray[line];
				editor.setValue(editorArray.join('\n'));
				editor.setCursor(line, ch);
			},
		});
		
		this.addCommand({
			id: 'test',
			name: 'Test function',
			editorCallback(editor, ctx) 
			{
				console.log({ editor, ctx });
				editor.getValue();
			},
		});


	}

	onunload() 
	{
		console.log('unloading vsc shortcuts plugin');
	}
}

export default VSCShortcuts;
