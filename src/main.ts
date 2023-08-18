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
				const cursors: Array<EditorSelectionOrCaret> = [];
				const editorArray = editor.getValue().split('\n');
				editor.listSelections().forEach(selection => 
				{
					const upperLine = Math.min(selection.head.line, selection.anchor.line);
					const lowerLine = Math.max(selection.head.line, selection.anchor.line);
					if (upperLine === 0) return cursors.push(selection);
					
					const upperPosition = upperLine - 1;
					const selectedLines = editorArray.splice(upperLine, lowerLine - upperLine + 1);
					editorArray.splice(upperPosition, 0, ...selectedLines);

					cursors.push({
						head: { line: selection.head.line - 1, ch: selection.head.ch },
						anchor: { line: selection.anchor.line - 1, ch: selection.anchor.ch },
					});
				});
				editor.setValue(editorArray.join('\n'));
				editor.setSelections(cursors);
			},
			hotkeys: [{ key: 'ArrowUp', modifiers: ['Alt'] }],
		});
		
		this.addCommand({
			id: 'move-down',
			name: 'Move current line down',
			editorCallback(editor) 
			{
				const cursors: Array<EditorSelectionOrCaret> = [];
				const editorArray = editor.getValue().split('\n');
				editor.listSelections().forEach(selection => 
				{
					const upperLine = Math.min(selection.head.line, selection.anchor.line);
					const lowerLine = Math.max(selection.head.line, selection.anchor.line);
					if (lowerLine === editor.lastLine()) return cursors.push(selection);
					
					const selectedLines = editorArray.splice(upperLine, lowerLine - upperLine + 1);
					editorArray.splice(upperLine + 1, 0, ...selectedLines);

					cursors.push({
						head: { line: selection.head.line + 1, ch: selection.head.ch },
						anchor: { line: selection.anchor.line + 1, ch: selection.anchor.ch },
					});
				});
				editor.setValue(editorArray.join('\n'));
				editor.setSelections(cursors);			
			},
			hotkeys: [{ key: 'ArrowDown', modifiers: ['Alt'] }],
		});
		
		this.addCommand({
			id: 'copy-down',
			name: 'Copy current line down',
			editorCallback(editor) 
			{
				const cursors: Array<EditorSelectionOrCaret> = [];
				const editorArray = editor.getValue().split('\n');
				let cumulator = 0;
				editor.listSelections().forEach(selection => 
				{
					selection.head.line += cumulator;
					selection.anchor.line += cumulator;
					const upperLine = Math.min(selection.head.line, selection.anchor.line);
					const lowerLine = Math.max(selection.head.line, selection.anchor.line);
					if (lowerLine === editor.lastLine()) return cursors.push(selection);
					
					const lineLength = lowerLine - upperLine + 1;
					const selectedLines = editorArray.slice(upperLine, lowerLine + 1);
					editorArray.splice(upperLine, 0, ...selectedLines);

					cursors.push({
						head: { line: selection.head.line + lineLength, ch: selection.head.ch },
						anchor: { line: selection.anchor.line + lineLength, ch: selection.anchor.ch },
					});

					cumulator += lineLength;
				});
				editor.setValue(editorArray.join('\n'));
				editor.setSelections(cursors);			
			},
			hotkeys: [{ key: 'ArrowDown', modifiers: ['Alt', 'Shift'] }],
		});
		
		this.addCommand({
			id: 'copy-up',
			name: 'Copy current line up',
			editorCallback(editor) 
			{
				const cursors: Array<EditorSelectionOrCaret> = [];
				const editorArray = editor.getValue().split('\n');
				let cumulator = 0;
				editor.listSelections().forEach(selection => 
				{
					selection.head.line += cumulator;
					selection.anchor.line += cumulator;
					const upperLine = Math.min(selection.head.line, selection.anchor.line);
					const lowerLine = Math.max(selection.head.line, selection.anchor.line);
					if (lowerLine === editor.lastLine()) return cursors.push(selection);
					
					const selectedLines = editorArray.slice(upperLine, lowerLine + 1);
					editorArray.splice(upperLine, 0, ...selectedLines);

					cursors.push({
						head: { line: selection.head.line, ch: selection.head.ch },
						anchor: { line: selection.anchor.line, ch: selection.anchor.ch },
					});

					cumulator += lowerLine - upperLine + 1;
				});
				editor.setValue(editorArray.join('\n'));
				editor.setSelections(cursors);			
			},
			hotkeys: [{ key: 'ArrowUp', modifiers: ['Alt', 'Shift'] }],
		});
		
		this.addCommand({
			id: 'delete-line',
			name: 'Delete current line',
			editorCallback(editor) 
			{
				const editorArray = editor.getValue().split('\n');
				const cursors: Array<EditorSelectionOrCaret> = [];
				editor.listSelections().forEach((selection, index) => 
				{
					const { line } = selection.head;
					delete editorArray[line];
					cursors.push({ 
						head: { line: line - index, ch: 0 },
						anchor: { 
							line: selection.anchor.line - index,
							ch: 0,
						}
					});
				});
				editor.setValue(editorArray.filter((line) => typeof line).join('\n'));
				editor.setSelections(cursors);
			},
			hotkeys: [{ key: 'k', modifiers: ['Ctrl', 'Shift'] }],
		});
		
		this.addCommand({
			id: 'insert-below',
			name: 'Insert line below',
			editorCallback(editor) 
			{
				const cursors: Array<EditorSelectionOrCaret> = [];
				editor.listSelections().forEach((selection, index) => 
				{
					const currentSelection = selection.head;
					currentSelection.line += index;
					const { line, ch } = currentSelection;
					const editorArray = editor.getValue().split('\n');
					
					editorArray[line] += '\n';
					editor.setValue(editorArray.join('\n'));
					cursors.push({ 
						head: { line, ch },
						anchor: { 
							line: selection.anchor.line + index,
							ch: selection.anchor.ch,
						}
					});
				});
				editor.setSelections(cursors);
			},
			hotkeys: [{ key: 'Enter', modifiers: ['Ctrl'] }],
		});
		
		this.addCommand({
			id: 'insert-above',
			name: 'Insert line above',
			editorCallback(editor) 
			{
				const cursors: Array<EditorSelectionOrCaret> = [];
				editor.listSelections().forEach((selection, index) => 
				{
					const currentSelection = selection.head;
					currentSelection.line += index;
					const { line, ch } = currentSelection;
					const editorArray = editor.getValue().split('\n');
					
					editorArray[line] = '\n' + editorArray[line];
					editor.setValue(editorArray.join('\n'));
					cursors.push({ 
						head: { line: line + 1, ch },
						anchor: { 
							line: selection.anchor.line + index + 1,
							ch: selection.anchor.ch,
						}
					});
				});
				editor.setSelections(cursors);
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
				const cursors: Array<EditorSelectionOrCaret> = [...editor.listSelections()];
				editor.listSelections().forEach(selection => 
				{
					if (selection.head.line <= 0) return;
					const line = selection.head.line - 1;
					const ch = Math.min(selection.head.ch, editor.getLine(line).length);
					const select = { line, ch };
					cursors.push({ 
						head: select,
						anchor: select
					});
				});
				editor.setSelections(cursors);
			},
			hotkeys: [{ key: 'ArrowUp', modifiers: ['Alt', 'Ctrl'] }],
		});
		
		this.addCommand({
			id: 'insert-cursor-below',
			name: 'Insert cursor below',
			editorCallback(editor) 
			{
				const cursors: Array<EditorSelectionOrCaret> = [...editor.listSelections()];
				editor.listSelections().forEach(selection => 
				{
					if (selection.head.line >= editor.lastLine()) return;
					const line = selection.head.line + 1;
					const ch = Math.min(selection.head.ch, editor.getLine(line).length);
					const select = { line, ch };
					cursors.push({ 
						head: select,
						anchor: select
					});
				});
				editor.setSelections(cursors);
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
			id: 'select-line',
			name: 'Select current line',
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
							anchor: { line: lineNumber, ch: 0 }
						}
					));
				});
				editor.setSelections(newSelections);
			},
			hotkeys: [{ key: 'L', modifiers: ['Ctrl'] }],
		});

		this.addCommand({
			id: 'test',
			name: 'Test function',
			editorCallback: (editor, ctx) => console.log({ editor, ctx }),
		});


	}

	onunload() 
	{
		console.log('unloading vsc shortcuts plugin');
	}
}

export default VSCShortcuts;
