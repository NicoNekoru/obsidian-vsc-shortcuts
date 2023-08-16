import { EditorSelectionOrCaret, Plugin } from 'obsidian';

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
			hotkeys: [{ key: 'ArrowUp', modifiers: ['Alt'] }],
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
			hotkeys: [{ key: 'ArrowDown', modifiers: ['Alt'] }],
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
			hotkeys: [{ key: 'ArrowDown', modifiers: ['Alt', 'Shift'] }],
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
			hotkeys: [{ key: 'ArrowUp', modifiers: ['Alt', 'Shift'] }],
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
			hotkeys: [{ key: 'k', modifiers: ['Ctrl', 'Shift'] }],
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
			hotkeys: [{ key: 'Enter', modifiers: ['Ctrl'] }],
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
			hotkeys: [{ key: 'Enter', modifiers: ['Ctrl', 'Shift'] }],
		});
		
		this.addCommand({
			id: 'scroll-up',
			name: 'Scroll line up',
			editorCallback(editor, ctx) 
			{
				const { top } = editor.getScrollInfo();
				// @ts-expect-error vault.config and vault.getConfig are not documented in obsidian.d.ts
				const lineHeight = ctx.app.vault.getConfig('baseFontSize') || 16;

				editor.scrollTo(0, Math.max(top - lineHeight, 0));
			},
			hotkeys: [{ key: 'ArrowUp', modifiers: ['Ctrl'] }],
		});
		
		this.addCommand({
			id: 'scroll-down',
			name: 'Scroll line down',
			editorCallback(editor, ctx) 
			{
				const { top } = editor.getScrollInfo();
				// @ts-expect-error vault.config and vault.getConfig are not documented in obsidian.d.ts
				const lineHeight = ctx.app.vault.getConfig('baseFontSize') || 16;

				editor.scrollTo(0, top + lineHeight);
			},
			hotkeys: [{ key: 'ArrowDown', modifiers: ['Ctrl'] }],
		});

		this.addCommand({
			id: 'scroll-page-up',
			name: 'Scroll page up',
			editorCallback(editor) 
			{
				// @ts-expect-error EditorScrollInfo.height is not documented in obsidian.d.ts
				const { top, height } = editor.getScrollInfo();

				editor.scrollTo(0, Math.max(top - height, 0));
			},
			hotkeys: [{ key: 'PageUp', modifiers: ['Alt'] }],
		});
		
		this.addCommand({
			id: 'scroll-page-down',
			name: 'Scroll page down',
			editorCallback(editor) 
			{
				// @ts-expect-error EditorScrollInfo.height is not documented in obsidian.d.ts
				const { top, height } = editor.getScrollInfo();

				editor.scrollTo(0, top + height);
			},
			hotkeys: [{ key: 'PageDown', modifiers: ['Alt'] }],
		});

		this.addCommand({
			id: 'insert-cursor-above',
			name: 'Insert cursor above',
			editorCallback(editor) 
			{
				const currentSelections = editor.listSelections();
				const newSelections = editor.listSelections().map(selection => 
				{
					selection.head.line = Math.max(0, selection.head.line - 1);
					selection.anchor = selection.head;
					return selection;
				});

				editor.setSelections([...currentSelections, ...newSelections]);
			},
			hotkeys: [{ key: 'ArrowUp', modifiers: ['Alt', 'Ctrl'] }],
		});
		
		this.addCommand({
			id: 'insert-cursor-below',
			name: 'Insert cursor below',
			editorCallback(editor) 
			{
				const currentSelections = editor.listSelections();
				const newSelections = editor.listSelections().map(selection => 
				{
					selection.head.line = selection.head.line + 1;
					selection.anchor = selection.head;
					return selection;
				});
				editor.setSelections([...currentSelections, ...newSelections]);
			},
			hotkeys: [{ key: 'ArrowDown', modifiers: ['Alt', 'Ctrl'] }],
		});
		
		this.addCommand({
			id: 'insert-cursor-at-lines',
			name: 'Insert cursor at end of each line selected',
			editorCallback(editor) 
			{
				const newSelections = editor.listSelections().flatMap(selection => 
				{
					const 
						upperBound = Math.max(selection.head.line, selection.anchor.line), 
						lowerBound = Math.min(selection.head.line, selection.anchor.line);
					
					return Array.from(
						{ length: upperBound - lowerBound + 1 },
						(_, i) => [i + lowerBound, editor.getLine(i + lowerBound).length]
					).map(([lineNumber, lineLength]): EditorSelectionOrCaret => (
						{
							head: { line: lineNumber, ch: lineLength },
							anchor: { line: lineNumber, ch: lineLength }
						}
					));
				});
				editor.setSelections(newSelections);
			},
			hotkeys: [{ key: 'I', modifiers: ['Alt', 'Shift'] }],
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
