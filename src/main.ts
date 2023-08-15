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
			id: 'delete-line',
			name: 'Delete current line',
			editorCallback(editor) 
			{
				const { line } = editor.getCursor();
				const editorArray = editor.getValue().split('\n');
				
				editorArray.splice(line, 1);
				editor.setValue(editorArray.join('\n'));
				editor.setCursor(line);
			},
		});
		
		this.addCommand({
			id: 'insert-below',
			name: 'Insert line below',
			editorCallback(editor) 
			{
				const { line, ch } = editor.getCursor();
				const editorArray = editor.getValue().split('\n');
				
				editorArray[line] += '\n';
				editor.setValue(editorArray.join('\n'));
				editor.setCursor(line, ch);
			},
		});
		
		this.addCommand({
			id: 'insert-above',
			name: 'Insert line above',
			editorCallback(editor) 
			{
				const { line, ch } = editor.getCursor();
				const editorArray = editor.getValue().split('\n');
				
				editorArray[line] = '\n' + editorArray[line];
				editor.setValue(editorArray.join('\n'));
				editor.setCursor(line + 1, ch);
			},
		});
		
		this.addCommand({
			id: 'scroll-up',
			name: 'Scroll line up',
			editorCallback(editor) 
			{
				const { top } = editor.getScrollInfo();
				editor.scrollTo(0, Math.max(top - 16, 0));
			},
		});
		
		this.addCommand({
			id: 'scroll-down',
			name: 'Scroll line down',
			editorCallback(editor, /* ctx */) 
			{
				const { top } = editor.getScrollInfo();
				// console.log(ctx.app.vault.getAbstractFileByPath('/.obsidian/appearance.json'));
				// TODO: dynamics - change +16 to +lineHeight 
				editor.scrollTo(0, top + 16);
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
